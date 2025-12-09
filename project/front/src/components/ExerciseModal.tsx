import { X } from 'lucide-react';
import { useState } from 'react';
import { Exercise } from '../data/exercises';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: Omit<Exercise, 'id'>) => void;
  exercise?: Exercise;
}

export default function ExerciseModal({ isOpen, onClose, onSave, exercise }: ExerciseModalProps) {
  const [title, setTitle] = useState(exercise?.title || '');
  const [type, setType] = useState<'qcm' | 'quiz' | 'code'>(exercise?.type || 'qcm');
  const [statement, setStatement] = useState(exercise?.statement || '');
  const [options, setOptions] = useState<string[]>(exercise?.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string | number>(
    exercise?.correctAnswer || (exercise?.type === 'qcm' ? 0 : '')
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExercise: Omit<Exercise, 'id'> = {
      title,
      type,
      statement,
      ...(type === 'qcm' && { options, correctAnswer: Number(correctAnswer) }),
      ...(type === 'quiz' && { correctAnswer: String(correctAnswer) }),
      ...(type === 'code' && { tests: [] })
    };

    onSave(newExercise);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setType('qcm');
    setStatement('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {exercise ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'qcm' | 'quiz' | 'code')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="qcm">Multiple Choice (QCM)</option>
              <option value="quiz">Text Answer</option>
              <option value="code">Code Exercise</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statement
            </label>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {type === 'qcm' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer (0-3)
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(Number(e.target.value))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {type === 'quiz' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {exercise ? 'Update' : 'Add'} Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
