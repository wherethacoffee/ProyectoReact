import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mysql from "mysql2";
import myConnection from "express-myconnection";

import ticketsRoutes from './routes/tickets.routes.js'
import { connecOptions } from '../db/connection.js'

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(myConnection(mysql, connecOptions, 'single'));

app.use(ticketsRoutes);


export default app;