import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUpVariants, containerVariants, cardVariants, buttonVariants } from "../utils/animations";

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
          Admissions Open
        </motion.h1>
        <motion.p className="text-gray-600 text-lg" variants={fadeInUpVariants}>
          Join our coaching programs for SSC, Polytechnic Entrance, and
          Government Exams. Transform your future with YIMS today!
        </motion.p>
      </motion.div>

      {/* Courses Eligible */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h2 className="text-2xl font-bold text-blue-600 mb-3" variants={fadeInUpVariants}>
              {course.title}
            </motion.h2>
            <motion.p className="text-gray-600 mb-4" variants={fadeInUpVariants}>
              <span className="font-semibold">Eligibility:</span>{" "}
              {course.eligibility}
            </motion.p>
            <motion.p className="text-gray-700 text-sm" variants={fadeInUpVariants}>{course.description}</motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Admission Process */}
      <motion.div 
        className="bg-white shadow-xl rounded-2xl p-10 mb-16"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-10" variants={fadeInUpVariants}>
          Admission Process
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            "Visit our institute or contact us online",
            "Choose your preferred course",
            "Fill out the admission form",
            "Complete fee payment and confirm your seat",
          ].map((step: string, i: number) => (
            <motion.div key={i} className="p-6" variants={cardVariants}>
              <motion.div className="text-3xl font-bold text-blue-600 mb-3" variants={fadeInUpVariants}>
                Step {i + 1}
              </motion.div>
              <motion.p className="text-gray-600" variants={fadeInUpVariants}>{step}</motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Documents */}
      <motion.div className="mb-16" variants={fadeInUpVariants}>
        <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeInUpVariants}>
          Documents Required
        </motion.h2>

        <motion.div 
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8"
          variants={fadeInUpVariants}
        >
          <motion.ul 
            className="list-disc list-inside space-y-3 text-gray-700 text-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {["Recent passport size photographs", "Aadhar Card / ID Proof", "Previous class marks memo", "Transfer Certificate (if applicable)"].map((item, i) => (
              <motion.li key={i} variants={fadeInUpVariants}>{item}</motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="text-center py-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl text-white"
        variants={fadeInUpVariants}
      >
        <motion.h3 className="text-3xl font-bold mb-4" variants={fadeInUpVariants}>Ready to Join?</motion.h3>
        <motion.p className="text-blue-100 mb-8 max-w-2xl mx-auto" variants={fadeInUpVariants}>
          Complete your application now and start your journey to success. Our admissions team is ready to help you every step of the way.
        </motion.p>
        <Link to="/apply-admission">
          <motion.button 
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Apply Now
          </motion.button>
        </Link>
      </motion.div>

      {/* Contact CTA */}
      <motion.div 
        className="text-center mt-12"
        variants={fadeInUpVariants}
      >
        <motion.p className="text-gray-700 mb-4" variants={fadeInUpVariants}>Have questions? Reach out to us!</motion.p>
        <Link to="/contact">
          <motion.button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Contact Us
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
