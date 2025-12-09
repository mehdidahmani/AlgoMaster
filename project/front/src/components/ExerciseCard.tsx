import { FileText, Code, CheckCircle } from 'lucide-react';
import { Exercise } from '../data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
  isCompleted?: boolean;
}

export default function ExerciseCard({ exercise, onClick, isCompleted }: ExerciseCardProps) {
  const getIcon = () => {
    switch (exercise.type) {
      case 'qcm':
        return <CheckCircle className="w-5 h-5" />;
      case 'quiz':
        return <FileText className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (exercise.type) {
      case 'qcm':
        return 'Multiple Choice';
      case 'quiz':
        return 'Text Answer';
      case 'code':
        return 'Code Exercise';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
    >
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
        </div>
      )}

      <div className="flex items-center space-x-3 mb-3">
        <div
          className={`p-2 rounded-lg ${
            exercise.type === 'qcm'
              ? 'bg-purple-100 text-purple-600'
              : exercise.type === 'quiz'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {getIcon()}
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            exercise.type === 'qcm'
              ? 'bg-purple-50 text-purple-700'
              : exercise.type === 'quiz'
              ? 'bg-blue-50 text-blue-700'
              : 'bg-green-50 text-green-700'
          }`}
        >
          {getTypeLabel()}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{exercise.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{exercise.statement}</p>
    </div>
  );
}
