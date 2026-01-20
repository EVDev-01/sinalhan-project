import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Send,
  Smile,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const QuestionDetail = ({ question, onVote, onAddComment, onBack }) => {
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(question.id, newComment);
      setNewComment("");
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewComment((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="text-red-600 hover:text-red-700 mb-6 flex items-center font-medium"
        >
          ← Back to Questions
        </button>

        {/* Question */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex gap-6">
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => onVote(question.id, "up")}
                className="p-2 hover:bg-red-50 rounded transition"
              >
                <ChevronUp className="w-6 h-6 text-gray-600 hover:text-red-600" />
              </button>
              <span className="text-2xl font-bold text-gray-900">
                {question.votes}
              </span>
              <button
                onClick={() => onVote(question.id, "down")}
                className="p-2 hover:bg-red-50 rounded transition"
              >
                <ChevronDown className="w-6 h-6 text-gray-600 hover:text-red-600" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>
              <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-wrap">
                {question.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <span>{question.campus}</span>
                  <span>•</span>
                  <span>{question.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Asked {question.timestamp} by</span>
                  <span className="font-medium">{question.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-red-600" />
            {question.comments.length} Comments
          </h2>

          {question.comments.length > 0 && (
            <div className="space-y-4 mb-8">
              {question.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-4 border-red-200 pl-4 py-2"
                >
                  <p className="text-gray-700 mb-2">{comment.text}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">{comment.author}</span>
                    <span className="mx-2">•</span>
                    <span>{comment.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Add a Comment</h3>
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts, ask for clarification, or provide additional context... 😊"
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
              />

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-0 z-10">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
              >
                <Smile className="w-5 h-5" />
                <span className="text-sm">Add Emoji</span>
              </button>

              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Post Comment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
