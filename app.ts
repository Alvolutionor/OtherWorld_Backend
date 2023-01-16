require('dotenv').config();
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import Server_socket from "./socket/socketInit"
const morgan = require('morgan');
const xss = require('xss-clean');


const app = express();
// const Router = require('./routes');
import {connectDB} from './db/connect_mongodb'

const port = process.env.APP_PORT;

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
    const server_socket = new Server_socket(app)
  } catch (error) {
    
    console.log(error);
  }
};

start();