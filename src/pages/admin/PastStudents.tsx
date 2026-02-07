import AdminDataManager from "../../components/AdminDataManager";

export default function PastStudents() {
  return (
    <AdminDataManager
      entity="alumni"
      title="Past Students"
      description="Track alumni and export records for follow-up campaigns."
      columns={[
        { key: "studentId", label: "Student ID" },
        { key: "name", label: "Name" },
        { key: "year", label: "Pass Year" },
        { key: "placement", label: "Placement" },
      ]}
    />
  );
}
