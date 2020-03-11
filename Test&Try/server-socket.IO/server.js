var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

// socket.broadcast.emit('numbers', {
//             numbers: numbers
//         });

        // for (i=0;i<=5;i++)
        // {
        //     MyFunc();
        // }

var i = Number();

// var sequenceNumberByClient = new Map();

io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);
    socket.broadcast.emit("user", `Клієнт приєднався`)
    socket.broadcast.emit("number", i)
    // socket.broadcast.emit(console.info(i))


    // socket.on('subscribeToTimer', (interval) => {
    //     console.log('client is subscribing to timer with interval ', interval);
    //     setInterval(() => {
    //         socket.emit('timer', new Date());
    //     }, interval);
    // });
    

    // socket.broadcast.emit("user2", i)

    // sequenceNumberByClient.set(socket, 1);
    // sequenceNumberByClient.set(i);

    // socket.broadcast.emit("user2", i)
    // howMany.set(socket)

    // socket.broadcast.emit("user",
    // setInterval(() => {
    //     do {number = number + 1}
    //     while ( number < 1000 )
    // }, 1000))

    // socket.broadcast.emit("userrrr", number)
    // socket.broadcast.emit("userrrr", number)

    // socket.on("broadcast", () => {
    //     socket.broadcast.emit("userrrr", number)
    // })
    // var number = 0;

    // setInterval(() => {
    //     do {number = number+1}
    //     while (
    //         number < 10
    //     )
    //     socket.broadcast.emit("user2", number)
    // }, 3000);
    // function number2() {
    //     var number = Number();
    //     setInterval(() => {
    //         while ( number < 1000 )
    //     }, 1000);
    // }


    // var i = 0;
    // var intervalId = setInterval(function(){
    //     console.log(i);
    //     i++;
    // }, 1000);

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});


setInterval(() => {
    do {
        i += 1;
        console.log(i);
    } while (i < 1);
}, 3000);


// setInterval(() => {
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//         client.emit("sequenceNumber", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber + 1);
//     }
// }, 3000);


server.listen(port);

// function x() {
//     do {
//         i += 1;
//         console.log(i);
//     } while (i < 1);
// }

// setInterval(x, 3000);

// setInterval(() => {
//     do {
//         i += 1;
//         console.log(i);
//     } while (i < 1);
// }, 3000);


// setInterval(() => {
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//         client.emit("sequenceNumber", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber + 1);
//     }
// }, 3000);



// clearInterval(x);

// var i = 0;
// while(i !== 1000){
//     console.log(i);
//     i++;
// }



// var timoutId = setTimeout(function(){ 
//         console.log("wait for me!");
//     }, 1000);






// setInterval(() => {
//     let sum = 0;
//     while (true) {
//         let value = 100;
//         if (!value) break; // (*)
//         sum += value;
//     }
// }, 3000);

// io.on("connection", (socket) => {
//     console.info(`Клієнт приєднався [id=${socket.id}]`);
    
//     socket.broadcast.emit('numbers', {
//         numbers: numbers
//     });

//     socket.on("disconnect", () => {
//         console.info(`Клієнт від'єднався [id=${socket.id}]`);
//     });
// })

// setInterval(() => {
//     for (const[number] of numbers.entries()){
//         number
//     }
// }, 1000);

// setInterval(() => {
//     while (numbers < 10){
//         numbers++
//     }
// }, 200);



// socket.on('add user', (username) => {
//     if (addedUser) return;
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//         numUsers: numUsers
//     });
//     socket.broadcast.emit('user joined', {
//         username: socket.username,
//         numUsers: numUsers
//     });
//     console.log('Створено Нік');
// });


// let sequenceNumberByClient = 5;
// io.on("connection", (socket) => {
//     console.info(`Клієнт приєднався [id=${socket.id}]`);
//     sequenceNumberByClient(socket);

//     socket.on("disconnect", () => {
//         sequenceNumberByClient.delete(socket);
//         console.info(`Клієнт від'єднався [id=${socket.id}]`);
//     });
// });

// server.listen(port);


// var io_emitter = require('socket.io-emitter')(server);
// var io = require('socket.io-emitter')("server")

// let sequenceNumberByClient = new Map();
// for (sequenceNumberByClient = 0; sequenceNumberByClient < cars.length; i++) {
//     text += cars[i] + "<br>";
// }
// setInterval(() => {
//     for (let sequenceNumberByClient = 0; sequenceNumberByClient < 5; sequenceNumberByClient++){
//         client.emit("sequenceNumber", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber);
//     }
// }, 3000)


// var clients = 0;
// io.on("connection", (socket) => {
//     clients++;
//     socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//     socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//     socket.on('disconnect', function () {
//         clients--;
//         socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//     });
// });

    // clients++;
    // // console.info(`Клієнт приєднався [id=${socket.id}]`);
    // io.sockets.emit('broadcast', { description: clients + ' clients connected!'});
    // // socket.on('say to someone', function(id, msg){
    // //     socket.broadcast.to(id).emit('my message', msg);
    // // });
    // // sequenceNumberByClient.set(socket);

    // socket.on("disconnect", () => {
    //     clients--;
    //     io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    //     // sequenceNumberByClient.delete(socket);
    //     // console.info(`Клієнт від'єднався [id=${socket.id}]`);
    // });



// setInterval(() => {
//     io_emitter.emit('time', new Date);
// }, 30);

// var io = require('socket.io-emitter')("time");

// setInterval(function(){
//     io.emit('time', new Date);
// }, 5000);

// setInterval(() => {
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries(sequenceNumberByClient)) {
//         client.emit("sequenceNumber", sequenceNumber);
//         sequenceNumberByClient.set(client, sequenceNumber);
//     }
// }, 3000);