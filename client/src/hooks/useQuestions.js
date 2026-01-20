import { useState, useEffect } from "react";
import * as api from "../utils/api";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Vote handler
  const handleVote = async (questionId, direction) => {
    try {
      const updatedQuestion = await api.voteQuestion(questionId, direction);

      // Update questions list
      setQuestions(
        questions.map((q) => (q.id === questionId ? updatedQuestion : q)),
      );

      // Update selected question if viewing
      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion(updatedQuestion);
      }
    } catch (err) {
      console.error("Error voting:", err);
      setError(err.message);
    }
  };

  // Add comment handler
  const handleAddComment = async (questionId, commentText) => {
    if (!commentText.trim()) return;

    try {
      const updatedQuestion = await api.addComment(questionId, {
        text: commentText,
        author: "Anonymous Iskolar",
      });

      // Update questions list
      setQuestions(
        questions.map((q) => (q.id === questionId ? updatedQuestion : q)),
      );

      // Update selected question
      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion(updatedQuestion);
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err.message);
    }
  };

  // Add delete comment handler
  const handleDeleteComment = async (questionId, commentId) => {
    try {
      const cleanQuestionId = String(questionId).trim();
      const cleanCommentId = String(commentId).trim();

      const updatedQuestion = await api.deleteComment(
        cleanQuestionId,
        cleanCommentId,
      );

      // Update questions list
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === questionId ? updatedQuestion : q)),
      );

      // Update selected question
      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion(updatedQuestion);
      }

      return true;
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(err.message);
      return false;
    }
  };

  // Add delete question handler
  const handleDeleteQuestion = async (questionId) => {
    try {
      const cleanId = String(questionId).trim();
      await api.deleteQuestion(cleanId);

      // Remove from questions list using functional update
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== cleanId),
      );

      // Clear selected question if it was deleted
      if (selectedQuestion && selectedQuestion.id === cleanId) {
        setSelectedQuestion(null);
      }

      return true;
    } catch (err) {
      console.error("Error deleting question:", err);
      setError(err.message);
      return false;
    }
  };

  // Add new question
  const addQuestion = async (newQuestion) => {
    try {
      const createdQuestion = await api.postQuestion(newQuestion);
      setQuestions([createdQuestion, ...questions]);
      return createdQuestion;
    } catch (err) {
      console.error("Error creating question:", err);
      setError(err.message);
      throw err;
    }
  };

  // Refresh single question (for view count)
  const refreshQuestion = async (questionId) => {
    try {
      const question = await api.getQuestion(questionId);
      setSelectedQuestion(question);
    } catch (err) {
      console.error("Error refreshing question:", err);
      setError(err.message);
    }
  };

  return {
    questions,
    selectedQuestion,
    setSelectedQuestion,
    loading,
    error,
    handleVote,
    handleAddComment,
    handleDeleteComment,
    handleDeleteQuestion,
    addQuestion,
    refreshQuestion,
    fetchQuestions,
  };
};
