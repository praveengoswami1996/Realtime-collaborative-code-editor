import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  owner: Types.ObjectId; // Reference to the User who owns this project
  documents: Types.ObjectId[]; // Array of references to Document models within this project
  collaborators: Types.ObjectId[]; // Array of references to User models who can collaborate on this project
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot be more than 100 characters"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the 'User' model
      required: true,
    },
    documents: [
      // Array of document IDs belonging to this project
      {
        type: Schema.Types.ObjectId,
        ref: "Document", // References the 'Document' model
      },
    ],
    collaborators: [
      // Array of user IDs who can access/edit this project
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
