require('dotenv').config();
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import http from "http";

const morgan = require('morgan');
const xss = require('xss-clean');


const app = express();
const server = http.createServer(app);
// const Router = require('./routes');
import {connectDB} from './db/connect_mongodb'

const port = process.env.APP_PORT;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// extra security package

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(morgan('dev'));

// app.use('/route', Router);

connectDB();
const User = require ("./model/User")
const start = async () => {
  try {

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    
    server.listen(37788)
    io.on("connection", (socket:any)=>{socket.emit("hello","asas"); console.log("aas")})
  } catch (error) {
    
    console.log(error);
  }
};

start();