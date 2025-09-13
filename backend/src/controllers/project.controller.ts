import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import {
  addCollaboratorSchema,
  addDocumentSchema,
  projectSchema,
} from "../validations/project.validation";
import { createProject } from "../services/project.service";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/http";
import appAssert from "../utils/appAssert";
import ProjectModel from "../models/project.model";
import UserModel from "../models/user.model";
import DocumentModel from "../models/document.model";
import mongoose from "mongoose";

export const createProjectHandler = catchErrors(async function (
  req: Request,
  res: Response
) {
  // Step 1: Validate the request
  const request = projectSchema.parse(req.body);

  // Checking if the userId exists for TypeScript Safety
  const userId = req.userId;
  appAssert(
    userId,
    UNAUTHORIZED,
    "You are not authorized to perform this operation"
  );

  // Step 2: Call the Service to create the project
  const { project } = await createProject(request, userId);

  // Step 3: Return the response
  return res.status(CREATED).json({
    message: "Hurray! Project created successfully",
    project,
  });
});

export const getOwnedProjectsHandler = catchErrors(async function (
  req: Request,
  res: Response
) {
  // Step 1: Get the authenticated userId from the request object
  const userId = req.userId;

  // Step 2: Fetch all the projects created by current logged in user
  const projects = await ProjectModel.find({
    owner: req.userId,
  }).select('name createdAt updatedAt').sort({ updatedAt: -1 });

  // Step 3: Return the response
  return res.status(OK).json({
    projects,
  });
});

export const getSharedProjectsHandler = catchErrors(
  async function (req: Request, res: Response) {
    // Step 1: Get the authenticated userID from the request object
    const userId = req.userId;

    // Step 2: Fetch all the projects in which user is not owner but only a collaborator
    const projects = await ProjectModel.find({
      collaborators: { $in: [userId] },
      owner: { $ne: userId },
    })
      .select("name createdAt updatedAt")
      .sort({ updatedAt: -1 });

    // Step 3: Return the response
    return res.status(OK).json({
      projects
    })
  }
)

export const getProjectDetailsHandler = catchErrors(async function (
  req: Request,
  res: Response
) {
  const userId = req.userId;

  // Step 1. Get the projectId from the req.params
  const { projectId } = req.params;

  // Step 2. Fetch the Project
  const project = await ProjectModel.findById(projectId).populate(
    "collaborators",
    "_id name email"
  ).populate("owner", "_id name email").populate({
    path: 'documents',
    populate: {
      path: 'owner',
      select: '_id name email'
    }
  });
  appAssert(project, NOT_FOUND, "Project not found");

  // Step 3. Check if the authenticated user is a valid user (either Owner or Collaborator)
  const isOwner = project.owner.equals(userId);
  const isCollaborator = project.collaborators.some((collaboratorId) =>
    collaboratorId.equals(userId)
  );
  appAssert(
    isOwner || isCollaborator,
    FORBIDDEN,
    "Forbidden: You do not have access to this project"
  );

  // Step 4: Send the response
  return res.status(OK).json({
    project,
  });
});

export const addCollaboratorHandler = catchErrors(async function (
  req: Request,
  res: Response
) {
  // Step 1: Validate the request
  const request = addCollaboratorSchema.parse(req.body);

  const userId = req.userId;

  // Step 2: Get the projectId from the req.params
  const { projectId } = req.params;

  // Step 3: Fetch the project
  const project = await ProjectModel.findById(projectId);
  appAssert(project, NOT_FOUND, "Project not found.");

  // Step 4: Authenticated user must be owner
  const isOwner = project.owner.equals(userId);
  appAssert(
    isOwner,
    FORBIDDEN,
    "Forbidden: You don't have permission to add collaborators to this project."
  );

  // Step 5: Find the user by email
  const userToAdd = await UserModel.findOne({ email: request.email });
  appAssert(
    userToAdd,
    NOT_FOUND,
    `User with email ${request.email} not found.`
  );

  const userToAddId = userToAdd._id as mongoose.Types.ObjectId;

  // Step 6: Check if the userToAdd is owner itself
  const userIsOwner = project.owner.equals(userToAddId);
  appAssert(
    !userIsOwner,
    BAD_REQUEST,
    "Cannot add the project owner as a collaborator"
  );

  // Step 7: Check if the userToAdd is already a collaborator
  const isAlreadyCollaborator = project.collaborators.some((collaboratorId) =>
    collaboratorId.equals(userToAddId)
  );
  appAssert(
    !isAlreadyCollaborator,
    CONFLICT,
    "The user is already a collaborator on this project."
  );

  // Step 8: Add the new collaborator to the project
  project.collaborators.push(userToAddId);
  await project.save();

  // Step 9: Send the response with updated project
  res.status(OK).json({
    message: "Collaborator added successfully",
    project,
  });
});

export const createDocumentHandler = catchErrors(
  async function (req: Request, res: Response) {
    // Step 1: Validate the request
    const request = addDocumentSchema.parse(req.body);

    const userId = req.userId;

    // Step 2: Get the projectID from the req.params
    const { projectId } = req.params;

    // Step 3: Fetch the project
    const project = await ProjectModel.findById(projectId);
    appAssert(project, NOT_FOUND, "Project not found.")

    // Step 4: Authenticated user must be the owner or a collaborator
    const isOwner = project.owner.equals(userId);
    const isCollaborator = project.collaborators.some(collaboratorId => collaboratorId.equals(userId));
    appAssert(isOwner || isCollaborator, FORBIDDEN, "Forbidden: You don't have permission to add a document to this project");

    // Step 5: Add the document
    const newDocument = await DocumentModel.create({
      name: request.name,
      language: request.language,
      code: "",
      owner: userId,
      project: projectId,
      collaborators: project.collaborators,
      history: []
    })

    // Step 6: Add the document reference to the project and save
    project.documents.push(newDocument._id as mongoose.Types.ObjectId);
    await project.save();

    // Step 7: Return the response
    res.status(CREATED).json({
      message: "Document created successfully",
      document: newDocument
    })
  }
);
