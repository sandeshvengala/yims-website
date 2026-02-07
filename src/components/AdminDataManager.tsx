import { useEffect, useMemo, useState, type FormEvent } from "react";

export type DataColumn = {
  key: string;
  label: string;
  type?: "text" | "date" | "number";
};

type DataManagerProps = {
  entity: string;
  title: string;
  description?: string;
  columns: DataColumn[];
  searchable?: boolean;
  readOnly?: boolean;
};

type RowRecord = Record<string, string | number | null> & { id?: number };

export default function AdminDataManager({
  entity,
  title,
  description,
  columns,
  searchable = true,
  readOnly = false,
}: DataManagerProps) {
  const [rows, setRows] = useState<RowRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<RowRecord>(() => {
    const initial: RowRecord = {};
    columns.forEach((col) => {
      initial[col.key] = "";
    });
    return initial;
  });

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const term = search.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  }, [rows, search]);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/${entity}`);
      if (!response.ok) {
        throw new Error("Failed to load data");
      }
      const data = (await response.json()) as RowRecord[];
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, [entity]);

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/${entity}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to save record");
      }
      setForm((prev) => {
        const reset: RowRecord = {};
        Object.keys(prev).forEach((key) => {
          reset[key] = "";
        });
        return reset;
      });
      fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save record");
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    setError(null);
    try {
      const response = await fetch(`/api/${entity}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record");
    }
  };

  const handleExport = () => {
    window.location.href = `/api/${entity}/export`;
  };

  const handleImport = async (file?: File | null) => {
    if (!file) return;
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/api/${entity}/import`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to import Excel");
      }
      fetchRows();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import Excel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h1>
          {description && <p className="text-gray-600">{description}</p>}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchRows}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Export to Excel
            </button>
            <label className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 cursor-pointer">
              Import Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(event) => handleImport(event.target.files?.[0])}
              />
            </label>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
            {error}
          </div>
        )}

        {searchable && (
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search records..."
            className="w-full md:max-w-md border border-gray-300 rounded-xl px-4 py-2"
          />
        )}

        {!readOnly && (
          <form
            onSubmit={handleCreate}
            className="bg-white rounded-2xl p-6 shadow space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Record
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {columns.map((column) => (
                <div key={column.key} className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    {column.label}
                  </label>
                  <input
                    type={column.type ?? "text"}
                    value={String(form[column.key] ?? "")}
                    onChange={(event) =>
                      handleInputChange(column.key, event.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              Save to Database
            </button>
          </form>
        )}

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-sm uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  {columns.map((column) => (
                    <th key={column.key} className="px-4 py-3">
                      {column.label}
                    </th>
                  ))}
                  {!readOnly && <th className="px-4 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td
                      colSpan={columns.length + (readOnly ? 1 : 2)}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Loading data...
                    </td>
                  </tr>
                )}
                {!loading && filteredRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length + (readOnly ? 1 : 2)}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  filteredRows.map((row) => (
                    <tr key={row.id} className="text-sm text-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {row.id ?? "-"}
                      </td>
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-3">
                          {String(row[column.key] ?? "")}
                        </td>
                      ))}
                      {!readOnly && (
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600 font-semibold hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
