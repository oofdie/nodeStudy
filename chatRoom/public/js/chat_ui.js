const socket = io.connect();

const divEscapeContentElement = (message) => {
    return $('<div></div>').text(message);
}

const divSystemContentElement = (message) => {
    return $('<div></div>').html('<i>' + message + '</i>');
}

const processUserInput = (chatApp, socket) => {
    const message = $('#send-message').val();
    let systemMessage;
    if (message.charAt(0) === '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#message').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#message').append(divEscapeContentElement(message));
        $('#message').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

$(document).ready(() => {
    const chatApp = new Chat(socket);

    socket.on('nameResult', (result) => {
        let message;
        if (result.success) {
            message = 'You are now know as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#message').append(divSystemContentElement(message));
    })

    socket.on('joinResult', (result) => {
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('Room Changed'));
    })

    socket.on('message', (result) => {
        var newElement = divEscapeContentElement(result.text);
        $('#message').append(newElement);
    })

    socket.on('rooms', (rooms) => {
        $('#room-list').empty();
        rooms.forEach(room => {
            $('#room-list').append(divEscapeContentElement(room));
        })

        $('#room-list div').click(function(){
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        })
    })

    setInterval(() => {
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    $('#send-form').submit(() => {
        processUserInput(chatApp, socket);
        return false;
    })
})
