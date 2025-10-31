import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext"; // ✅ IMPORTANTE
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import InicioClient from "@/pages/InicioClient";
import Clientes from "@/pages/Clientes.tsx";
import Inicio from "@/pages/Inicio";
import TicketsPage from "@/pages/Tickets";
import Chat from "@/pages/Chat.tsx";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/ProtectedLogin";

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

                    <Route path="/chat" element={<Chat />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/inicioClient" element={<InicioClient />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
