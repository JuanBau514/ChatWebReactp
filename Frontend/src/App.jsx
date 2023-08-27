
import io from "socket.io-client";
import { useState } from "react";

const server = io("/");

function app() {

  const [mensajes, setMensajes] = useState([]); // creamos un estado para guardar los mensajes

  const envioForm = (e) => { // esta funcion se ejecuta cuando se envia el formulario
    e.preventDefault(); // evitamos que se recargue la pagina
    console.log(mensajes); // mostramos en consola el mensaje que se envio
  } 

    return (
        <div>

          <form onSubmit={envioForm}>

            <input type="text" placeholder="Escribe tu mensaje ... "
                onChange={(e) => setMensajes(e.target.value) } 
            />

            <button type="submit">
              Enviar
            </button>

          </form>
        </div>
    )
}

export default app