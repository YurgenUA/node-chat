const path = require('path');
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', socket => {
    console.log('New connection');

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hello from server',
        createdAt: 123
    });

    socket.on('createMessage', data => {
        console.log('createMessage event received on server', data);
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    })
});

app.use(express.static(publicPath))

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});



console.log(__dirname + '/../public');
console.log(publicPath);
