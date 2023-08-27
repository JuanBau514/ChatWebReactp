
import io from "socket.io-client";

const server = io("/");

function app() {
    return (
        <div>
            Hola Internet esto es un chat en tiempo real con opcion broadcast privado y grupal
        </div>
    )
}

export default app