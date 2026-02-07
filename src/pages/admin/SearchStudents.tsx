import AdminDataManager from "../../components/AdminDataManager";

export default function SearchStudents() {
  return (
    <AdminDataManager
      entity="students"
      title="Search Students"
      description="Search existing student records. Export results to Excel if needed."
      columns={[
        { key: "studentId", label: "Student ID" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "course", label: "Course" },
        { key: "status", label: "Status" },
      ]}
      readOnly
    />
  );
}