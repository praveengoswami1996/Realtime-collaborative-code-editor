import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/env";
import { UNAUTHORIZED } from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extracting accessToken from Authorization header
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    appAssert(token, UNAUTHORIZED, "Not authorized. Access token missing");

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };

    appAssert(decoded.userId, UNAUTHORIZED, "Invalid access token");

    // Optionally fetch user from database for additional verification
    const user = await UserModel.findById(decoded.userId);
    appAssert(user, UNAUTHORIZED, "User not found");

    // Attach user info to request object
    req.userId = decoded.userId;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(UNAUTHORIZED).json({
        message: "Invalid access token",
        error: error.message,
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(UNAUTHORIZED).json({
        message: "Access token has expired",
        error: error.message,
      });
    }

    // Pass other errors to global error handler
    next(error);
  }
};

// Optional: Create a middleware that doesn't require authentication but adds user if token exists
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // First, try to get token from cookie
    let token = req.cookies?.accessToken;

    // If no cookie token, try Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };

      if (decoded.userId) {
        const user = await UserModel.findById(decoded.userId);
        if (user) {
          req.userId = decoded.userId;
          req.user = user;
        }
      }
    }

    next();
  } catch (error) {
    // Ignore authentication errors in optional auth
    next();
  }
};
