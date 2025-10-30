import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;

