/* This model represents a single code file, its content, language, and version history. */

import mongoose, { Schema, Document, Types } from "mongoose";

// TypeScript Interface for Document History Entry
export interface IDocumentHistoryEntry {
  code: string;
  timestamp: Date;
  userId: Types.ObjectId; // User who made the change
}

export interface IDocument extends Document {
  name: string;
  code: string; // Current content of the code file
  language: string; // Programming language (e.g., 'javascript', 'typescript', 'python')
  owner: Types.ObjectId; // Reference to the User who created this document
  project: Types.ObjectId; // Reference to the Project this document belongs to
  collaborators: Types.ObjectId[]; // Array of references to User models who can collaborate on this specific document
  history: IDocumentHistoryEntry[]; // Array of past versions
  createdAt: Date;
  updatedAt: Date;
}

// 3. Mongoose Schema Definition
const DocumentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Document name is required"],
      trim: true,
      maxlength: [100, "Document name cannot be more than 100 characters"],
    },
    code: {
      type: String,
      default: "", // Default to an empty string
    },
    language: {
      type: String,
      required: true,
      default: "javascript", // Default language
      enum: [
        "javascript",
        "typescript",
        "python",
        "java",
        "csharp",
        "plaintext",
        "html",
        "css",
        "json",
        "markdown",
      ], // Supported languages
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true, // Every document must belong to a project
    },
    collaborators: [
      // Users who can collaborate on this specific document
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    history: [
      // Array to store document versions
      {
        code: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// 4. Create and export the Document Model
const DocumentModel = mongoose.model<IDocument>("Document", DocumentSchema);
export default DocumentModel;
