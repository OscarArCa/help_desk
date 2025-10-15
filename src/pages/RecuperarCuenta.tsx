import React from "react";

const RecuperarCuenta: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FFA82E] flex items-center justify-center">
            {/* Panel gris oscuro */}
            <div className="bg-[#4A4A4A] p-8 rounded-lg w-full max-w-lg shadow-lg">
                {/* Contenido del formulario */}
                <h2 className="text-white font-bold text-xl mb-4">
                    Recuperar tu contraseña
                </h2>
                <p className="text-gray-200 text-sm mb-4">
                    Ingresa tu correo electrónico o número de celular para que nuestro soporte pueda ayudarte.
                </p>

                <input
                    type="text"
                    placeholder="Correo electrónico o número de celular"
                    className="w-full px-3 py-2 rounded-md mb-4 bg-white text-black
                               focus:outline-none focus:ring-2 focus:ring-[#FFA82E]"
                />

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-[#FFA82E] text-white hover:bg-[#e69727]"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecuperarCuenta;


