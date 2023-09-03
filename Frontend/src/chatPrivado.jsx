import React, {useState} from "react";

function ChatPrivado({ usuarioDestino, enviarMensajePrivado }) {
  const [mensajePrivado, setMensajePrivado] = useState("");

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (mensajePrivado) {
      enviarMensajePrivado(mensajePrivado);
      setMensajePrivado("");
    }
  };

  return (
    <div className="chat-privado">
      <h3>Chat privado con {usuarioDestino}</h3>
      <form onSubmit={enviarMensaje}>
        <input
          type="text"
          value={mensajePrivado}
          onChange={(e) => setMensajePrivado(e.target.value)}
          placeholder="Escribe tu mensaje privado..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ChatPrivado;
