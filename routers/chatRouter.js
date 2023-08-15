class ChatRouter {
  constructor(io, controller) {
    this.io = io;
    this.controller = controller;
    this.setupSocketListeners();
    this.activeChatMessages = [];
    // this.jwtCheck = jwtCheck;
  }

  setupSocketListeners() {
    // listening for events
    this.io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      // to join a room
      socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      //emit message to single room
      socket.on("send_message", async (data) => {
        console.log(data);
        try {
          // const newChat =
          // await this.chatController.sendMessage(data);
          socket.to(data.room).emit("receive_message", data);
          this.activeChatMessages.push(data);
        } catch (err) {
          console.log(`Error sending chat message to DB: `, err);
        }
      });

      socket.on("disconnect", async () => {
        console.log("User Disconnected", socket.id);
        // await this.chatController.archiveChat(data);
      });
    });
  }
}

module.exports = ChatRouter;
