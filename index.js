import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http"; // ✅ REQUIRED
import cors from "cors";
import cookieParser from "cookie-parser";
import requestIp from "request-ip";
import * as useragent from "express-useragent";

import connectDB from "./src/Config/db.js";


import router from "./src/routes/User.routes.js";
import coustrouter from "./src/routes/Coustmer.routes.js";
import monthrouter from "./src/routes/Monthly.routes.js";
import Productrouter from "./src/routes/Product.routes.js";
import routerinvoice from "./src/routes/Invoice.routes.js";
import visitorroutes from "./src/routes/Visitor.routes.js";
import routermessage from "./src/routes/Messges.routes.js";
import { setupSocket } from "./Scoket.js";
// import { setupSocket } from "./Scoket.js";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestIp.mw());
app.use(useragent.express());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// DB
connectDB();

// routes
app.use("/api/v1/user", router);
app.use("/api/v1/coust", coustrouter);
app.use("/api/v1", monthrouter);
app.use("/api/v1", Productrouter);
app.use("/api/v1", routerinvoice);
app.use("/api/v1", visitorroutes);
app.use("/api/v1", routermessage);

// HTTP SERVER ✅
// const server = http.createServer(app);

// SOCKET.IO ✅
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

const server = http.createServer(app);

// ✅ SOCKET SETUP
const io = setupSocket(server)
// optional: socket access in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// socket setup

// listen
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
