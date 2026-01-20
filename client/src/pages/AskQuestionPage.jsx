import AskQuestionForm from "../components/forms/AskQuestionForm";

const AskQuestionPage = ({ onSubmit, onCancel }) => {
  return <AskQuestionForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export default AskQuestionPage;
