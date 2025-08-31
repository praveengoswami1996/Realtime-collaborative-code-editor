import React from "react";
import { ArrowLeft, LogOut, Settings, User } from "lucide-react";
import { User as UserType, Project } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProjectHeaderProps {
  project: Project;
  currentUser: UserType;
  onBackToDashboard: () => void;
  onLogout: () => void;
}

export default function Header2() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Project Name here
            </h1>
            <p className="text-sm text-gray-500">
              by -Project Owner name here-
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg"}
                alt={user?.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
