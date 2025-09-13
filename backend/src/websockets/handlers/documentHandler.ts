import { Server as SocketIOServer, Socket } from "socket.io";
import { fetchUserById } from "../../services/websocket.service";

// In-memory data structure to track online users for each document.
// Using a Map for efficient lookups and a Set for unique user IDs.
const onlineUsers = new Map<string, Set<string>>();
// Map to track the current socket belongs to which user 
const socketToUser = new Map<string, string>();
// Map to track the current socket belongs to which documentId (room)
const socketToDocument = new Map<string, string>();

/**
 * Handles all WebSocket events related to document collaboration.
 * @param io The main Socket.IO server instance.
 * @param socket The individual client socket connection.
 */

function handleDocumentEvents(socket: Socket, io: SocketIOServer) {
  // Listen for the 'join-document' event from the client
  socket.on("join-document", async (documentId: string, userId: string) => {
    try {
      // Step 1: Fetch the joining user from the database
      const user = await fetchUserById(userId);
      if (!user) {
        socket.emit("document-error", {
          code: "NOT_FOUND",
          message: "The requested user could not be found",
        });
        return;
      }

      // Step 2: Update the in-memory onlineUsers state with the new user's ID
      if (!onlineUsers.has(documentId)) {
        onlineUsers.set(documentId, new Set());
      }
      const onlineUsersSet = onlineUsers.get(documentId);
      onlineUsersSet?.add(userId);
      socketToUser.set(socket.id, userId);
      socketToDocument.set(socket.id, documentId);

      socket.join(documentId);
      console.log(`👍 User ${socket.id} joined room: ${documentId}`);

      // Step 3: Get the array of all online user IDs for this document
      const onlineUserIds = Array.from(onlineUsersSet ?? new Set<string>());

      // Step 4: Send the complete list of current collaborators to the joining user.
      socket.emit("collaborators-list", onlineUserIds);

      // Step 5: Broadcast to everyone else in the room that a new user has joined.
      socket.to(documentId).emit("user-joined", { user });
    } catch (error) {
      // This catch block handles errors thrown by the getUserById service.
      console.error("Error in 'join-document' handler:", error);
      socket.emit("document-error", {
        code: "INTERNAL_SERVER_ERROR",
        message:
          "An internal server error occured while processing your request",
      });
    }
  });

  // Event listener for a client disconnecting.
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Find the document ID and user ID associated with the disconnected socket.
    const documentId = socketToDocument.get(socket.id);
    const userId = socketToUser.get(socket.id);

    if(documentId && userId) {
      const currentOnlineUsers = onlineUsers.get(documentId);
      if(currentOnlineUsers) {
        currentOnlineUsers.delete(userId);
        socket.to(documentId).emit("user-left", { userId });
      }
    }

    // Clean up both the in-memory maps
    socketToUser.delete(socket.id);
    socketToDocument.delete(socket.id);

  });
}

export default handleDocumentEvents;
