var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'jan@example.com',
        text: 'Hey from client'
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(email) {
    console.log('newMessage event', email);
});