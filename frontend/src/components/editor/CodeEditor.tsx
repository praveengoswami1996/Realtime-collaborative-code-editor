import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = () => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
};

export default CodeEditor;
