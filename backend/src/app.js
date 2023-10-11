import express from "express";
import morgan from "morgan";
import mysql from "mysql2";
import myConnection from "express-myconnection";

import ticketsRoutes from './routes/tickets.routes.js'

const app = express();

app.use(morgan('dev'));

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'desarrolloWeb'
}, 'single')
);

app.use(ticketsRoutes);


export default app;