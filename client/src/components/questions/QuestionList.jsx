import { Search, AlertCircle } from "lucide-react";
import QuestionCard from "./QuestionCard";

const QuestionList = ({
  questions,
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  onQuestionClick,
  onAskQuestion,
}) => {
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => q.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex-1">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredQuestions.length} Questions
          </h2>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No questions found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTags([]);
            }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={onQuestionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionList;
