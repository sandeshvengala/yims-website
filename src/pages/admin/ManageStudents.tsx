import AdminDataManager from "../../components/AdminDataManager";

export default function ManageStudents() {
  return (
    <AdminDataManager
      entity="students"
      title="Manage Students"
      description="Add, edit, and export student records. Use Excel import to sync edits from spreadsheets."
      columns={[
        { key: "studentId", label: "Student ID" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "course", label: "Course" },
        { key: "admissionDate", label: "Admission Date", type: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}