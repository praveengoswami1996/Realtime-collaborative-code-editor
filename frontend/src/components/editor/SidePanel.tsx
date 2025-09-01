import React, { useState } from "react";
import CollaboratorsList from "./sidepanel/CollaboratorsList";
import ChatPanel from "./sidepanel/ChatPanel";
import VersionHistory from "./sidepanel/VersionHistory";

interface SidePanelProps {
  type: "left" | "right";
}

const SidePanel: React.FC<SidePanelProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState(
    type === "left" ? "versions" : "collaborators"
  );

  const leftTabs = [{ id: "versions", label: "Versions" }];

  const rightTabs = [
    { id: "collaborators", label: "Collaborators" },
    { id: "chat", label: "Chat" },
  ];

  const tabs = type === "left" ? leftTabs : rightTabs;

  const renderContent = () => {
    switch (activeTab) {
      case "versions":
        return <VersionHistory />;
      case "collaborators":
        return <CollaboratorsList />;
      case "chat":
        return <ChatPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-gray-700 text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  );
};

export default SidePanel;
