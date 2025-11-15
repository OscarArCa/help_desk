import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import Inicio from "@/pages/Inicio"; // Asegúrate de que no tenga la extensión .tsx aquí
// 🚨 CORRECCIÓN: Importar el componente de PÁGINA Tickets, NO el ícono 🚨
import TicketsPage from "@/pages/Tickets";
import Chat from "@/pages/Chat.tsx";
import Clientes from "@/pages/Clientes.tsx";
import Inicio_inSitu from "@/pages/Inicio_inSitu.tsx";
import Tickets_inSitu from "@/pages/Tickets_inSitu.tsx";
// Eliminamos la importación del ícono: import {Tickets} from "lucide-react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                <Route path="/inicio" element={<Inicio />} />

                <Route path="/inicio_insitu" element={<Inicio_inSitu />} />

                <Route path="/tickets" element={<TicketsPage />} />

                <Route path="/tickets_insitu" element={<Tickets_inSitu />} />

                <Route path="/chat" element={<Chat />} />

                <Route path="/clientes" element={<Clientes />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

