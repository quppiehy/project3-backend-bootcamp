class ChatRouter {
  constructor(io, controller) {
    this.io = io;
    this.controller = controller;

    // this.jwtCheck = jwtCheck;
  }

  setupSocketListeners() {
    // listening for events
    this.io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      // to create / retrieve a room on db
      socket.on("new_room", async (data) => {
        console.log("Socket On new_room called!");
        console.log(data);
        const room = await this.controller.createRoom(data);
        socket.emit("room_created", room);
      });

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
          await this.controller.sendMessage(data);
          socket.to(data.room).emit("receive_message", data);
        } catch (err) {
          console.log(`Error sending chat message to DB: `, err);
        }
      });

      //retrieve chatlist and send it back to frontend
      socket.on("retrieve_chatlist", async (id) => {
        console.log(id);
        try {
          const userChat = await this.controller.getUserChatList(id);
          socket.emit("user_chat_list", userChat);
        } catch (err) {
          console.log(`Error in retrieve chatlist: `, err);
        }
      });

      //retrieve messagelist and send it back to frontend
      socket.on("retrieve_messages", async (id) => {
        console.log(id);
        try {
          const messages = await this.controller.getMessages(id);
          socket.emit("chat_messages", messages);
        } catch (err) {
          console.log(`error in retrieve messages: `, err);
        }
      });

      socket.on("disconnect", async () => {
        console.log("User Disconnected", socket.id);
      });
    });
  }
}

module.exports = ChatRouter;
