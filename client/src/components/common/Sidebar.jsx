import { FileText } from "lucide-react";
import { allTags } from "../../data/mockData";

const Sidebar = ({ selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="lg:w-64 shrink-0">
      <div className="bg-white rounded-lg shadow p-6 sticky top-20">
        <h3 className="font-bold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Filter by Tags
        </h3>
        <div className="space-y-2">
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                selectedTags.includes(tag)
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
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
  );
};

export default Sidebar;
