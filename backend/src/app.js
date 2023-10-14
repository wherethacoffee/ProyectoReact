import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mysql from "mysql2";
import myConnection from "express-myconnection";

//Import de la conexion a la bdd
import { connecOptions } from '../db/connection.js'

//Import de las rutas del backend
import ticketsRoutes from './routes/tickets.routes.js'
import adminRoutes from './routes/admins.routes.js'
import alumnoRoutes from './routes/alumnos.routes.js'
import repRoutes from './routes/reps.routes.js'


const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(myConnection(mysql, connecOptions, 'single'));

app.use('/turno', ticketsRoutes);
app.use('/admin', adminRoutes); 
app.use('/alumno', alumnoRoutes); 
app.use('/rep', repRoutes); 

export default app;