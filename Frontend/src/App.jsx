
import io from "socket.io-client";
import { useState, useEffect } from "react";

const server = io("/"); // conectamos con el servidor

function app() {

  const [mensaje, setMensaje] = useState(""); // creamos un estado para guardar un mensaje
  const [mensajes, setMensajes] = useState([]); // creamos un estado para guardar los mensajes que se reciben

  const envioForm = (e) => { // esta funcion se ejecuta cuando se envia el formulario
    e.preventDefault(); // evitamos que se recargue la pagina

    const MensajeNuevo = {
      datos: mensaje,
      form: "Yo"
    } 

    setMensajes([...mensajes, MensajeNuevo]); // guardamos el mensaje en el estado mensajes
    server.emit("mensaje", mensaje); // enviamos el evento "mensaje" al servidor con el mensaje que se envio
  } 

  useEffect(() => { 

    server.on("mensaje", AtendedorDeMensajes); // cuando se recibe un evento "mensaje" se ejecuta la funcion AtendedorDeMensajes

    return() =>{
      server.off('mensaje', AtendedorDeMensajes); // cuando se desmonta el componente desconectamos del servidor
    } 

  }, []); 


const AtendedorDeMensajes = (mensaje) => 
    setMensajes([...mensajes, mensaje]); // guardamos el mensaje en el estado mensajes    

    return (
        <div>

          <form onSubmit={envioForm}>

            <input type="text" placeholder="Escribe tu mensaje ... "
                onChange={(e) => setMensaje(e.target.value) } 
            />
            <button type="submit">
              Enviar
            </button>

          </form>
          <ul>
              {
                mensajes.map((mensajes, index) => (
                  <li key={index}>
                    {mensajes.form}:{mensajes.datos}
                  </li>
                ))
              }

          </ul>
        </div>
    )
}

export default app