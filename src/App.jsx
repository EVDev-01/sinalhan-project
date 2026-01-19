import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, Award, Shield, TrendingUp, BookOpen, Users, FileText, AlertCircle, CheckCircle, Flag, X, Menu, Plus, Send } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Initialize sample data
  useEffect(() => {
    const sampleQuestions = [
      {
        id: 1,
        title: "How to process clearance for graduating students?",
        content: "I'm graduating this semester and confused about the clearance process. What are the exact steps and which offices should I visit first?",
        author: "Anonymous Iskolar",
        tags: ["clearance", "graduation", "administrative"],
        campus: "Main Campus",
        department: "General",
        votes: 23,
        comments: [],
        views: 342,
        timestamp: "2 days ago"
      },
      {
        id: 2,
        title: "Best professors for Data Structures course?",
        content: "Planning to take Data Structures next sem. Who are the best professors in terms of teaching style and fairness in grading?",
        author: "Anonymous Iskolar",
        tags: ["professors", "computer-science", "course-selection"],
        campus: "Main Campus",
        department: "Computer Science",
        votes: 45,
        comments: [],
        views: 891,
        timestamp: "5 hours ago"
      },
      {
        id: 3,
        title: "DOST Scholarship renewal requirements 2026?",
        content: "My DOST scholarship is up for renewal. What are the updated requirements and GWA needed to maintain it?",
        author: "Anonymous Iskolar",
        tags: ["scholarship", "DOST", "financial-aid"],
        campus: "Main Campus",
        department: "General",
        votes: 67,
        comments: [],
        views: 1245,
        timestamp: "1 day ago"
      },
      {
        id: 4,
        title: "Late enrollment process - is it still possible?",
        content: "I missed the regular enrollment period due to medical reasons. Can I still enroll late? What documents do I need?",
        author: "Anonymous Iskolar",
        tags: ["enrollment", "administrative", "deadlines"],
        campus: "Main Campus",
        department: "General",
        votes: 12,
        comments: [],
        views: 234,
        timestamp: "3 hours ago"
      }
    ];
    setQuestions(sampleQuestions);
  }, []);

  const allTags = [
    "enrollment", "clearance", "graduation", "administrative", "scholarship",
    "DOST", "financial-aid", "professors", "course-selection", "computer-science",
    "engineering", "business", "deadlines", "requirements", "registration"
  ];

  const campuses = ["All Campuses", "Main Campus", "Santa Rosa Campus", "Biñan Campus", "San Pedro Campus", "Calauan Campus"];

  // Vote handler
  const handleVote = (questionId, direction) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, votes: q.votes + (direction === 'up' ? 1 : -1) };
      }
      return q;
    }));

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion({
        ...selectedQuestion,
        votes: selectedQuestion.votes + (direction === 'up' ? 1 : -1)
      });
    }
  };

  // Add comment handler
  const handleAddComment = (questionId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "Anonymous Iskolar",
      timestamp: "just now",
      votes: 0
    };

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, comments: [...q.comments, newComment] };
      }
      return q;
    }));

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion({
        ...selectedQuestion,
        comments: [...selectedQuestion.comments, newComment]
      });
    }
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Iskolar Overflow QNA</span>
            </button>

            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Questions
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Tags
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('ask')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Question</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Dashboard / Question Feed
  const Dashboard = () => {
    const filteredQuestions = questions.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => q.tags.includes(tag));
      return matchesSearch && matchesTags;
    });

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Iskolar Overflow</h1>
                <p className="text-blue-100">Anonymous campus Q&A - Ask anything, help everyone</p>
              </div>
              <Shield className="w-16 h-16 text-blue-200 hidden md:block" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h3 className="font-bold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Filter by Tags
                </h3>
                <div className="space-y-2">
                  {allTags.slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(selectedTags.filter(t => t !== tag));
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}
                      className={`block w-full text-left px-3 py-2 rounded text-sm transition ${selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="mt-4 text-sm text-red-600 hover:text-red-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredQuestions.length} Questions
                  </h2>
                  <button
                    onClick={() => setCurrentPage('ask')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Ask Question
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTags([]);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map(question => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Question Card Component
  const QuestionCard = ({ question }) => (
    <div
      onClick={() => {
        setSelectedQuestion(question);
        setCurrentPage('question-detail');
      }}
      className="bg-white rounded-lg shadow hover:shadow-md transition p-6 cursor-pointer"
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">{question.votes}</span>
            <span>votes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">{question.comments.length}</span>
            <span>comments</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-900">{question.views}</span>
            <span>views</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2">
            {question.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-2">{question.content}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
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

  // Question Detail Page
  const QuestionDetail = () => {
    const [newComment, setNewComment] = useState('');

    if (!selectedQuestion) return null;

    const handleSubmitComment = () => {
      if (newComment.trim()) {
        handleAddComment(selectedQuestion.id, newComment);
        setNewComment('');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-blue-600 hover:text-blue-700 mb-6 flex items-center font-medium"
          >
            ← Back to Questions
          </button>

          {/* Question */}
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(selectedQuestion.id, 'up');
                  }}
                  className="p-2 hover:bg-blue-50 rounded transition"
                >
                  <ChevronUp className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                </button>
                <span className="text-2xl font-bold text-gray-900">{selectedQuestion.votes}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(selectedQuestion.id, 'down');
                  }}
                  className="p-2 hover:bg-red-50 rounded transition"
                >
                  <ChevronDown className="w-6 h-6 text-gray-600 hover:text-red-600" />
                </button>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedQuestion.title}
                </h1>
                <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-wrap">
                  {selectedQuestion.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedQuestion.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <span>{selectedQuestion.campus}</span>
                    <span>•</span>
                    <span>{selectedQuestion.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Asked {selectedQuestion.timestamp} by</span>
                    <span className="font-medium">{selectedQuestion.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
              {selectedQuestion.comments.length} Comments
            </h2>

            {selectedQuestion.comments.length > 0 && (
              <div className="space-y-4 mb-8">
                {selectedQuestion.comments.map(comment => (
                  <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
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
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts, ask for clarification, or provide additional context..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Post Comment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ask Question Page
  const AskQuestionPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [campus, setCampus] = useState('Main Campus');
    const [department, setDepartment] = useState('General');

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
          timestamp: "just now"
        };
        setQuestions([newQuestion, ...questions]);
        setSelectedQuestion(newQuestion);
        setCurrentPage('question-detail');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
          <p className="text-gray-600 mb-8">Share your question with the community anonymously</p>

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
                  {campuses.slice(1).map(c => (
                    <option key={c} value={c}>{c}</option>
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
                {allTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (tags.includes(tag)) {
                        setTags(tags.filter(t => t !== tag));
                      } else if (tags.length < 5) {
                        setTags([...tags, tag]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition ${tags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } ${tags.length >= 5 && !tags.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-900">
                <strong>Anonymous Posting:</strong> Your question will be posted as "Anonymous Iskolar". Your identity remains completely protected.
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <button
                onClick={() => setCurrentPage('dashboard')}
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

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'question-detail' && <QuestionDetail />}
      {currentPage === 'ask' && <AskQuestionPage />}
    </div>
  );
};

export default App;