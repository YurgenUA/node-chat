var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(email) {
    console.log('newMessage event', email);
    var li = jQuery('<li></li>');
    li.text(`${email.from}:${email.text}`);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
    socket.emit('createMessage', {
        from: 'Frank',
        text: jQuery('[name=message]').val()
    }, (data) => {
        console.log(`Acknowledgement from server with data "${data}"`);
    });
    
    e.preventDefault();
})