import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    // ✅ Maneja el envío del formulario con tipado TS
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Intentando iniciar sesión...");
    }

    function goToRecuperarCuenta() {
        navigate("/RecuperarCuenta");
    }

    return (
        <div className="h-screen w-screen bg-[#FFA82E] flex justify-center items-center relative overflow-hidden">
            <div
                className="h-full w-full md:w-1/2 bg-[#4A4A4A] flex items-center justify-center absolute right-0 top-0 transition-all duration-300"
                style={{
                    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0 50%)",
                }}
            >
                <div className="text-white w-80 md:w-96 text-center px-4">
                    <h2 className="text-3xl font-bold mb-6">INICIO DE SESIÓN</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E]"
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E]"
                        />

                        <div className="flex items-center space-x-2 text-left">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 accent-[#FFA82E]"
                            />
                            <label htmlFor="remember" className="text-sm">
                                Recordar contraseña
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#FFA82E] hover:bg-[#e69727] text-white font-semibold p-3 rounded-md transition-all duration-200"
                        >
                            Iniciar Sesión
                        </button>

                        <div className="text-center text-sm text-gray-300 mt-2">
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
        </div>
    );
}
