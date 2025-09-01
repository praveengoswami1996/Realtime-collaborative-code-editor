import { Calendar, FileText, User } from 'lucide-react';
import React from 'react'
import InfoItem from '../common/InfoItem';

interface ProjectInfoProps {
    projectName: string;
    ownerName: string;
    createdAt: string;
    documentsCount: number;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ projectName, ownerName, createdAt, documentsCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Project Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoItem
          icon={FileText}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          text="Project Name"
          subText={projectName}
        />
        <InfoItem
          icon={User}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          text="Owner"
          subText={ownerName}
        />
        <InfoItem
          icon={Calendar}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          text="Created At"
          subText={createdAt}
        />
      </div>

      {true && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
          <p className="text-sm text-gray-600">
            Render the project description here.
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Documents</span>
          <span className="font-medium text-gray-900">
            {documentsCount} Files
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo