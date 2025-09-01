import React from "react";
import { Clock, User, RotateCcw, Eye } from "lucide-react";

interface Version {
  id: string;
  timestamp: string;
  user: string;
  message: string;
  changes: string;
}

const VersionHistory: React.FC = () => {
  const versions: Version[] = [
    {
      id: "v1.0.8",
      timestamp: "2 minutes ago",
      user: "John Doe",
      message: "Fixed async/await error handling",
      changes: "+12 -5",
    },
    {
      id: "v1.0.7",
      timestamp: "15 minutes ago",
      user: "Sarah Wilson",
      message: "Added user authentication flow",
      changes: "+45 -12",
    },
    {
      id: "v1.0.6",
      timestamp: "1 hour ago",
      user: "Mike Chen",
      message: "Refactored API client structure",
      changes: "+23 -18",
    },
    {
      id: "v1.0.5",
      timestamp: "3 hours ago",
      user: "Emma Davis",
      message: "Initial TypeScript migration",
      changes: "+156 -89",
    },
    {
      id: "v1.0.4",
      timestamp: "Yesterday",
      user: "John Doe",
      message: "Added error boundaries and loading states",
      changes: "+67 -23",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Version History</h3>
        <p className="text-xs text-gray-400 mt-1">Document revisions</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {versions.map((version, index) => (
          <div
            key={version.id}
            className="p-3 hover:bg-gray-700 border-b border-gray-700/50"
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User size={14} className="text-gray-300" />
                </div>
                {index !== versions.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-0.5 h-6 bg-gray-700 transform -translate-x-1/2" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono text-blue-400">
                    {version.id}
                  </span>
                  <span className="text-xs text-gray-500">
                    {version.timestamp}
                  </span>
                </div>

                <p className="text-sm text-white mb-1">{version.message}</p>
                <p className="text-xs text-gray-400 mb-2">by {version.user}</p>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-gray-400">{version.changes}</span>
                  <div className="flex space-x-1">
                    <button
                      className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      title="View this version"
                    >
                      <Eye size={12} />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                      title="Revert to this version"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-700 space-y-2">
        <button className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors flex items-center justify-center space-x-2">
          <Clock size={14} />
          <span>View All Versions</span>
        </button>
      </div>
    </div>
  );
};

export default VersionHistory;
