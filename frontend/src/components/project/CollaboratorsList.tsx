import { Crown, Edit, Mail, Plus, Users, X } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import InfoItem from "../common/InfoItem";

interface Collaborator {
  _id: string;
  name: string;
  email: string;
}

interface CollaboratorsListProps {
  collaborators: Collaborator[];
  ownerId: string;
}

const CollaboratorsList: React.FC<CollaboratorsListProps> = ({
  collaborators,
  ownerId,
}) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case "collaborator":
        return <Edit className="w-4 h-4 text-blue-500" />;
      default:
        return <Edit className="w-4 h-4 text-blue-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800";
      case "collaborator":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <InfoItem
          icon={Users}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
          text="Collaborators"
          subText={`${collaborators.length} members`}
        />

        <Button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </Button>
      </div>

      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {collaborator.name ? (
                <Avatar className="border w-10 h-10">
                  <AvatarFallback>
                    {collaborator.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">
                    {collaborator.name}
                  </p>
                  {getRoleIcon(
                    collaborator._id === ownerId ? "owner" : "collaborator"
                  )}
                </div>
                <p className="text-sm text-gray-600">{collaborator.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  collaborator._id === ownerId ? "owner" : "collaborator"
                )}`}
              >
                {collaborator._id === ownerId ? "owner" : "collaborator"}
              </span>

              {collaborator._id !== ownerId && (
                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorsList;
