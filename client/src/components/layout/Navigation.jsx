import { HatGlasses, Plus } from "lucide-react";

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
              <HatGlasses className="w-8 h-8 text-red-700" />
              <span className="text-xl font-bold text-gray-900">
                Iskolar Overflow Q&A
              </span>
            </button>

            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`font-medium transition ${
                  currentPage === "dashboard"
                    ? "text-gray-700 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-red-700"
                }`}
              >
                Questions
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage("ask")}
              className="flex items-center space-x-2 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-800/75 active:bg-red-800/25 transition shadow-md shadow-gray-400 active:shadow-none"
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
