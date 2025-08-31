import { Router } from "express";
import { addCollaboratorHandler, createDocumentHandler, createProjectHandler, getProjectDetailsHandler, getProjectsHandler } from "../controllers/project.controller";

const projectRoutes = Router();

// Prefix: /api/project
projectRoutes.post("/", createProjectHandler); // Create a new project
projectRoutes.get("/", getProjectsHandler); // Get all projects
projectRoutes.get("/:projectId", getProjectDetailsHandler); // Get project details by projectId
projectRoutes.post("/:projectId/collaborators", addCollaboratorHandler); // Add a collaborator to a project
projectRoutes.post("/:projectId/documents", createDocumentHandler); // Create new document inside a project


export default projectRoutes;