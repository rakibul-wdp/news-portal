import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
const port = 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
mongoose
    .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB connected");
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map