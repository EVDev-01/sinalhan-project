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
    handleVote,
    handleAddComment,
    addQuestion,
  } = useQuestions();

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setCurrentPage("question-detail");
  };

  const handleAskQuestion = () => {
    setCurrentPage("ask");
  };

  const handleSubmitQuestion = (newQuestion) => {
    addQuestion(newQuestion);
    setSelectedQuestion(newQuestion);
    setCurrentPage("question-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };

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
