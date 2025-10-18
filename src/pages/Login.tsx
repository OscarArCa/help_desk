import { useNavigate } from "react-router-dom";
import "@/styles/login.css";

export default function Login() {
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Intentando iniciar sesión...");
    }

    function goToRecuperarCuenta() {
        navigate("/recuperar-cuenta");
    }

    function goToInicio() {
        navigate("/inicio");
    }

    return (
        <div className="h-screen w-screen bg-[#FFA82E] flex justify-end items-center relative overflow-hidden">
            {/* Mitad derecha con forma */}
            <div className="h-screen w-1/2 bg-[#4A4A4A] flex flex-col justify-center items-center relative login-shape">
                {/* Encabezado */}
                <div className="bg-[#5C5C5C] w-[80%] max-w-[600px] rounded-md p-6 text-center input-separado">
                    <h1 className="header-login">INICIO DE SESIÓN</h1>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-[80%] max-w-[400px]">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E] h-[30px] input-separado"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#FFA82E] h-[30px]"
                    />

                    <div className="flex items-center justify-center space-x-2 header-login">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 accent-[#FFA82E]"
                        />
                        <label htmlFor="remember" className="text-sm text-white">
                            Recordar contraseña
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#FFA82E] hover:bg-[#e69727] text-white font-semibold p-3 rounded-md transition-all duration-200 "
                        onClick={goToInicio}
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
