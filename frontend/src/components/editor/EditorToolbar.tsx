import React from "react";
import { Save, Play, Settings } from "lucide-react";

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  language,
  onLanguageChange,
}) => {
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <div className="h-4 w-px bg-gray-600"></div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm">
            <Save size={14} />
            <span>Save</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm">
            <Play size={14} />
            <span>Run</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-400">Last saved: 2 minutes ago</span>
        <button className="p-1 text-gray-400 hover:text-white transition-colors">
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
