import React from "react";
import { ArrowLeft, Folder } from "lucide-react";

interface EditorHeaderProps {
  documentName: string;
  projectName: string;
  documentId?: string;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  documentName,
  projectName,
  documentId,
}) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Project</span>
        </button>

        <div className="h-6 w-px bg-gray-600"></div>

        <div className="flex items-center space-x-3">
          <Folder size={18} className="text-gray-400" />
          <span className="text-gray-400 text-sm">{projectName}</span>
          <span className="text-gray-500">/</span>
          <span className="text-white font-medium">{documentName}</span>
        </div>

        {documentId && (
          <div className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
            ID: {documentId}
          </div>
        )}
      </div>
    </header>
  );
};

export default EditorHeader;
