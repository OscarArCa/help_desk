// src/components/Header.tsx

import React from 'react';
import {type LucideIcon } from 'lucide-react';
// Importamos Home como ejemplo, pero se pasará por prop

const COLOR_GRIS_MEDIO = '#979797'; // Color de los iconos

interface HeaderProps {
    title: string;
    icon: LucideIcon; // Usamos LucideIcon para tipar los iconos de lucide-react
}

const Header: React.FC<HeaderProps> = ({ title, icon: Icon }) => {
    return (
        <header className="flex justify-between items-start mb-10">
            <div className="flex items-center space-x-3">
                {/* Ícono dinámico: Gris Medio de Figma */}
                <Icon className={`w-8 h-8 text-[${COLOR_GRIS_MEDIO}]`} />
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            </div>
            {/* Información de la Empresa (Fija) */}
            <div className="text-right">
                <p className="font-semibold text-lg">J&P PERIFERICOS S.A.C.</p>
                <p className="text-sm text-gray-600">Los Olivos</p>
            </div>
        </header>
    );
};

export default Header;