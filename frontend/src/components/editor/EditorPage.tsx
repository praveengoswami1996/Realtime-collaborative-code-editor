"use client";
import React, { useEffect, useState } from "react";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import SidePanel from "./SidePanel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CodeEditor from "./CodeEditor";
import { useParams } from "next/navigation";
import useGetDocumentById from "@/hooks/queries/documents/useGetDocumentById";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/hooks/useAuth";
import { setOnlineUsers } from "@/store/features/collaboratorSlice";
import { useAppDispatch } from "@/hooks/redux";

const EditorPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { data, isLoading, isError} = useGetDocumentById(documentId);
  const { document } = data || {};

  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [socket, setSocket] = useState<Socket | null>(null);

  const [language, setLanguage] = useState("javascript");
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  // Establish the Web Socket Connection
  useEffect(() => {
    // 1. Create the socket connection
    const newSocket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4004"
    );
    setSocket(newSocket);

    // 2. As soon as the connection is established, tell the server which document room to join
    newSocket.on("connect", () => {
      console.log("Your socket was connected to server:", newSocket.id);
      newSocket.emit("join-document", documentId, user?.id);
    });

    // 3. --- LISTEN FOR EVENTS AFTER USER JOINS THE ROOM ---
    // Listening for the collaborators-list event from the server to get the current online users 
    newSocket.on("collaborators-list", (data) => {
      dispatch(setOnlineUsers(data));
    });

    newSocket.on(
      "user-joined",
      (data) => {
        console.log(`${data.user.name} has joined`);
      }
    );

    newSocket.on("user-left", (data) => {
      console.log(`${data} has left`);
    });

    // Disconnecting the socket as the component unmounts
    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, [documentId, user, dispatch]);
  

  if (isLoading) {
    return <div>Please wait while we make everything ready for you...</div>
  }
  

  if(isError) {
    return <div>Some error occured while fetching the document</div>
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <EditorHeader
        documentName={document.name}
        projectName={document.project.name}
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
