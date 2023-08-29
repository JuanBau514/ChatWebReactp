import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Registro from "./Registro";

const server = io("/"); // conectamos con el servidor

function app() {

  const [mensaje, setMensaje] = useState(""); // creamos un estado para guardar un mensaje
  const [mensajes, setMensajes] = useState([]); // creamos un estado para guardar los mensajes que se reciben
  const [nombreUsuario, setNombreUsuario] = useState(""); // creamos un estado para guardar el nombre de usuario
  const [miId, setMiId] = useState(""); // creamos un estado para guardar el id del cliente

  const envioForm = (e) => { // esta funcion se ejecuta cuando se envia el formulario
    e.preventDefault(); // evitamos que se recargue la pagina
    const MensajeNuevo = {
      datos: mensaje,
      form: "Yo",
      nombreUsuario: nombreUsuario
    } 
    setMensajes([...mensajes, MensajeNuevo ]); // guardamos el mensaje en el estado mensajes
    server.emit("mensaje", mensaje); // enviamos el evento "mensaje" al servidor con el mensaje que se envio
  } 

  const registro = (nombreUsuario) => { // esta funcion se ejecuta cuando se envia el formulario
    setNombreUsuario(nombreUsuario); // guardamos el nombre de usuario en el estado nombreUsuario
    const abreviatura = nombreUsuario; // Usamos las primeras dos letras como abreviatura
    setMiId(abreviatura); 
    
    server.emit("registro", abreviatura); // enviamos el evento "registro" al servidor con la abreviatura

    setMensajes([
      ...mensajes,
      { form: "Sistema", datos: `Bienvenid@ ${nombreUsuario}` },
    ]); // guardamos el mensaje de bienvenida en el estado mensajes

  }

  useEffect(() => {

    // Manejador de mensajes recibidos
    const atendedorDeMensajes = (mensajeRecibido) => {
      setMensajes([...mensajes, mensajeRecibido]);
    };

    const atendedorDeRegistro = (usuarioRecibido) => {
       setMensajes([
        ...mensajes,
            { form: usuarioRecibido.form, datos: usuarioRecibido.nombreUsuario }
       ]);
    };

    server.on("mensaje", atendedorDeMensajes);
    server.on("registro", atendedorDeRegistro);

    return () => {
      server.off("mensaje", atendedorDeMensajes);
      server.off("registro", atendedorDeRegistro);
    };
  }, [mensajes]);



    return (
        <div>
            {nombreUsuario === "" ? (
                <Registro registro={registro} />
            ) : (

                <div>
                    <h1>Bienvenido {nombreUsuario}</h1>
                    <form onSubmit={envioForm}>
                        <input
                            type="text"
                            placeholder="Ingrese su mensaje"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                        <button type="submit">Enviar</button>
                    </form>
                    <ul>

                        {mensajes.map((mensaje, index) => (
                            <li key={index}>
                                  {mensaje.nombreUsuario} ({mensaje.form})  : {mensaje.datos}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default app