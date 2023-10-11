import express from "express";
import morgan from "morgan";
import mysql from "mysql2";
import myConnection from "express-myconnection";

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


export default app;