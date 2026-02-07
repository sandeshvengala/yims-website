import AdminDataManager from "../../components/AdminDataManager";

export default function Attendance() {
  return (
    <AdminDataManager
      entity="attendance"
      title="Attendance System"
      description="Record daily attendance. Import Excel to sync attendance updates."
      columns={[
        { key: "studentId", label: "Student ID" },
        { key: "date", label: "Date", type: "date" },
        { key: "status", label: "Status" },
        { key: "notes", label: "Notes" },
      ]}
    />
  );
}