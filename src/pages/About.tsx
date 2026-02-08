import { motion } from "framer-motion";
import { fadeInUpVariants, containerVariants, cardVariants } from "../utils/animations";

export default function About() {
  return (
    <motion.div 
      className="bg-gray-50 min-h-screen py-12 px-6 md:px-16"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="max-w-4xl mx-auto text-center mb-14"
        variants={fadeInUpVariants}
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={fadeInUpVariants}>About Us</motion.h1>
        <motion.p className="text-gray-600 text-lg" variants={fadeInUpVariants}>
          Where focused guidance, smart preparation, and consistent practice
          come together to help students achieve real exam success.
        </motion.p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div 
        className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.h2 className="text-2xl font-bold mb-3 text-blue-600" variants={fadeInUpVariants}>Our Mission</motion.h2>
          <motion.p className="text-gray-600" variants={fadeInUpVariants}>
            To provide affordable, high-quality coaching that empowers students
            from all backgrounds to crack competitive exams with clarity and confidence.
          </motion.p>
        </motion.div>
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.h2 className="text-2xl font-bold mb-3 text-blue-600" variants={fadeInUpVariants}>Our Vision</motion.h2>
          <motion.p className="text-gray-600" variants={fadeInUpVariants}>
            To become a trusted center of excellence known for concept-driven
            teaching, personalized mentoring, consistent results, and a student-first approach.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* What Makes Us Different */}
      <motion.div 
        className="max-w-6xl mx-auto mb-16"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeInUpVariants}>
          What Makes Us Different?
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-6 text-gray-700"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.ul className="space-y-2 list-disc list-inside" variants={containerVariants}>
            <motion.li variants={fadeInUpVariants}>Small batch sizes for individual attention</motion.li>
            <motion.li variants={fadeInUpVariants}>Structured study plans and weekly targets</motion.li>
            <motion.li variants={fadeInUpVariants}>Regular mock tests with performance analysis</motion.li>
          </motion.ul>
          <motion.ul className="space-y-2 list-disc list-inside" variants={containerVariants}>
            <motion.li variants={fadeInUpVariants}>Dedicated doubt-clearing and revision sessions</motion.li>
            <motion.li variants={fadeInUpVariants}>Exam strategies, shortcuts, and time management</motion.li>
            <motion.li variants={fadeInUpVariants}>Motivational support and progress tracking</motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Teaching Approach */}
      <motion.div 
        className="bg-blue-600 text-white rounded-2xl p-10 max-w-6xl mx-auto mb-16"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center mb-6" variants={fadeInUpVariants}>
          Our Teaching Approach
        </motion.h2>
        <motion.p className="text-center max-w-3xl mx-auto mb-6" variants={fadeInUpVariants}>
          Students struggle when concepts are unclear and guidance is missing.
          Our method ensures clarity, practice, and continuous improvement.
        </motion.p>
        <motion.div 
          className="grid md:grid-cols-4 gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            "Concept Clarity First",
            "Practice with Purpose",
            "Test → Analyze → Improve",
            "Repeat Until Perfect",
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="bg-white text-blue-600 p-4 rounded-xl font-semibold"
              variants={cardVariants}
              whileHover="hover"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Beyond Syllabus */}
      <motion.div 
        className="max-w-5xl mx-auto text-center mb-16"
        variants={fadeInUpVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-4" variants={fadeInUpVariants}>Beyond Syllabus</motion.h2>
        <motion.p className="text-gray-600" variants={fadeInUpVariants}>
          We help students build discipline, confidence, time management skills,
          and a winning mindset—not just subject knowledge.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
