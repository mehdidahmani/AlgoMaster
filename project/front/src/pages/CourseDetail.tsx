import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { courses } from '../data/courses';

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/courses"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Courses</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  course.level === 'Algo1'
                    ? 'bg-green-500'
                    : 'bg-orange-500'
                }`}
              >
                {course.level}
              </span>
              <div className="flex items-center space-x-2 text-blue-100">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-blue-100">{course.description}</p>
          </div>

          <div className="px-8 py-6 bg-blue-50 border-b">
            <div className="flex items-center space-x-2 text-blue-900 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Topics Covered</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-blue-700 text-sm rounded-full shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {course.content.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">{item.section}</h2>
              </div>

              <div className="px-6 py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Theory</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{item.theory}</p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Code Example</h3>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-green-400 font-mono text-sm">
                      {item.codeExample}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
          <p className="text-blue-100 mb-6">
            Test your knowledge with exercises related to this course
          </p>
          <Link
            to="/exercises"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Go to Exercises
          </Link>
        </div>
      </div>
    </div>
  );
}
