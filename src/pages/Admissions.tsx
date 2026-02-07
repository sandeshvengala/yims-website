import { Link } from "react-router-dom";

type Course = {
  title: string;
  eligibility: string;
  description: string;
};

export default function Admissions() {
  const courses: Course[] = [
    {
      title: "SSC (Secondary School Certificate)",
      eligibility:
        "Students currently studying or completed 9th/10th class.",
      description:
        "Comprehensive preparation for SSC board exams with expert faculty and proven results.",
    },
    {
      title: "Polytechnic Entrance Exams",
      eligibility:
        "Students who completed or appearing for 10th class.",
      description:
        "Specialized coaching for competitive polytechnic entrance exams with practice tests.",
    },
    {
      title: "Government Exams Preparation",
      eligibility:
        "Students who completed 10th/12th/Graduation based on exam requirement.",
      description:
        "Focused preparation for UPSC, SSC, Railway, Bank, and other government exams.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Admissions Open
        </h1>
        <p className="text-gray-600 text-lg">
          Join our coaching programs for SSC, Polytechnic Entrance, and
          Government Exams. Transform your future with YIMS today!
        </p>
      </div>

      {/* Courses Eligible */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Eligibility:</span>{" "}
              {course.eligibility}
            </p>
            <p className="text-gray-700 text-sm">{course.description}</p>
          </div>
        ))}
      </div>

      {/* Admission Process */}
      <div className="bg-white shadow-xl rounded-2xl p-10 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Admission Process
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Visit our institute or contact us online",
            "Choose your preferred course",
            "Fill out the admission form",
            "Complete fee payment and confirm your seat",
          ].map((step: string, i: number) => (
            <div key={i} className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-3">
                Step {i + 1}
              </div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Documents Required
        </h2>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>Recent passport size photographs</li>
            <li>Aadhar Card / ID Proof</li>
            <li>Previous class marks memo</li>
            <li>Transfer Certificate (if applicable)</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Join?</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Complete your application now and start your journey to success. Our admissions team is ready to help you every step of the way.
        </p>
        <Link to="/apply-admission">
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg">
            Apply Now
          </button>
        </Link>
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-700 mb-4">Have questions? Reach out to us!</p>
        <Link to="/contact">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
