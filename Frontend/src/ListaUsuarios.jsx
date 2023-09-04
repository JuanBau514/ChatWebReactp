import React, { useState } from "react";
import ChatPrivado from "./chatPrivado";

function ListaUsuarios({ usuariosConectados, miId }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarChatPrivado, setMostrarChatPrivado] = useState(false);

  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarChatPrivado(true);
  };

  const cerrarChatPrivado = () => {
    setUsuarioSeleccionado(null);
    setMostrarChatPrivado(false);
  };

  /*este componente me ayuda a limpiar los elementos en pantalla y a mostrar el chat privado*/
  const volverBroadcast = () => {
    setUsuarioSeleccionado(null);
    setMostrarChatPrivado(false);
  };

  return (
    
    <div className="lista-usuarios">
      <h3>Usuarios conectados</h3>
      {mostrarChatPrivado ? (
        // Mostrar chat privado
        <div>
          <button onClick={volverBroadcast}> volver al chat Broadcast </button>
          <ChatPrivado usuarioDestino={usuarioSeleccionado} miId={miId} />
        </div>
      ) : (
        // Mostrar lista de usuarios
        <ul>
          {usuariosConectados.map((usuario) => (
            <li
              key={usuario.id}
              className="usuario-item"
              onClick={() => seleccionarUsuario(usuario)}
            >
              <button className="btn-estado-usuario">
                Iniciar chat privado con 🥵 {usuario}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaUsuarios;
