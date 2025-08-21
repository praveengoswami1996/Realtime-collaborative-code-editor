import { Router } from "express";
import { loginHandler, registerHandler, logoutHandler } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";

const authRoutes = Router();

// Prefix: /api/auth
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", authenticate, logoutHandler);

export default authRoutes;