var socket = io('http://localhost:9000', {query: 'auth_token=THE_JWT_TOKEN'});
  // Connection failed
  socket.on('error', function(err) {
    throw new Error(err);
  });
  // Connection succeeded
  socket.on('success', function(data) {
    console.log(data.message);
    console.log('user info: ' + data.user);
    console.log('logged in: ' + data.user.logged_in)
  })