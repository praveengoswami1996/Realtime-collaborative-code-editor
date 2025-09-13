import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import DocumentModel, { IPopulatedDocument } from "../models/document.model";
import appAssert from "../utils/appAssert";
import { FORBIDDEN, NOT_FOUND, OK } from "../constants/http";

export const getDocumentDetailsHandler = catchErrors(
    async function (req: Request, res: Response) {
        const userId = req.userId;

        // Step 1: Get the documentId from req.params
        const { documentId } = req.params;

        // Step 2: Fetch the document
        const document = await DocumentModel.findById<IPopulatedDocument>(documentId)
            .populate("owner", "_id name email") // Document's Owner
            .populate("collaborators", "_id name email") // Document Specific Collaborator
            .populate({
                path: "project",
                select: "name owner collaborators"
            })

        appAssert(document, NOT_FOUND, "Document not found.")

        // Step 3: Check if the authenticated user is a valid user (either Owner of the document or collaborator)
        const isProjectOwner = document.project.owner.equals(userId);
        const isProjectCollaborator = document.project.collaborators.some(
          (collaboratorId) => collaboratorId.equals(userId)
        );
        const isDocumentOwner = document.owner._id.equals(userId);
        const isDocumentCollaborator = document.collaborators.some(collaborator => collaborator._id.equals(userId))
        appAssert(
          isProjectOwner || isProjectCollaborator || isDocumentOwner || isDocumentCollaborator ,
          FORBIDDEN,
          "Forbidden: You don't have access to this document"
        );

        // Step 4: Return the response
        res.status(OK).json({
            document
        })
    }
)