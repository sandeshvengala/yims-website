import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUpVariants, containerVariants, cardVariants, buttonVariants } from "../utils/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
      {/* Header */}
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-14"
        variants={fadeInUpVariants}
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={fadeInUpVariants}>
          Contact Us
        </motion.h1>
        <motion.p className="text-gray-600 text-lg" variants={fadeInUpVariants}>
          Have questions about courses or admissions? Reach out to us. We are
          happy to help you.
        </motion.p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white shadow-lg rounded-2xl p-8 text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">Address</h3>
          <p className="text-gray-600">
            Yogeshwara Institute<br />
            Gandhinagar, Sircilla,<br />
            Telangana, India
          </p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg rounded-2xl p-8 text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">Phone</h3>
          <p className="text-gray-600">+91 95333 08928</p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg rounded-2xl p-8 text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">Email</h3>
          <p className="text-gray-600">yogeshwara475@gmail.com</p>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-16"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeInUpVariants}>
          Send Us a Message
        </motion.h2>

        {success && (
          <motion.div 
            className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300"
            variants={fadeInUpVariants}
          >
            ✓ Your message has been sent successfully! We'll respond within 24
            hours.
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300"
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
          <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              variants={fadeInUpVariants}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              variants={fadeInUpVariants}
            />
          </motion.div>

          <motion.input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            variants={fadeInUpVariants}
          />

          <motion.textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            variants={fadeInUpVariants}
          ></motion.textarea>

          <motion.button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Map Section */}
      <motion.div 
        className="max-w-5xl mx-auto"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-6" variants={fadeInUpVariants}>Find Us Here</motion.h2>
        <motion.div 
          className="w-full h-80 rounded-2xl overflow-hidden shadow-lg"
          variants={fadeInUpVariants}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1362.7952974109533!2d78.80648314934673!3d18.386734883101834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccfd003a87ce8f%3A0x327138323221f470!2sYogeshwar%20Institute!5e0!3m2!1sen!2sin!4v1769918566888!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="YIMS Location"
          ></iframe>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
