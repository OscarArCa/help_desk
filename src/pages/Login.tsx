import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import "@/styles/login.css";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");


    try {
        const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        
        const rol = (data.user.roles && Array.isArray(data.user.roles))
        ? data.user.roles[0].toLowerCase()
        : data.user.roles?.toLowerCase();

        if (rol === "InSituSupport") {
            navigate("/inicio");
        } else if (rol === "client") {
            navigate("/inicioClient");
        } else {
            navigate("/inicio");
        }
    } catch (error: any) {
        setError(error.message);
        console.error("Error en el login:", error);
    }
    }

    function goToRecuperarCuenta() {
        navigate("/recuperar-cuenta");
    }

    return (
        <div className="h-screen w-screen bg-[#FFA82E] flex justify-end items-center relative overflow-hidden">
            <div className="h-screen w-1/2 bg-[#4A4A4A] flex flex-col justify-center items-center relative login-shape">
                <div className="bg-[#5C5C5C] w-[80%] max-w-[600px] rounded-md p-6 text-center input-separado">
                    <h1 className="header-login">INICIO DE SESIÓN</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-[80%] max-w-[400px]">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E] h-[30px] input-separado"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E] h-[30px]"
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="bg-[#FFA82E] hover:bg-[#e69727] text-white font-semibold p-3 rounded-md transition-all duration-200 "
                    >
                        Iniciar Sesión
                    </button>

                    <div className="text-center text-sm text-gray-300 mt-2 header-login">
                        ¿Olvidaste tu contraseña?{" "}
                        <button
                            type="button"
                            onClick={goToRecuperarCuenta}
                            className="text-[#FFA82E] hover:underline"
                        >
                            Te ayudamos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
