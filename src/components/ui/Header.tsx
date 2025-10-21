import React from 'react';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header-left">
                <Home size={32} />
                <h1 className="header-title">Inicio</h1>
            </div>
            <div className="header-right">
                <div className="header-company">J&P PERIFERICOS S.A.C.</div>
                <div className="header-location">Los Olivos</div>
            </div>
        </div>
    );
};

export default Header;