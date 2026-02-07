import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section>
      <div className="bg-blue-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-3 text-center">
          <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg sm:text-5xl font-roman">
              Yogeshwara Institute of Maths & Science
            </h2>
            <p className="text-xs sm:text-sm mt-1 text-gray-600">
              Establishment in 2015, 11 years of excellence, Rg.No 475/16
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl sm:text-5xl font-bold text-blue-900 mb-6 font-roman">
              Welcome to YIMS
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Empowering students with quality education, advanced curriculum,
              and real-world skills for a brighter future.
            </p>
            <Link to="/courses" className="inline-block mt-8 bg-blue-900 text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
