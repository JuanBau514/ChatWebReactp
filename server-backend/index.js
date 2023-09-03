import express  from "express";
import http from "http";
import {Server as SocketServer} from "socket.io"; // importamos el servidor de socket.io

const app = express(); // creamos la aplicacion
const server = http.createServer(app);
const io = new SocketServer(server); // creamos el servidor 

const usuariosConectados = {}; // Objeto para almacenar los nombres de usuario asociados con los IDs de socket

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado", socket.id);

    // Manejador de eventos "registro"
    socket.on("registro", (nombreUsuario) => {
        console.log(nombreUsuario);

        // Almacena el nombre de usuario en el objeto usuariosConectados
        usuariosConectados[socket.id] = nombreUsuario;

        // Emitir mensaje de bienvenida al cliente registrado
        socket.emit("mensaje", {
            datos: `Bienvenid@ ${nombreUsuario}`,
            form: "Sistema"
        });

        // Emitir evento "registro" a todos los clientes conectados
        io.emit("registro", {
            nombreUsuario,
            nUsuario: `${nombreUsuario} se ha unido al chat`,
            form: "Sistema"
        });

        // Emitir la lista actualizada de usuarios conectados a todos los clientes
        io.emit("usuariosConectados", Object.values(usuariosConectados));
    });

    // Manejador de usuarios desconectados
    socket.on("disconnect", () => {
        delete usuariosConectados[socket.id]; // Corregir el nombre del objeto aquí
        console.log("Un cliente se ha desconectado", socket.id);

        // Emitir la lista actualizada de usuarios conectados a todos los clientes
        io.emit("usuariosConectados", Object.values(usuariosConectados));
    });

    socket.on("mensaje", (datos) => {
        console.log(datos);

        // Obtener el nombre de usuario asociado con el ID del socket
        const nombreUsuario = usuariosConectados[socket.id] || "Usuario desconocido";
        
        // Si el mensaje fue enviado por un cliente distinto al que lo recibe
        if (datos.form !== socket.id) {
            // Emitir el mensaje con el nombre de usuario y abreviatura
            io.emit("mensaje", {
                datos,
                form: socket.id,
                nombreUsuario
            });
        }
    });

    // Manejador de eventos "chatPrivado"
    socket.on("chatPrivado", (mensajePrivado) => {
        const {datos, form, nombreUsuario, destinatario} = mensajePrivado;
        
        // Emitir el mensaje privado al destinatario
        if (usuariosConectados[destinatario]) {
            socket.to(destinatario).emit("chatPrivado", {
                datos,
                form,
                nombreUsuario,
                destinatario
            });
        }
    });
    
  
    io.emit("usuariosConectados", Object.values(usuariosConectados));
});


server.listen(6900) // mi servidor esta escuchando en el puerto 6900
console.log ("El servidor esta corriendo en el puerto", 6900)