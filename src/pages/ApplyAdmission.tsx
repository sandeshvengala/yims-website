import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUpVariants, containerVariants, buttonVariants } from "../utils/animations";

export default function ApplyAdmission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    phone: "",
    course: "",
    address: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationDate: new Date().toISOString().split("T")[0],
          status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Auto-trigger Excel export
      await fetch("/api/admissions/export");

      setMessage("Application submitted successfully! We will contact you soon.");
      setFormData({
        studentName: "",
        guardianName: "",
        phone: "",
        course: "",
        address: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen py-12 px-6 md:px-16"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-14"
        variants={fadeInUpVariants}
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={fadeInUpVariants}>
          Apply for Admission
        </motion.h1>
        <motion.p className="text-gray-600 text-lg" variants={fadeInUpVariants}>
          Fill this form to apply for SSC, Polytechnic, or Government Exams coaching.
        </motion.p>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8"
        variants={fadeInUpVariants}
      >
        {message && (
          <motion.div 
            className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl mb-6"
            variants={fadeInUpVariants}
          >
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl mb-6"
            variants={fadeInUpVariants}
          >
            {error}
          </motion.div>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            type="text"
            placeholder="Student Full Name"
            className="border border-gray-300 rounded-lg p-3"
            value={formData.studentName}
            onChange={(e) => handleInputChange("studentName", e.target.value)}
            required
            variants={fadeInUpVariants}
          />

          <motion.input
            type="text"
            placeholder="Father / Guardian Name"
            className="border border-gray-300 rounded-lg p-3"
            value={formData.guardianName}
            onChange={(e) => handleInputChange("guardianName", e.target.value)}
            required
            variants={fadeInUpVariants}
          />

          <motion.input
            type="tel"
            placeholder="Mobile Number"
            className="border border-gray-300 rounded-lg p-3"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            variants={fadeInUpVariants}
          />

          <motion.select
            className="border border-gray-300 rounded-lg p-3"
            value={formData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            required
            variants={fadeInUpVariants}
          >
            <option value="">-- Select Course --</option>
            <option value="SSC (Secondary School Certificate)">SSC (Secondary School Certificate)</option>
            <option value="Polytechnic Entrance Exams">Polytechnic Entrance Exams</option>
            <option value="Government Exams Preparation">Government Exams Preparation</option>
          </motion.select>

          <motion.textarea
            rows={4}
            placeholder="Address"
            className="border border-gray-300 rounded-lg p-3"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
            variants={fadeInUpVariants}
          ></motion.textarea>

          <motion.button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}