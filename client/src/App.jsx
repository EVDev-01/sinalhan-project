import { useState } from "react";
import Navigation from "./components/layout/Navigation";
import Dashboard from "./pages/Dashboard";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import { useQuestions } from "./hooks/useQuestions";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const {
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
  } = useQuestions();

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    refreshQuestion(question.id); // Refresh to get latest data & increment views
    setCurrentPage("question-detail");
  };

  const handleAskQuestion = () => {
    setCurrentPage("ask");
  };

  const handleSubmitQuestion = async (newQuestion) => {
    try {
      const createdQuestion = await addQuestion(newQuestion);
      setSelectedQuestion(createdQuestion);
      setCurrentPage("question-detail");
    } catch (err) {
      console.error("Failed to create question:", err);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
    fetchQuestions();
  };

  // Show loading state
  if (loading && currentPage === "dashboard") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Data</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "dashboard" && (
        <Dashboard
          questions={questions}
          onQuestionClick={handleQuestionClick}
          onAskQuestion={handleAskQuestion}
        />
      )}

      {currentPage === "question-detail" && (
        <QuestionDetailPage
          selectedQuestion={selectedQuestion}
          onVote={handleVote}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onDeleteQuestion={handleDeleteQuestion}
          onBack={handleBackToDashboard}
        />
      )}

      {currentPage === "ask" && (
        <AskQuestionPage
          onSubmit={handleSubmitQuestion}
          onCancel={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;
