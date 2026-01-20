import { useState } from "react";
import { sampleQuestions } from "../data/mockData";

export const useQuestions = () => {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Vote handler
  const handleVote = (questionId, direction) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, votes: q.votes + (direction === "up" ? 1 : -1) };
        }
        return q;
      }),
    );

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion({
        ...selectedQuestion,
        votes: selectedQuestion.votes + (direction === "up" ? 1 : -1),
      });
    }
  };

  // Add comment handler
  const handleAddComment = (questionId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "Anonymous Iskolar",
      timestamp: "just now",
      votes: 0,
    };

    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, comments: [...q.comments, newComment] };
        }
        return q;
      }),
    );

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion({
        ...selectedQuestion,
        comments: [...selectedQuestion.comments, newComment],
      });
    }
  };

  // Add new question
  const addQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);
  };

  return {
    questions,
    selectedQuestion,
    setSelectedQuestion,
    handleVote,
    handleAddComment,
    addQuestion,
  };
};
