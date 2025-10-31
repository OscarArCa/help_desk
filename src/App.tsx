import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import TicketsPage from "@/pages/Tickets";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/ProtectedLogin";
import InicioClient from "@/pages/InicioClient"; 
import TicketClient from "@/pages/TicketsClient";
import Chat from "@/pages/Chat.tsx";
import Clientes from "@/pages/Clientes.tsx";
import Inicio from "./pages/Inicio";
import Tickets from "./pages/Tickets";
import Equipos from "./pages/Equipos";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                    <Route
                        path="/inicio"
                        element={
                            <ProtectedRoute>
                                <Inicio />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tickets"
                        element={
                            <ProtectedRoute>
                                <TicketsPage />
                            </ProtectedRoute>
                        }
                    />

                <Route path="/inicio" element={<Inicio />} />

                <Route path="/TicketClient" element={<TicketClient />} />

                <Route path="/chat" element={<Chat />} />

                <Route path="/clientes" element={<Clientes />} />

                <Route path="/inicioClient" element={<InicioClient />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/equipos" element={<Equipos />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
