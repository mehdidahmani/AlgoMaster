export interface Testimonial {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'student',
    content: 'This platform helped me understand pointers and memory management better than any textbook. The interactive exercises are fantastic!',
    rating: 5
  },
  {
    id: '2',
    name: 'Ahmed Ben Ali',
    role: 'student',
    content: 'I went from struggling with loops to implementing linked lists confidently. The step-by-step approach really works.',
    rating: 5
  },
  {
    id: '3',
    name: 'Dr. Claire Dubois',
    role: 'teacher',
    content: 'An excellent resource for teaching algorithms. My students show much better understanding since using this platform.',
    rating: 5
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    role: 'student',
    content: 'The code examples are clear and practical. I finally understand recursion!',
    rating: 5
  },
  {
    id: '5',
    name: 'Prof. Jean Dupont',
    role: 'teacher',
    content: 'Well-structured content that aligns perfectly with university curriculum. Highly recommended.',
    rating: 5
  },
  {
    id: '6',
    name: 'Leila Hassan',
    role: 'student',
    content: 'The exercises are challenging but achievable. Great for building confidence in C programming.',
    rating: 4
  }
];
