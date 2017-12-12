var socket = io();

function ScrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
       messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    })
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(user => {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function(email) {
    console.log('on newMessage', email);
    var formattedTime = moment(email.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: email.text,
        from: email.from,
        createdAt: formattedTime
    });
    console.log('on newMessage', html);
    jQuery('#messages').append(html);
    ScrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        createdAt: formattedTime,
        from: message.from,
        url: message.url
    });
    jQuery('#messages').append(html);
    ScrollToBottom();
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