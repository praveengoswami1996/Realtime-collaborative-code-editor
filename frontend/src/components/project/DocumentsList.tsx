import dayjs from "dayjs";
import { Clock, ExternalLink, FileText, Plus, User } from "lucide-react";
import React from "react";
import InfoItem from "../common/InfoItem";
import { Button } from "../ui/button";

type Owner = {
    _id: string;
    name: string;
    email: string;
}

interface Document {
    _id: string;
    name: string;
    code: string;
    language: string;
    owner: Owner; //ownerID
    project: string; // projectID
    collaborators: string;
    history: string;
    createdAt: string;
    updatedAt: string;
}

interface DocumentListProps {
    documents: Document[];
}

const DocumentsList: React.FC<DocumentListProps> = ({ documents }) => {

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: "bg-yellow-100 text-yellow-800",
      typescript: "bg-blue-100 text-blue-800",
      python: "bg-green-100 text-green-800",
      css: "bg-cyan-100 text-cyan-800",
      html: "bg-orange-100 text-orange-800",
      json: "bg-lime-100 text-lime-800",
      markdown: "bg-indigo-100 text-indigo-800",
    };
    return colors[language] || "bg-gray-100 text-gray-800";
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <InfoItem
          icon={FileText}
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-600"
          text="Documents"
          subText={`${documents?.length} files`}
        />

        <Button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No documents yet</p>
          <p className="text-sm text-gray-400">
            Create your first document to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="font-medium text-gray-900 truncate">
                      {document.name}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(
                        document.language
                      )}`}
                    >
                      {document.language}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {dayjs(document.createdAt).format("MMM D, hh:mm A")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{document.owner.name}</span>
                    </div>

                    <span>5 KB</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium">Open</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsList;
