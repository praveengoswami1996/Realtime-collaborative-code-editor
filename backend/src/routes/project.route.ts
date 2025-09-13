import { Router } from "express";
import { addCollaboratorHandler, createDocumentHandler, createProjectHandler, getOwnedProjectsHandler, getProjectDetailsHandler, getSharedProjectsHandler } from "../controllers/project.controller";

const projectRoutes = Router();

// Prefix: /api/projects
projectRoutes.post("/", createProjectHandler); // Create a new project
projectRoutes.get("/owned", getOwnedProjectsHandler); // Get all owned projects
projectRoutes.get("/shared", getSharedProjectsHandler); // Get all shared projects
projectRoutes.get("/:projectId", getProjectDetailsHandler); // Get project details by projectId
projectRoutes.post("/:projectId/collaborators", addCollaboratorHandler); // Add a collaborator to a project
projectRoutes.post("/:projectId/documents", createDocumentHandler); // Create new document inside a project


export default projectRoutes;