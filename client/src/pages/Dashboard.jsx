import { useState } from "react";
import { Shield, BookOpen } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import QuestionList from "../components/questions/QuestionList";

const Dashboard = ({ questions, onQuestionClick, onAskQuestion }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Iskolar Overflow
              </h1>
              <p className="text-blue-100">
                Anonymous campus Q&A - Ask anything, help everyone
              </p>
            </div>
            <Shield className="w-16 h-16 text-blue-200 hidden md:block" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

          {/* Main Content */}
          <QuestionList
            questions={questions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            onQuestionClick={onQuestionClick}
            onAskQuestion={onAskQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
