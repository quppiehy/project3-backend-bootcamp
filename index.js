const express = require("express");
const http = require("http");
const cors = require("cors");
// const { Server } = require("socket.io");
// const SocketManager = require("./Components/socket");
const { Server } = require("socket.io");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");
const {
  product,
  user,
  order,
  category,
  seller_discount,
  photo,
  chat,
  address,
  chat_message,
} = db;

// import middlewares
// const jwtCheck = require("./middlewares/jwtCheck");

// importing Controllers
const ProductsController = require("./controllers/productsController");
const UsersController = require("./controllers/usersController.js");
const OrdersController = require("./controllers/ordersController.js");
const ChatController = require("./controllers/chatController.js");

// initializing Controllers -> note the lowercase for the first word
const productsController = new ProductsController(
  product,
  category,
  seller_discount,
  user,
  photo
);
const usersController = new UsersController(user, address);
const ordersController = new OrdersController(order, user);
const chatController = new ChatController(
  chat,
  chat_message,
  product,
  user,
  photo
);

// importing Routers
const ProductsRouter = require("./routers/productsRouter");
const UsersRouter = require("./routers/usersRouter");
const OrdersRouter = require("./routers/ordersRouter");
const ChatRouter = require("./routers/chatRouter");

// declare port to listen to and initialise Express
const PORT = process.env.PORT;
const app = express();

//create server for chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: process.env.REACT_APP_CORS_OPTIONS,
  methods: ["GET", "POST", "PUT"],
});

// initialize Routers
const productsRouter = new ProductsRouter(productsController); // pass in jwtCheck as 2nd parameter if needed
const usersRouter = new UsersRouter(usersController);
const ordersRouter = new OrdersRouter(ordersController);
const chatRouter = new ChatRouter(io, chatController);

// Enable CORS access to this server
const corsOptions = {
  origin: process.env.REACT_APP_CORS_OPTIONS,
};

app.use(cors(corsOptions));
// Enable reading JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable and use router
app.use("/products", productsRouter.routes());
app.use("/users", usersRouter.routes());
app.use("/orders", ordersRouter.routes());

//set up chatRouter instance to handle socket listeners
chatRouter.setupSocketListeners();

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
server.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
