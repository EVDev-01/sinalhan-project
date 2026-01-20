import QuestionDetail from "../components/questions/QuestionDetail";

const QuestionDetailPage = ({
  selectedQuestion,
  onVote,
  onAddComment,
  onBack,
}) => {
  if (!selectedQuestion) return null;

  return (
    <QuestionDetail
      question={selectedQuestion}
      onVote={onVote}
      onAddComment={onAddComment}
      onBack={onBack}
    />
  );
};

export default QuestionDetailPage;
