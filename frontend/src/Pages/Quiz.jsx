import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizCard from "../Components/Quizcard";

const quizData = [
  {
    id: 1,
    title: "React Basics",
    quizQuestions: [
      {
        question: "What is a React component?",
        options: ["A function", "A variable", "A class", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        question: "What hook is used for state management?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState"
      },
      {
        question: "What is JSX?",
        options: ["A CSS preprocessor", "A JavaScript extension", "A database", "A server"],
        correctAnswer: "A JavaScript extension"
      },
      // ...add more questions
    ]
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    quizQuestions: [
      {
        question: "Which method creates a new array from a filtered subset?",
        options: ["map", "filter", "reduce", "forEach"],
        correctAnswer: "filter"
      },
      {
        question: "What is a closure?",
        options: ["A function inside a function", "A variable", "A loop", "A class"],
        correctAnswer: "A function inside a function"
      },
      {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "const", "static"],
        correctAnswer: "let"
      },
      // ...add more questions
    ]
  },
  {
    id: 3,
    title: "MongoDB Concepts",
    quizQuestions: [
      {
        question: "What is MongoDB?",
        options: ["Relational DB", "NoSQL DB", "Frontend framework", "Server"],
        correctAnswer: "NoSQL DB"
      },
      {
        question: "Which command inserts a document?",
        options: ["insertOne", "addDoc", "putDoc", "create"],
        correctAnswer: "insertOne"
      },
      {
        question: "What is a collection?",
        options: ["A table", "A group of documents", "A schema", "A query"],
        correctAnswer: "A group of documents"
      },
      // ...add more questions
    ]
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    quizQuestions: [
      {
        question: "Node.js is based on which language?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: "JavaScript"
      },
      {
        question: "Which module is used for file operations?",
        options: ["http", "fs", "path", "os"],
        correctAnswer: "fs"
      },
      {
        question: "What is npm?",
        options: ["Node Package Manager", "Node Project Module", "New Programming Method", "None"],
        correctAnswer: "Node Package Manager"
      },
      // ...add more questions
    ]
  },
  {
    id: 5,
    title: "JavaScript Basics",
    quizQuestions: [
      {
        question: "Which of the following is a JavaScript data type?",
        options: ["Number", "String", "Boolean", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        question: "Which symbol is used for single-line comments?",
        options: ["//", "/*", "<!--", "#"],
        correctAnswer: "//"
      },
      {
        question: "How do you declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: "All of the above"
      },
      // ...add more questions
    ]
  },
  {
    id: 6,
    title: "HTML & CSS Essentials",
    quizQuestions: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        question: "Which tag is used for the largest heading?",
        options: ["<h1>", "<h6>", "<head>", "<header>"],
        correctAnswer: "<h1>"
      },
      {
        question: "Which property is used to change text color in CSS?",
        options: ["font-color", "text-color", "color", "background-color"],
        correctAnswer: "color"
      },
      // ...add more questions
    ]
  },
];

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizData.find(q => q.id === Number(id));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!quiz) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz not found</h2>
        <p>No quiz found for this topic.</p>
      </div>
    );
  }

  const total = quiz.quizQuestions.length;
  const questionObj = quiz.quizQuestions[current];

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleSubmit = () => {
    const correct = quiz.quizQuestions.reduce((acc, q, index) => {
      return acc + (answers[index] === q.correctAnswer ? 1 : 0);
    }, 0);
    const totalScore = Math.round((correct / total) * 100);
    const results = quiz.quizQuestions.map((q, index) => ({
      question: q.question,
      answer: answers[index] || "Not answered",
      isCorrect: answers[index] === q.correctAnswer,
    }));
    navigate("/result", {
      state: {
        quizTitle: quiz.title,
        totalScore,
        correct,
        incorrect: total - correct,
        total,
        answers: results,
      },
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{quiz.title}</h2>
      <QuizCard
        question={questionObj.question}
        options={questionObj.options}
        selectedOption={answers[current]}
        onSelect={handleSelect}
      />
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Question {current + 1} of {total}
        </span>
        {current === total - 1 ? (
          <button
            className="bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setCurrent(current + 1)}
            disabled={current === total - 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
