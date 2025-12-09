export interface Course {
  id: string;
  title: string;
  level: 'Algo1' | 'Algo2';
  description: string;
  duration: string;
  topics: string[];
  content: {
    section: string;
    theory: string;
    codeExample: string;
  }[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to C Programming',
    level: 'Algo1',
    description: 'Learn the fundamentals of C programming language',
    duration: '4 weeks',
    topics: ['Variables', 'Data Types', 'Operators', 'Input/Output'],
    content: [
      {
        section: 'Variables and Data Types',
        theory: 'Variables are containers for storing data values. In C, you must declare the type of a variable before using it. Common data types include int (integers), float (decimal numbers), char (characters), and double (large decimal numbers).',
        codeExample: `#include <stdio.h>

int main() {
    int age = 20;
    float grade = 15.5;
    char letter = 'A';

    printf("Age: %d\\n", age);
    printf("Grade: %.1f\\n", grade);
    printf("Letter: %c\\n", letter);

    return 0;
}`
      },
      {
        section: 'Input and Output',
        theory: 'The printf() function is used to output data to the console, while scanf() is used to read input from the user. Format specifiers like %d, %f, %c are used to specify the data type.',
        codeExample: `#include <stdio.h>

int main() {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    printf("You entered: %d\\n", number);

    return 0;
}`
      }
    ]
  },
  {
    id: '2',
    title: 'Control Structures',
    level: 'Algo1',
    description: 'Master conditional statements and loops',
    duration: '3 weeks',
    topics: ['If-Else', 'Switch', 'While Loop', 'For Loop'],
    content: [
      {
        section: 'Conditional Statements',
        theory: 'Conditional statements allow your program to make decisions. The if statement executes code when a condition is true. You can add else for alternative actions and else if for multiple conditions.',
        codeExample: `#include <stdio.h>

int main() {
    int score;

    printf("Enter your score: ");
    scanf("%d", &score);

    if (score >= 16) {
        printf("Excellent!\\n");
    } else if (score >= 14) {
        printf("Very Good\\n");
    } else if (score >= 12) {
        printf("Good\\n");
    } else {
        printf("Keep practicing!\\n");
    }

    return 0;
}`
      },
      {
        section: 'Loops',
        theory: 'Loops allow you to execute code repeatedly. The for loop is used when you know how many times to iterate. The while loop continues as long as a condition is true.',
        codeExample: `#include <stdio.h>

int main() {
    // For loop
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // While loop
    int count = 1;
    while (count <= 5) {
        printf("%d ", count);
        count++;
    }
    printf("\\n");

    return 0;
}`
      }
    ]
  },
  {
    id: '3',
    title: 'Arrays and Strings',
    level: 'Algo1',
    description: 'Work with collections of data',
    duration: '4 weeks',
    topics: ['Arrays', 'Strings', 'Array Operations', 'String Functions'],
    content: [
      {
        section: 'Arrays',
        theory: 'An array is a collection of elements of the same type stored in contiguous memory locations. Arrays use zero-based indexing, meaning the first element is at index 0.',
        codeExample: `#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};

    // Access elements
    printf("First element: %d\\n", numbers[0]);
    printf("Last element: %d\\n", numbers[4]);

    // Loop through array
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    return 0;
}`
      },
      {
        section: 'Strings',
        theory: 'Strings in C are arrays of characters terminated by a null character (\\0). You can manipulate strings using standard library functions like strlen(), strcpy(), strcat().',
        codeExample: `#include <stdio.h>
#include <string.h>

int main() {
    char name[50] = "Algorithm";

    printf("String: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    // Concatenate
    strcat(name, " Master");
    printf("After concat: %s\\n", name);

    return 0;
}`
      }
    ]
  },
  {
    id: '4',
    title: 'Functions and Recursion',
    level: 'Algo2',
    description: 'Master modular programming and recursive thinking',
    duration: '5 weeks',
    topics: ['Function Declaration', 'Parameters', 'Return Values', 'Recursion'],
    content: [
      {
        section: 'Functions',
        theory: 'Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce repetition, and improve readability. Functions can take parameters and return values.',
        codeExample: `#include <stdio.h>

// Function declaration
int sum(int a, int b) {
    return a + b;
}

int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    printf("Sum: %d\\n", sum(5, 3));
    printf("Factorial of 5: %d\\n", factorial(5));

    return 0;
}`
      },
      {
        section: 'Recursion',
        theory: 'Recursion is when a function calls itself. It requires a base case to stop the recursion and a recursive case that moves toward the base case. Recursion is powerful for problems like factorials, Fibonacci, and tree traversal.',
        codeExample: `#include <stdio.h>

int factorial_recursive(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial_recursive(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Factorial: %d\\n", factorial_recursive(5));
    printf("Fibonacci(7): %d\\n", fibonacci(7));

    return 0;
}`
      }
    ]
  },
  {
    id: '5',
    title: 'Pointers and Memory',
    level: 'Algo2',
    description: 'Understand memory management and pointers',
    duration: '6 weeks',
    topics: ['Pointers', 'Memory Allocation', 'Pointer Arithmetic', 'Dynamic Arrays'],
    content: [
      {
        section: 'Pointers Basics',
        theory: 'A pointer is a variable that stores the memory address of another variable. Pointers are declared using the * operator. The & operator gets the address of a variable, and * dereferences a pointer to access the value.',
        codeExample: `#include <stdio.h>

int main() {
    int value = 42;
    int *ptr = &value;

    printf("Value: %d\\n", value);
    printf("Address: %p\\n", (void*)&value);
    printf("Pointer points to: %p\\n", (void*)ptr);
    printf("Value via pointer: %d\\n", *ptr);

    // Modify via pointer
    *ptr = 100;
    printf("New value: %d\\n", value);

    return 0;
}`
      },
      {
        section: 'Dynamic Memory Allocation',
        theory: 'Dynamic memory allocation allows you to allocate memory at runtime using malloc(), calloc(), and realloc(). Always free dynamically allocated memory using free() to prevent memory leaks.',
        codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    // Use the array
    for (int i = 0; i < n; i++) {
        arr[i] = i * 10;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`
      }
    ]
  },
  {
    id: '6',
    title: 'Data Structures',
    level: 'Algo2',
    description: 'Implement fundamental data structures',
    duration: '8 weeks',
    topics: ['Linked Lists', 'Stacks', 'Queues', 'Trees'],
    content: [
      {
        section: 'Linked Lists',
        theory: 'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a pointer to the next node. Unlike arrays, linked lists can easily grow and shrink in size.',
        codeExample: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void printList(struct Node* head) {
    struct Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = malloc(sizeof(struct Node));
    struct Node* second = malloc(sizeof(struct Node));
    struct Node* third = malloc(sizeof(struct Node));

    head->data = 1;
    head->next = second;

    second->data = 2;
    second->next = third;

    third->data = 3;
    third->next = NULL;

    printList(head);

    free(head);
    free(second);
    free(third);

    return 0;
}`
      },
      {
        section: 'Stacks',
        theory: 'A stack is a Last-In-First-Out (LIFO) data structure. Elements are added (pushed) and removed (popped) from the same end called the top. Stacks are useful for undo operations, parsing expressions, and function call management.',
        codeExample: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100

struct Stack {
    int arr[MAX];
    int top;
};

void push(struct Stack* stack, int value) {
    if (stack->top < MAX - 1) {
        stack->arr[++stack->top] = value;
    }
}

int pop(struct Stack* stack) {
    if (stack->top >= 0) {
        return stack->arr[stack->top--];
    }
    return -1;
}

int main() {
    struct Stack stack = {.top = -1};

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    printf("Popped: %d\\n", pop(&stack));
    printf("Popped: %d\\n", pop(&stack));

    return 0;
}`
      }
    ]
  }
];
