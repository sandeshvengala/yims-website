import AdminDataManager from "../../components/AdminDataManager";

export default function Results() {
  return (
    <AdminDataManager
      entity="results"
      title="Student Results"
      description="Store exam results and export to Excel for reporting."
      columns={[
        { key: "studentId", label: "Student ID" },
        { key: "exam", label: "Exam" },
        { key: "score", label: "Score" },
        { key: "resultDate", label: "Result Date", type: "date" },
      ]}
    />
  );
}
