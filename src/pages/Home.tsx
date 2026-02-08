import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { containerVariants, itemVariants, cardVariants, fadeInUpVariants } from "../utils/animations";

export default function Home() {
  return (
    <motion.div initial="hidden" animate="visible">
      <Hero />

      {/* Features Section */}
      <motion.section 
        variants={containerVariants}
        className="py-16 px-10 grid md:grid-cols-3 gap-8 text-center"
      >
        {[
          { title: "Expert Faculty", desc: "Learn from experienced educators and industry experts." },
          { title: "Modern Labs", desc: "State-of-the-art labs and digital classrooms." },
          { title: "Placement Support", desc: "Strong placement cell with top company tie-ups." }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={cardVariants}
            whileHover="hover"
            className="shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all"
          >
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* About Preview */}
      <motion.section 
        variants={fadeInUpVariants}
        initial="initial"
        whileInView="animate"
        className="bg-gray-100 py-20 px-6 md:px-16"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold mb-6"
          >
            About YIMS
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-gray-700 text-lg leading-relaxed mb-12"
          >
            YIMS is dedicated to delivering excellence in education with a
            student-first approach, innovation, and leadership development.
            We focus on building strong academic foundations, practical skills,
            and the confidence students need to succeed in competitive exams
            and real-world challenges.
          </motion.p>
        </div>

        {/* Founder Card */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <img
              src="/src/YIMS-LOGO.png"
              alt="Founder"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="text-center md:text-left">
            <span className="bg-white text-blue-900 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
              Founder & Director
            </span>
            <h3 className="text-3xl font-bold mb-3">Mr.Guduri Nishanth Kumar</h3>
            <p className="text-blue-100 leading-relaxed text-lg italic">
              "Our mission is to guide students with the right knowledge, discipline, and mentorship to achieve academic excellence and career success."
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        variants={fadeInUpVariants}
        initial="initial"
        whileInView="animate"
        className="py-16 text-center"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold mb-4"
        >
          Start Your Journey Today
        </motion.h2>
        <Link to="/admissions">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all"
          >
            Apply Now
          </motion.button>
        </Link>
      </motion.section>
    </motion.div>
  );
}
