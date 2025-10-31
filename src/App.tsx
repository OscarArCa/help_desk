import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
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
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/equipos" element={<Equipos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
