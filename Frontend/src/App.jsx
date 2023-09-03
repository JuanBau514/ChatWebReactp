import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Registro from "./Registro";
import ListaUsuarios from "./ListaUsuarios";
import "./Estilos/Chat.css";

const server = io("/");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [miId, setMiId] = useState("");
  const [usuariosConectados, setUsuariosConectados] = useState([]);
  const [usuarioChatPrivado, setUsuarioChatPrivado] = useState(null);
  const [mensajePrivado, setMensajePrivado] = useState(""); // Agregado estado para el mensaje privado

  const envioForm = (e) => {
    e.preventDefault();
    const MensajeNuevo = {
      form: miId,
      nombreUsuario: nombreUsuario,
      datos: mensaje,
    };
    server.emit("mensaje", mensaje);
  };

  const registro = (nombreUsuario) => {
    setNombreUsuario(nombreUsuario);
    const nUsuario = nombreUsuario;
    setMiId(nUsuario);
    server.emit("registro", nUsuario);
  };

  const seleccionarUsuario = (usuarioId) => {
    setMiId(usuarioId);
  };

  const seleccionarUsuarioChatPrivado = (usuarioId) => {
    setUsuarioChatPrivado(usuarioId);
  };

  const enviarMensajePrivado = (e) => {
    e.preventDefault();
    if (usuarioChatPrivado && mensajePrivado) {
      const mensajePrivadoData = {
        datos: mensajePrivado,
        form: miId,
        nombreUsuario: nombreUsuario,
        destinatario: usuarioChatPrivado,
      };
      server.emit("chatPrivado", mensajePrivadoData);
      setMensajePrivado(""); // Limpiar el campo de texto después de enviar
    }
  };

  useEffect(() => {
    const atendedorDeMensajes = (MensajeNuevo) => {
      setMensajes([...mensajes, MensajeNuevo]);
    };

    const atendedorDeRegistro = (usuarioRecibido) => {
      setMensajes([
        ...mensajes,
        { form: usuarioRecibido.form, datos: usuarioRecibido.nombreUsuario },
      ]);
    };

    const atendedorDeUsuariosConectados = (usuariosConectados) => {
      setUsuariosConectados(usuariosConectados);
    };

    server.on("mensaje", atendedorDeMensajes);
    server.on("registro", atendedorDeRegistro);
    server.on("usuariosConectados", atendedorDeUsuariosConectados);

    return () => {
      server.off("mensaje", atendedorDeMensajes);
      server.off("registro", atendedorDeRegistro);
      server.off("usuariosConectados", atendedorDeUsuariosConectados);
    };
  }, [mensajes]);


  return (
  <div className="divChat">
    <div>
      {nombreUsuario === "" ? (
        <Registro registro={registro} />
      ) : (
        <div>
          <h1 className="Titulo">👋 Hola {nombreUsuario} ¿Qué tal tu día?</h1>

          <div className="usuarios">
            <h2 className="tituloUsuarios">Usuarios conectados 👨‍👩‍👧‍👦</h2>
            <ul className="listaUsuarios">
              <ListaUsuarios
                usuariosConectados={usuariosConectados}
                seleccionarUsuario={seleccionarUsuario}
                seleccionarUsuarioChatPrivado={seleccionarUsuarioChatPrivado}
                
              />
            </ul>
          </div>

          {usuarioChatPrivado ? (
            <div>
              <h3>Chat privado con {usuarioChatPrivado}</h3>
              <form onSubmit={enviarMensajePrivado}>
                <input
                  type="text"
                  value={mensajePrivado}
                  onChange={(e) => setMensajePrivado(e.target.value)}
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={envioForm}>
                <input
                  className="inputEnvio"
                  type="text"
                  placeholder="Ingrese su mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </form>
              <button className="btn-envio" type="submit">
                Enviar
              </button>
            </div>
          )}

          <div className="divMensajes">
            <ul className="lista-Mensajes">
              {mensajes.map((mensaje, index) => (
                <li
                  key={index}
                  className={
                    mensaje.form === miId
                      ? "mensaje-usuario"
                      : "mensaje-otro-usuario"
                  }
                >
                  {mensaje.nombreUsuario} ({mensaje.form}): {mensaje.datos}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default App;
