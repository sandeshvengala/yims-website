import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="py-16 px-10 grid md:grid-cols-3 gap-8 text-center">
        <div className="shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Expert Faculty</h3>
          <p>Learn from experienced educators and industry experts.</p>
        </div>
        <div className="shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Modern Labs</h3>
          <p>State-of-the-art labs and digital classrooms.</p>
        </div>
        <div className="shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Placement Support</h3>
          <p>Strong placement cell with top company tie-ups.</p>
        </div>
      </section>

      {/* About Preview with Founder */}
<section className="bg-gray-100 py-20 px-6 md:px-16">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-6">About YIMS</h2>

    <p className="text-gray-700 text-lg leading-relaxed mb-12">
      YIMS is dedicated to delivering excellence in education with a
      student-first approach, innovation, and leadership development.
      We focus on building strong academic foundations, practical skills,
      and the confidence students need to succeed in competitive exams
      and real-world challenges.
    </p>
  </div>

    {/* Founder Card - Redesigned */}
<div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
  
  {/* Decorative Glow */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

  {/* Founder Image */}
  <div className="flex-shrink-0">
    <img
      src="/src/YIMS-LOGO.png"
      alt="Founder"
      className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-lg"
    />
  </div>

  {/* Founder Content */}
  <div className="text-center md:text-left">
    <span className="bg-white text-blue-900 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
      Founder & Director
    </span>

    <h3 className="text-3xl font-bold mb-3">Mr.Guduri Nishanth Kumar</h3>

    <p className="text-blue-100 leading-relaxed text-lg italic">
      “Our mission is to guide students with the right knowledge, discipline,
      and mentorship to achieve academic excellence and career success.
      At YIMS, every student is treated with personal care and given the
      support they need to reach their full potential.”
    </p>
  </div>
</div>
</section>


      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
        <Link to="/admissions">
         <button className="bg-blue-900 text-white px-8 py-3 rounded-lg">
          Apply Now
        </button>
        </Link>
      </section>
    </div>
  );
}
