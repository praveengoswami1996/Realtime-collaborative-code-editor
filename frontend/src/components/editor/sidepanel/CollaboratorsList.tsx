import React, { useMemo } from "react";
import { User, Circle } from "lucide-react";
import { useParams } from "next/navigation";
import useGetDocumentById from "@/hooks/queries/documents/useGetDocumentById";
import { useAppSelector } from "@/hooks/redux";
import { useAuth } from "@/hooks/useAuth";

type Collaborator = {
  _id: string;
  name: string;
  email: string;
}

const CollaboratorsList: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { data } = useGetDocumentById(documentId);
  const { document } = data || {};

  const { user } = useAuth();

  const onlineUsers = useAppSelector((state) => state.collaborators.onlineUsers)
  const onlineUsersSet = useMemo(() => new Set(onlineUsers), [onlineUsers])

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
        <h3 className="text-sm font-medium text-white">Collaborators {document.collaborators.length}</h3>
        <p className="text-xs text-gray-400 mt-1">{onlineUsers.length || 0} active in this session</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {document.collaborators.map((collaborator: Collaborator) => {
          const isOnline = onlineUsersSet.has(collaborator._id)
          const status = isOnline ? "online" : "offline"
          return (
            <div
              key={collaborator._id}
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
                      status
                    )} fill-current`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    {collaborator._id === user?.id ? "You" : collaborator.name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{status}</p>
                  {true && (
                    <p className="text-xs text-gray-500">Editing Line 58</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
