import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import Inicio from "./pages/Inicio";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
                <Route path="/inicio" element={<Inicio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
