import AdminDataManager from "../../components/AdminDataManager";

export default function ManageAdmissions() {
  return (
    <AdminDataManager
      entity="admissions"
      title="Manage Admission Applications"
      description="Review and manage student admission applications. Update status, export to Excel, and track applications."
      columns={[
        { key: "studentName", label: "Student Name" },
        { key: "guardianName", label: "Guardian Name" },
        { key: "phone", label: "Phone" },
        { key: "course", label: "Course" },
        { key: "address", label: "Address" },
        { key: "applicationDate", label: "Application Date", type: "date" },
        { key: "status", label: "Status" },
      ]}
      searchable
    />
  );
}
