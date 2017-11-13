var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function(email) {
    var formattedTime = moment(email.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${email.from} ${formattedTime}:${email.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My location</a>');
    
    li.text(`${message.from} ${formattedTime}:`);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
    socket.emit('createMessage', {
        from: 'Frank',
        text: jQuery('[name=message]').val()
    }, (data) => {
        console.log(`Acknowledgement from server with data "${data}"`);
        jQuery('[name=message]').val('');
    });
    
    e.preventDefault();
})

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    console.log('---- clicked ---');

    if(!navigator.geolocation){
        return alert('Geo not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition( position => {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat : position.coords.latitude,
            long: position.coords.longitude
        });
    }, () =>{
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location.')
    })
});