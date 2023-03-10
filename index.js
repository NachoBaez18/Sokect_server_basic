const express = require('express');
const app = express();
require('dotenv').config();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const path = require('path');
const { Socket } = require('socket.io');


const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
if(err) throw new Error(err);

console.log('Servidor corriendo en puerto', process.env.PORT);
});

