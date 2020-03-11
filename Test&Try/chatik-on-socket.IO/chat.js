exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        // З'єднання
        socket.on('connect', function(){
            socket.emit('adduser', prompt("Як тебе величати?"));
        });

        // Оновлення чату
        socket.on('updatechat', function (username, data) {
            $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
        });

        // Оновлення кімнати
        socket.on('updaterooms', function(rooms, current_room) {
            $('#rooms').empty();
            $.each(rooms, function(key, value) {
                if(value == current_room){
                    $('#rooms').append('<div>' + value + '</div>');
                }
                else {
                    $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
                }
            });
        });

        function switchRoom(room){
            socket.emit('switchRoom', room);
        }

        // Оновлення сторінки
        $(function(){
            $('#datasend').click( function() {
                var message = $('#data').val();
                $('#data').val('');
                socket.emit('sendchat', message);
            });

            $('#data').keypress(function(e) {
                if(e.which == 13) {
                    $(this).blur();
                    $('#datasend').focus().click();
                }
            });
        });
    });
}