import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import InicioClient from "@/pages/InicioClient"; 
// 🚨 CORRECCIÓN: Importar el componente de PÁGINA Tickets, NO el ícono 🚨
import TicketsPage from "@/pages/Tickets";
import Chat from "@/pages/Chat.tsx";
import Clientes from "@/pages/Clientes.tsx";
// Eliminamos la importación del ícono: import {Tickets} from "lucide-react";
import Inicio from "./pages/Inicio";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                <Route path="/inicio" element={<Inicio />} />

                <Route path="/tickets" element={<TicketsPage />} />

                <Route path="/chat" element={<Chat />} />

                <Route path="/clientes" element={<Clientes />} />

                <Route path="/inicioClient" element={<InicioClient />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

