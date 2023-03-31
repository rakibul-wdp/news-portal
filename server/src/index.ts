import express from "express";
import mongoose from "mongoose";
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

const port = 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});