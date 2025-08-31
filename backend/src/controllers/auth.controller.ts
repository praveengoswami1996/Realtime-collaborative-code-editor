import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";

export const registerHandler = catchErrors(
    async (req: Request, res: Response) => {
        // 1. Validate the request
        const request = registerSchema.parse(req.body);

        // 2. Call the service to process the request
        const { user } = await createAccount(request); 

        // 3. Return the response
        return res.status(CREATED).json({
            message: "Account created successfully",
            user,
        });
    }
);

export const loginHandler = catchErrors(
    async (req: Request, res: Response) => {
        // 1. Validate the request
        const request = loginSchema.parse(req.body);

        // 2. Call the service to process the request
        const {user, accessToken} = await loginUser(request);

        // 3. Set JWT token in HTTP-only cookie
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //     path: '/'
        // });

        // 4. Return the response
        return res.status(OK).json({
            message: "Login successful",
            user,
            accessToken // Sending accessToken in JSON response for NextAuth compatibility
        });
    } 
);

export const logoutHandler = catchErrors(
    async (req: Request, res: Response) => {
        // Clear the JWT cookie
        // res.clearCookie('accessToken', {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //     path: '/'
        // });

        return res.status(OK).json({
            message: "Logout successful"
        });
    }
);