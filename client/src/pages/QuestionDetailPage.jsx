import QuestionDetail from "../components/questions/QuestionDetail";

const QuestionDetailPage = ({
  selectedQuestion,
  onVote,
  onAddComment,
  onDeleteComment,
  onDeleteQuestion,
  onBack,
}) => {
  if (!selectedQuestion) return null;

  return (
    <QuestionDetail
      question={selectedQuestion}
      onVote={onVote}
      onAddComment={onAddComment}
      onDeleteComment={onDeleteComment}
      onDeleteQuestion={onDeleteQuestion}
      onBack={onBack}
    />
  );
};

export default QuestionDetailPage;
