const path = require('path');
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', socket => {
    console.log('New connection');

    socket.emit('newMessage', generateMessage('admin', 'welcome to our corner'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined our corner'));
    
    socket.on('createMessage', data => {
        console.log('createMessage event received on server', data);
        io.emit('newMessage', generateMessage(data.from, data.message));
        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     message: data.message,
        //     createdAt : new Date().getTime()
        // });
        
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
