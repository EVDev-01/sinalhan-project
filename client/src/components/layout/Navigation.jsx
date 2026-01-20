import { BookOpen, Plus } from "lucide-react";

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Iskolar Overflow Q&A
              </span>
            </button>

            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`font-medium transition ${
                  currentPage === "dashboard"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
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
              onClick={() => setCurrentPage("ask")}
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
};

export default Navigation;
