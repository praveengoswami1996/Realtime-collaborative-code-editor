import { ArrowLeft, FileText, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import InfoItem from "../common/InfoItem";

interface ProjectDetailsHeaderProps {
  projectName: string;
  projectOwnerName: string;
  collaboratorsCount: number;
  documentsCount: number;
}

const ProjectDetailsHeader: React.FC<ProjectDetailsHeaderProps> = ({
  projectName,
  projectOwnerName,
  collaboratorsCount,
  documentsCount
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={"/dashboard"}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {projectName}
            </h1>
            <p className="text-sm text-gray-500">by {projectOwnerName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <InfoItem
            icon={Users}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
            text="Collaborators"
            subText={collaboratorsCount}
          />

          <InfoItem
            icon={FileText}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
            text="Documents"
            subText={documentsCount}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsHeader;
