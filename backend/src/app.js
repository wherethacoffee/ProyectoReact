const express = requiere('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const ticketRoutes = require('./routes/ticketRoutes');

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'ticket'
}, 'single')
);

app.use(express.urlencoded({extended: false}));

// starting the server
app.listen(app.get('port'), () => {
    console.log('listening on port 3000');
});