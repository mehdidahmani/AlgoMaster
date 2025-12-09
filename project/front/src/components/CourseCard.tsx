import { Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../data/courses';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              course.level === 'Algo1'
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {course.level}
          </span>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>

        <div className="flex items-center text-blue-600 text-sm font-medium">
          <BookOpen className="w-4 h-4 mr-1" />
          <span>{course.topics.length} topics</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {course.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {topic}
            </span>
          ))}
          {course.topics.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{course.topics.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
