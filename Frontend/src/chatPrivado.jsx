import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

const serverPrivado = io("/");

function ChatPrivado({ usuarioDestino, miId, volverAListaUsuarios }) {
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje que se va a enviar
  const [mensajesPrivados, setMensajesPrivados] = useState([]); // Estado para almacenar mensajes privados

  const enviarMensajePrivado = () => {

    const mensajeEncriptado = CryptoJS.AES.encrypt(mensaje, "palabraClave").toString();
    const mensajePrivado = {
      datos: mensajeEncriptado,
      from: miId,
      nombreUsuario: miId,
      destinatario: usuarioDestino,
    };

    serverPrivado.emit("chatPrivado", mensajePrivado);
    console.log(mensajePrivado);
    setMensaje("");
  };

  // Enviando y recibiendo mensajes privados
  useEffect(() => {
  const atendedorDeMensajesPrivados = (mensajePrivado) => {
    console.log("Mensaje privado recibido:", mensajePrivado);

    const mensajeDesencriptado = CryptoJS.AES.decrypt(
      mensajePrivado.datos,
      "palabraClave"
    ).toString(CryptoJS.enc.Utf8);

    // Actualizar el estado de mensajesPrivados
    setMensajesPrivados((prevMensajes) => [
      ...prevMensajes,
      {
        from: mensajePrivado.from,
        nombreUsuario: mensajePrivado.nombreUsuario,
        datos: mensajeDesencriptado,
      },
    ]);
  };

  serverPrivado.on("chatPrivado", atendedorDeMensajesPrivados);

  return () => {
    serverPrivado.off("chatPrivado", atendedorDeMensajesPrivados);
  };
}, []);

  

  return (
    <div className="chatPrivado">
      <div className="contenedorMensajes">
        <div className="mensajes">
          <ul>
            {mensajesPrivados.map((mensaje, index) => (
                <li className="mensaje" key={index}>
                  <div className="textoMensaje">
                    <p className="texto">{mensaje.datos}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="contenedorFormulario">
        <form onSubmit={(e) => { e.preventDefault(); enviarMensajePrivado(); }}>
          <p>
            <strong>Enviar mensaje a {usuarioDestino}</strong>
          </p>
          <input
            type="text"
            className="inputMensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="botonEnviar" onClick={enviarMensajePrivado}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPrivado;
