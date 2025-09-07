import { Router } from "express";
import { getDocumentDetailsHandler } from "../controllers/document.controller";

const documentRoutes = Router();

// Prefix: /api/documents
documentRoutes.get("/:documentId", getDocumentDetailsHandler);

export default documentRoutes;