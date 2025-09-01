import React from "react";
import { User, Circle } from "lucide-react";

const CollaboratorsList: React.FC = () => {
  const collaborators = [
    {
      id: 1,
      name: "John Doe",
      status: "online",
      avatar: null,
      cursor: "line-45",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      status: "online",
      avatar: null,
      cursor: "line-23",
    },
    {
      id: 3,
      name: "Mike Chen",
      status: "away",
      avatar: null,
      cursor: "line-67",
    },
    {
      id: 4,
      name: "Emma Davis",
      status: "offline",
      avatar: null,
      cursor: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400";
      case "away":
        return "text-yellow-400";
      case "offline":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Collaborators (4)</h3>
        <p className="text-xs text-gray-400 mt-1">2 active in this session</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="p-3 hover:bg-gray-700 border-b border-gray-700/50"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User size={14} className="text-gray-300" />
                </div>
                <Circle
                  size={8}
                  className={`absolute -bottom-1 -right-1 ${getStatusColor(
                    collaborator.status
                  )} fill-current`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  {collaborator.name}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {collaborator.status}
                </p>
                {collaborator.cursor && (
                  <p className="text-xs text-gray-500">
                    Editing {collaborator.cursor}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-700">
        <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
          Invite Collaborators
        </button>
      </div>
    </div>
  );
};

export default CollaboratorsList;
