import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";

const userRoutes = Router();

// Protected route example - Get current user profile
const getCurrentUser = catchErrors(async (req: Request, res: Response) => {
  // req.user is available because of authenticate middleware
  const user = req.user;
  
  return res.status(OK).json({
    message: "User profile retrieved successfully",
    user: user.omitPassword()
  });
});

// Protected route example - Update user profile
const updateUserProfile = catchErrors(async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name } = req.body;
  
  // Update user logic here
  // const updatedUser = await UserModel.findByIdAndUpdate(userId, { name }, { new: true });
  
  return res.status(OK).json({
    message: "Profile updated successfully",
    // user: updatedUser.omitPassword()
  });
});

// Prefix: /api/user
userRoutes.get("/profile", authenticate, getCurrentUser);
userRoutes.put("/profile", authenticate, updateUserProfile);

export default userRoutes;
