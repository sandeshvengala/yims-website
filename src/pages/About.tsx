export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          Where focused guidance, smart preparation, and consistent practice
          come together to help students achieve real exam success.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-16">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Our Mission</h2>
          <p className="text-gray-600">
            To provide affordable, high-quality coaching that empowers students
            from all backgrounds to crack competitive exams with clarity and confidence.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Our Vision</h2>
          <p className="text-gray-600">
            To become a trusted center of excellence known for concept-driven
            teaching, personalized mentoring, consistent results, and a student-first approach.
          </p>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Makes Us Different?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <ul className="space-y-2 list-disc list-inside">
            <li>Small batch sizes for individual attention</li>
            <li>Structured study plans and weekly targets</li>
            <li>Regular mock tests with performance analysis</li>
          </ul>
          <ul className="space-y-2 list-disc list-inside">
            <li>Dedicated doubt-clearing and revision sessions</li>
            <li>Exam strategies, shortcuts, and time management</li>
            <li>Motivational support and progress tracking</li>
          </ul>
        </div>
      </div>

      {/* Teaching Approach */}
      <div className="bg-blue-600 text-white rounded-2xl p-10 max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Our Teaching Approach
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-6">
          Students struggle when concepts are unclear and guidance is missing.
          Our method ensures clarity, practice, and continuous improvement.
        </p>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            "Concept Clarity First",
            "Practice with Purpose",
            "Test → Analyze → Improve",
            "Repeat Until Perfect",
          ].map((item, i) => (
            <div key={i} className="bg-white text-blue-600 p-4 rounded-xl font-semibold">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Beyond Syllabus */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Beyond Syllabus</h2>
        <p className="text-gray-600">
          We help students build discipline, confidence, time management skills,
          and a winning mindset—not just subject knowledge.
        </p>
      </div>

      
    </div>
  );
}
