const QuestionCard = ({ question, onClick }) => {
  return (
    <div
      onClick={() => onClick(question)}
      className="bg-white rounded-lg shadow hover:shadow-md transition p-6 cursor-pointer"
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">
              {question.votes}
            </span>
            <span>votes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">
              {question.comments.length}
            </span>
            <span>comments</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">
              {question.views}
            </span>
            <span>views</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-red-800 hover:text-red-600 mb-2">
            {question.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-2">{question.content}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>{question.campus}</span>
              <span>•</span>
              <span>{question.department}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{question.author}</span>
              <span>•</span>
              <span>{question.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
