import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, cardVariants, fadeInUpVariants } from "../utils/animations";

export default function Courses() {
  const courses = [
    {
      title: "SSC (Secondary School Certificate)",
      description:
        "Prepare smartly for SSC board examinations with a strong academic foundation and concept clarity.",
      cover: [
        "Complete syllabus coverage for all core subjects",
        "Concept-based learning with examples",
        "Chapter-wise tests and model papers",
        "Doubt-clearing sessions and revision classes",
        "Exam writing strategies and time management",
      ],
      bestFor: [
        "Students appearing for SSC board exams",
        "Students who want to strengthen fundamentals for future studies",
      ],
    },
    {
      title: "Polytechnic Entrance Exams",
      description:
        "Get ready to crack Polytechnic entrance exams with structured preparation and expert mentorship.",
      cover: [
        "Mathematics, Physics, and Chemistry fundamentals",
        "Previous years’ question paper practice",
        "Topic-wise problem-solving techniques",
        "Mock tests and performance analysis",
        "Shortcut methods and exam tips",
      ],
      bestFor: [
        "Students aiming to join diploma/polytechnic colleges",
        "Students looking for technical education pathways",
      ],
    },
    {
      title: "Government Exams Preparation",
      description:
        "Comprehensive coaching for various government competitive exams with updated syllabus and practice.",
      cover: [
        "Quantitative Aptitude, Reasoning, and General Knowledge",
        "Current Affairs and General Studies",
        "Practice sets and full-length mock tests",
        "Interview and personality development guidance",
        "Regular performance tracking and feedback",
      ],
      bestFor: [
        "Aspirants preparing for state and central government exams",
        "Candidates aiming for secure and respected government jobs",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Our Courses
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our specialized coaching programs designed to help students
          and aspirants succeed in competitive exams with confidence.
        </p>
      </div>

      {/* Courses */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-3 text-blue-600">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">What we cover</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {course.cover.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Best for</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {course.bestFor.map((item, i) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>

            <Link to="/apply-admission">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Enroll Now
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 bg-blue-600 text-white rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Our Courses?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-lg">
          <ul className="space-y-2 list-disc list-inside">
            <li>Experienced faculty and personalized mentoring</li>
            <li>Structured study material and regular assessments</li>
            <li>Small batch sizes for individual attention</li>
          </ul>
          <ul className="space-y-2 list-disc list-inside">
            <li>Doubt-solving sessions and revision marathons</li>
            <li>Focus on concept clarity and exam confidence</li>
            <li>Regular performance tracking and feedback</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-12">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Take the first step toward your success. Choose your course and join our community of successful students achieving their dreams.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/apply-admission">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg">
              Apply Now
            </button>
          </Link>
          <Link to="/admissions">
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition border border-white">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
