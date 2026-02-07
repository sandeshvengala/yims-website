import { useState } from "react";

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
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg">
          Have questions about courses or admissions? Reach out to us. We are
          happy to help you.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Address</h3>
          <p className="text-gray-600">
            Yogeshwara Institute<br />
            Gandhinagar, Sircilla,<br />
            Telangana, India
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Phone</h3>
          <p className="text-gray-600">+91 95333 08928</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Email</h3>
          <p className="text-gray-600">yogeshwara475@gmail.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300">
            ✓ Your message has been sent successfully! We'll respond within 24
            hours.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Find Us Here</h2>
        <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
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
        </div>
      </div>
    </div>
  );
}
