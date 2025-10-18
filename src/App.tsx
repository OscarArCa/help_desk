import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import Inicio from "@/pages/Inicio"; // Asegúrate de que no tenga la extensión .tsx aquí
// 🚨 CORRECCIÓN: Importar el componente de PÁGINA Tickets, NO el ícono 🚨
import TicketsPage from "@/pages/Tickets";
// Eliminamos la importación del ícono: import {Tickets} from "lucide-react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* La ruta raíz (/) te lleva al Login. */}
                <Route path="/" element={<Login />} />
                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

                {/* Si quieres que Inicio sea el dashboard principal, usa /inicio o /dashboard */}
                <Route path="/inicio" element={<Inicio />} />

                {/* 🚨 CLAVE: Usamos el componente TicketsPage que contiene la tabla y el sidebar. 🚨 */}
                <Route path="/tickets" element={<TicketsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

