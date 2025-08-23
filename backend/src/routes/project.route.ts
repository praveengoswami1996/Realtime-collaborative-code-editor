import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { createProjectHandler } from "../controllers/project.controller";

const projectRoutes = Router();

// Prefix: /api/project
projectRoutes.post("/", createProjectHandler);


export default projectRoutes;