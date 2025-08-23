import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { projectSchema } from "../validations/project.validation";
import { createProject } from "../services/project.service";
import { CREATED, UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";

export const createProjectHandler = catchErrors(
    async function (req: Request, res: Response) {
        // Step 1: Validate the request
        const request = projectSchema.parse(req.body);

        // Checking if the userId exists for TypeScript Safety
        const userId = req.userId;
        appAssert(userId, UNAUTHORIZED, "You are not authorized to perform this operation")

        // Step 2: Call the Service to create the project
        const { project } = await createProject(request, userId);
        
        // Step 3: Return the response
        return res.status(CREATED).json({
            message: "Hurray! Project created successfully",
            project
        })
    }
)