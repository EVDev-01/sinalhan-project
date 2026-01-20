import { useState } from "react";
import { AlertCircle, Shield } from "lucide-react";
import { allTags, campuses } from "../../data/mockData";

const AskQuestionForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [campus, setCampus] = useState("Main Campus");
  const [department, setDepartment] = useState("General");

  const handleSubmit = () => {
    if (title.trim() && content.trim() && tags.length > 0) {
      const newQuestion = {
        id: Date.now(),
        title,
        content,
        author: "Anonymous Iskolar",
        tags,
        campus,
        department,
        votes: 0,
        comments: [],
        views: 0,
        timestamp: "just now",
      };
      onSubmit(newQuestion);
    }
  };

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else if (tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
        <p className="text-gray-600 mb-8">
          Share your question with the community anonymously
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Tips for asking a great question
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific and clear in your title</li>
            <li>• Provide all relevant context and details</li>
            <li>• Use appropriate tags to help others find your question</li>
            <li>• Be respectful and follow community guidelines</li>
            <li>• Your question will be posted anonymously</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to process scholarship renewal for DOST scholars?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Details *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more context, what you've tried, and what specific help you need..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campus
              </label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {campuses.slice(1).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>General</option>
                <option>Information Technology</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Accounting</option>
                <option>Entrepreneurship</option>
                <option>Education</option>
                <option>Psychology</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (select up to 5) *
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    tags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } ${tags.length >= 5 && !tags.includes(tag) ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={tags.length >= 5 && !tags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {tags.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {tags.length}/5 tags
              </p>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div className="text-sm text-green-900">
              <strong>Anonymous Posting:</strong> Your question will be posted
              as "Anonymous Iskolar". Your identity remains completely
              protected.
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || tags.length === 0}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Post Question Anonymously
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;
