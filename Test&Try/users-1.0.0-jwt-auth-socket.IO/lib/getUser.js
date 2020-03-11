module.exports = function getUser (socket, token) {
    if (!userSessions[token]){
        return socket.emit('user.get.error', {
            message: 'Цей користувач не авторизований'
        });
    }
    return socket.emit('user.get.success', {
        profile: userSessions[token],
        token: token
    });
};