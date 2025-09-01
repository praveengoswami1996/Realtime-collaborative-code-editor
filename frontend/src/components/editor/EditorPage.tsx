"use client";
import React, { useState } from "react";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import SidePanel from "./SidePanel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CodeEditor from "./CodeEditor";
import { useParams } from "next/navigation";

const EditorPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [language, setLanguage] = useState("javascript");
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <EditorHeader
        documentName="main.js"
        projectName="React Dashboard Project"
        documentId={documentId}
      />

      <EditorToolbar language={language} onLanguageChange={setLanguage} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side Panel */}
        <div
          className={`transition-all duration-300 ${
            leftPanelOpen ? "w-80" : "w-0"
          } overflow-hidden`}
        >
          <SidePanel type="left" />
        </div>

        {/* Left Panel Toggle */}
        <button
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          className="w-4 bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors border-r border-gray-700"
        >
          {leftPanelOpen ? (
            <ChevronLeft size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <CodeEditor language={language} />
        </div>

        {/* Right Panel Toggle */}
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="w-4 bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors border-l border-gray-700"
        >
          {rightPanelOpen ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>

        {/* Right Side Panel */}
        <div
          className={`transition-all duration-300 ${
            rightPanelOpen ? "w-80" : "w-0"
          } overflow-hidden`}
        >
          <SidePanel type="right" />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
