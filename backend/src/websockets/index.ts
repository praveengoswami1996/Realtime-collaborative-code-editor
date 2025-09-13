import { Server as SocketIOServer } from "socket.io";
import handleDocumentEvents from "./handlers/documentHandler";

function setupWebSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket) => {
    console.log(`A socket connected: ${socket.id}`);
    
    // Handle socket events related to document
    handleDocumentEvents(socket, io);

  });
}

export default setupWebSocketHandlers;

/*
    Important Points:
    1. io.on("connection", (socket) => { ... });: This event fires every time a new client successfully connects to your Socket.IO server.
    2. io.emit("eventName", data);: Sends an event to all connected clients (sockets) / Broadcasting to all clients.
    3. io.to(room).emit(...): Broadcasting to everyone in a specific room.

    4. socket: Represents the individual client connection. You can use this socket object to send/receive messages to/from that specific client.
    5. socket.on("eventName", (data) => { ... });: Listens for custom events sent from a client.
    6. socket.emit("eventName", data);: Sends an event to the specific client represented by socket.
    7. socket.on("disconnect", ...): Fires when a client disconnects.


    8. socket.join(room) : The socket.join() method allows a client/socket to join a specific "room" on the server. A room is a logical grouping of sockets (clients). 

    9. `socket.to(room)`: sends to all clients in the room EXCEPT the sender.
*/