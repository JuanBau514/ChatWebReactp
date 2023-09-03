import React, { useState } from "react";
import ChatPrivado from "./chatPrivado";

function ListaUsuarios({ usuariosConectados, seleccionarUsuario }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [mostrarChatPrivado, setMostrarChatPrivado] = useState(false);

  const handleUsuarioSeleccionado = (usuarioId) => {
    setUsuarioSeleccionado(usuarioId);
    seleccionarUsuario(usuarioId);
  };

  const iniciarChatPrivado = () => {
    setMostrarChatPrivado(true);
  };

  const enviarMensajePrivado = (mensaje) => {
    console.log(mensaje);

    const nuevaVentana = window.open('', '_blank');

    if (nuevaVentana) {
      nuevaVentana.document.write(`<h1>Mensaje privado de ${usuarioSeleccionado}</h1>`);
      nuevaVentana.document.write(`<p>${mensaje}</p>`);
      setTimeout (() => {
      nuevaVentana.close();
    }, 5000);

    } else{
      alert('No se pudo abrir la ventana');
    }

    

    setMostrarChatPrivado(false);
  };

  return (
    <div className="lista-usuarios">
      <h3>Usuarios conectados</h3>
      <ul>
        {usuariosConectados.map((usuario) => (
          console.log(usuario),
          <li
            key={usuario.id}
            onClick={() => handleUsuarioSeleccionado(usuario.id)}
            className={usuario.id === usuarioSeleccionado ? "usuario-seleccionado" : ""}
          >
            <button className="btn-estado-usuario" onClick={iniciarChatPrivado}>
              Inicia chat privado con 🥵 {usuario}
            </button>
          </li>
        ))}
      </ul>

      {mostrarChatPrivado && (
        <ChatPrivado
          usuarioDestino={usuariosConectados.find((usuario) => usuario.id === usuarioSeleccionado)?.nombreUsuario}
          enviarMensajePrivado={enviarMensajePrivado}
        />
      )}
    </div>
  );
}

export default ListaUsuarios;
