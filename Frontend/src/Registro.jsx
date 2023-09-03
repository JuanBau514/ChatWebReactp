import React, { useState } from "react";
import './Estilos/Registro.css'

function formularioRegistro ({ registro }) {
    const [nombreUsuario, setNombreUsuario] = useState("");

    const unirseAlChat = (e) => {
        e.preventDefault();
        if (nombreUsuario.trim() === "") {
            alert("Ingrese un nombre de usuario");
            formularioRegistro(nombreUsuario);
        } else {
            registro(nombreUsuario);
        }
    };

    return (

                        
        <form onSubmit={unirseAlChat}>

            <div>
                <h1 className="titulo"> Bienvenido 👋</h1>
            </div>

            <div>
                <h3 className="subtitulo">Ingrese un nombre de usuario para unirte al chat 🗣</h3>
            </div>

            <input
                className="input"
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <div className="Boton-Enviar">
                <button className="btnEnvio" type="submit">Unirse al chat</button>
            </div>
        </form>

          

    );
}

export default formularioRegistro;