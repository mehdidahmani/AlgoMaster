import { useState } from 'react';
import { Plus } from 'lucide-react';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseModal from '../components/ExerciseModal';
import Quiz from '../components/Quiz';
import Editor from '../components/Editor';
import { exercises as initialExercises, Exercise } from '../data/exercises';

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'qcm' | 'quiz' | 'code'>('all');

  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: String(exercises.length + 1)
    };
    setExercises([...exercises, newExercise]);
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      setCompletedExercises(new Set([...completedExercises, selectedExercise.id]));
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (selectedExercise?.type === 'code') {
      alert('Code submitted! In a real application, this would run tests.');
      handleCompleteExercise();
    }
  };

  const filteredExercises =
    filter === 'all' ? exercises : exercises.filter((ex) => ex.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedExercise ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  Practice Exercises
                </h1>
                <p className="text-xl text-gray-600">
                  Test your knowledge with interactive exercises
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add Exercise</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('qcm')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  filter === 'qcm'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Multiple Choice
              </button>
              <button
                onClick={() => setFilter('quiz')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  filter === 'quiz'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Text Answer
              </button>
              <button
                onClick={() => setFilter('code')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  filter === 'code'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Code
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 font-medium">
                Progress: {completedExercises.size} / {exercises.length} exercises completed
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedExercises.size / exercises.length) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => setSelectedExercise(exercise)}
                  isCompleted={completedExercises.has(exercise.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedExercise(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Exercises
            </button>

            {(selectedExercise.type === 'qcm' || selectedExercise.type === 'quiz') && (
              <Quiz exercise={selectedExercise} onComplete={handleCompleteExercise} />
            )}

            {selectedExercise.type === 'code' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedExercise.title}
                </h2>
                <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                  {selectedExercise.statement}
                </p>

                {selectedExercise.tests && selectedExercise.tests.length > 0 && (
                  <div className="mb-6 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Test Cases:</h3>
                    <div className="space-y-2">
                      {selectedExercise.tests.map((test, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm bg-white p-3 rounded"
                        >
                          <span className="text-gray-600">
                            Input: <code className="text-blue-600">{test.input}</code>
                          </span>
                          <span className="text-gray-600">
                            Expected: <code className="text-green-600">{test.expectedOutput}</code>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Editor onSubmit={handleCodeSubmit} />
              </div>
            )}
          </div>
        )}

        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddExercise}
        />
      </div>
    </div>
  );
}
