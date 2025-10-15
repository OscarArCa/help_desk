import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecuperarCuenta from "./pages/RecuperarCuenta";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
