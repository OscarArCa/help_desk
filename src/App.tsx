import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import InicioClient from "@/pages/InicioClient"; 
// 🚨 CORRECCIÓN: Importar el componente de PÁGINA Tickets, NO el ícono 🚨
import Clientes from "@/pages/Clientes.tsx";
// Eliminamos la importación del ícono: import {Tickets} from "lucide-react";
import Inicio from "@/pages/Inicio";
import TicketsPage from "@/pages/Tickets";
import Chat from "@/pages/Chat.tsx";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/ProtectedLogin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                    }
                    />
                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                <Route path="/inicio" element={
                    <ProtectedRoute>
                        <Inicio />
                    </ProtectedRoute>
                }/>
                <Route path="/tickets" element={
                    <ProtectedRoute>
                        <TicketsPage />
                    </ProtectedRoute>
                    } />

                <Route path="/chat" element={<Chat />} />

                <Route path="/clientes" element={<Clientes />} />

                <Route path="/inicioClient" element={<InicioClient />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

