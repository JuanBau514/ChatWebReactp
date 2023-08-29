import React, { useState } from "react";

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
            <input
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <button type="submit">Unirse al chat</button>
        </form>
    );
}

export default formularioRegistro;