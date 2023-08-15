const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");
const { product, user, order, category, seller_discount, photo } = db;

// import middlewares
// const jwtCheck = require("./middlewares/jwtCheck");

// importing Controllers
const ProductsController = require("./controllers/productsController");
const UsersController = require("./controllers/usersController.js");
const OrdersController = require("./controllers/ordersController.js");

// initializing Controllers -> note the lowercase for the first word
const productsController = new ProductsController(
  product,
  category,
  seller_discount,
  user,
  photo
);
const usersController = new UsersController(user);
const ordersController = new OrdersController(order, user);

// importing Routers
const ProductsRouter = require("./routers/productsRouter");
const UsersRouter = require("./routers/usersRouter");
const OrdersRouter = require("./routers/ordersRouter");

// initialize Routers
const productsRouter = new ProductsRouter(productsController); // pass in jwtCheck as 2nd parameter if needed
const usersRouter = new UsersRouter(usersController);
const ordersRouter = new OrdersRouter(ordersController);

// declare port to listen to and initialise Express
const PORT = process.env.PORT;
const app = express();

//create server for chat
const server = http.createServer(app);

// Enable CORS access to this server
const corsOptions = {
  origin: process.env.REACT_APP_CORS_OPTIONS,
};

// connect io server for chat
const io = new Server(server, {
  cors: process.env.REACT_APP_CORS_OPTIONS,
  methods: ["GET", "POST","PUT"],
});

// listening for events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // to join a room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //emit message to single room
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(cors(corsOptions));
// Enable reading JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable and use router
app.use("/products", productsRouter.routes());
app.use("/users", usersRouter.routes());
app.use("/orders", ordersRouter.routes());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
server.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
