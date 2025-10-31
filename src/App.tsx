import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import InicioClient from "@/pages/InicioClient"; 
// 🚨 CORRECCIÓN: Importar el componente de PÁGINA Tickets, NO el ícono 🚨
import TicketClient from "@/pages/TicketsClient";
import Chat from "@/pages/Chat.tsx";
import Clientes from "@/pages/Clientes.tsx";
// Eliminamos la importación del ícono: import {Tickets} from "lucide-react";
import Inicio from "./pages/Inicio";
import Tickets from "./pages/Tickets";
import Equipos from "./pages/Equipos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                <Route path="/inicio" element={<Inicio />} />

                <Route path="/TicketClient" element={<TicketClient />} />

                <Route path="/chat" element={<Chat />} />

                <Route path="/clientes" element={<Clientes />} />

                <Route path="/inicioClient" element={<InicioClient />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/equipos" element={<Equipos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

