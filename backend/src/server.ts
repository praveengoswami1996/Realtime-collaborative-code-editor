import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import { OK } from "./constants/http";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";
import projectRoutes from "./routes/project.route";
import { authenticate } from "./middlewares/authenticate";
import documentRoutes from "./routes/document.route";

// Initializing express server instance
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}));

// Create an HTTP server instance from your Express App
// Socket.IO needs a raw HTTP Server to attach to it, not just the regular express app instance.
const httpServer = http.createServer(app);

// Initialize Socket.IO Server
// We initialize the Socket.IO server, passing it the httpServer instance. This tells Socket.IO to listen for WebSocket connections on the same port that httpServer is listening on.
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: APP_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Server health check
app.get("/", (req, res) => {
  return res.status(OK).json({
    status: "healthy",
    message: "HTTP server is running",
  });
});

// Public Routes
app.use("/api/auth", authRoutes);

// Private Routes
app.use("/api/projects", authenticate, projectRoutes);
app.use("/api/documents", authenticate, documentRoutes);

// Global Error Handler
app.use(errorHandler);

// Socket.IO Server logic
// socket.on("connection", (socket) => { ... });: This event fires every time a new client successfully connects to your Socket.IO server.
// socket: Represents the individual client connection. You can use this socket object to send/receive messages to/from that specific client.
// socket.on("eventName", (data) => { ... });: Listens for custom events sent from a client.
// socket.emit("eventName", data);: Sends an event to the specific client represented by socket.
// io.emit("eventName", data);: Sends an event to all connected clients.
// socket.on("disconnect", ...): Fires when a client disconnects.
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage", (message: string) => {
    console.log(`Received message from ${socket.id}: ${message}`);

    socket.emit("receiveMessage", "Your Message was delivered");

    io.emit("receiveMessage", `User ${socket.id} says: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

// Call .listen() on the httpServer instance, not directly on the Express app. This ensures that both Express (for HTTP) and Socket.IO (for WebSockets) are listening on the same port.
httpServer.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
