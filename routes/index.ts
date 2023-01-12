const express = require('express');
import {userRouter} from './user' ;
const Router = express.Router();

Router.use('/users', userRouter);

module.exports = Router;
