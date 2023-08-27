import express  from "express";
import http from "http";
import {Server as SocketServer} from "socket.io"; // importamos el servidor de socket.io

const app = express(); // creamos la aplicacion
const server = http.createServer(app);
const io = new SocketServer(server); // creamos el servidor 

io.on("connection", (socket) => {

    console.log("Un cliente se ha conectado", socket.id);

    socket.on( 'mensaje' , (datos) => { 
        console.log (datos)
        socket.broadcast.emit('mensaje', { // enviamos (emitimos) el evento "mensaje" a todos los clientes conectados menos al que lo envio
            datos,
            form: socket.id.slice(4)
        }) 
    } )

})

server.listen(6900) // mi servidor esta escuchando en el puerto 6900
console.log ("El servidor esta corriendo en el puerto", 6900)