const path = require('path');
const express = require('express')
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', socket => {
    console.log('New connection');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required');
        }

        console.log('join', params);
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('admin', 'welcome to our corner'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`));
            
        callback();
    });

    socket.on('createMessage', (data, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(data.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));
        }
        callback('data from server');
        
        });

    socket.on('createLocationMessage', coords => {
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.long));
            
        }
    });
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
console.log('on disconnect', user);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room.`));
        }
    })
});

app.use(express.static(publicPath))

server.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});



console.log(__dirname + '/../public');
console.log(publicPath);
