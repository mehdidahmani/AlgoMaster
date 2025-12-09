export interface Exercise {
  id: string;
  title: string;
  type: 'qcm' | 'quiz' | 'code';
  statement: string;
  options?: string[];
  correctAnswer?: string | number;
  tests?: { input: string; expectedOutput: string }[];
}

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Variable Declaration',
    type: 'qcm',
    statement: 'Which of the following is the correct way to declare an integer variable in C?',
    options: [
      'int x;',
      'integer x;',
      'var x: int;',
      'x = int;'
    ],
    correctAnswer: 0
  },
  {
    id: '2',
    title: 'Printf Format Specifier',
    type: 'qcm',
    statement: 'What is the format specifier for printing a float in C?',
    options: [
      '%d',
      '%f',
      '%s',
      '%c'
    ],
    correctAnswer: 1
  },
  {
    id: '3',
    title: 'Loop Concept',
    type: 'quiz',
    statement: 'What is the output of the following code?\n\nfor (int i = 0; i < 3; i++) {\n    printf("%d ", i);\n}',
    correctAnswer: '0 1 2'
  },
  {
    id: '4',
    title: 'Array Size',
    type: 'quiz',
    statement: 'If you declare an array as "int arr[5];", what is the index of the last element?',
    correctAnswer: '4'
  },
  {
    id: '5',
    title: 'Sum of Two Numbers',
    type: 'code',
    statement: 'Write a program that reads two integers and prints their sum.',
    tests: [
      { input: '5 3', expectedOutput: '8' },
      { input: '10 20', expectedOutput: '30' },
      { input: '-5 5', expectedOutput: '0' }
    ]
  },
  {
    id: '6',
    title: 'Even or Odd',
    type: 'code',
    statement: 'Write a program that reads an integer and prints "Even" if it is even, "Odd" if it is odd.',
    tests: [
      { input: '4', expectedOutput: 'Even' },
      { input: '7', expectedOutput: 'Odd' },
      { input: '0', expectedOutput: 'Even' }
    ]
  },
  {
    id: '7',
    title: 'Factorial',
    type: 'code',
    statement: 'Write a program that calculates the factorial of a given number n.',
    tests: [
      { input: '5', expectedOutput: '120' },
      { input: '3', expectedOutput: '6' },
      { input: '0', expectedOutput: '1' }
    ]
  },
  {
    id: '8',
    title: 'Pointer Basics',
    type: 'qcm',
    statement: 'What operator is used to get the address of a variable?',
    options: [
      '*',
      '&',
      '%',
      '#'
    ],
    correctAnswer: 1
  },
  {
    id: '9',
    title: 'Recursion',
    type: 'quiz',
    statement: 'What is the base case in a recursive function?',
    correctAnswer: 'The condition that stops the recursion'
  },
  {
    id: '10',
    title: 'Find Maximum',
    type: 'code',
    statement: 'Write a program that finds the maximum of three integers.',
    tests: [
      { input: '5 10 3', expectedOutput: '10' },
      { input: '15 8 20', expectedOutput: '20' },
      { input: '7 7 7', expectedOutput: '7' }
    ]
  }
];
