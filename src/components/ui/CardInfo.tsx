import React from 'react';

interface CardInfoProps {
    title: string;
    subtitle?: string;
    value: number;
    icon: React.ReactNode;
    onButtonClick?: () => void;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, subtitle, value, icon, onButtonClick }) => {
    return (
        <div className="card-info">
            <div className="card-info-header">
                {icon}
                <div>
                    <div className="card-info-title">{title}</div>
                    {subtitle && <div className="card-info-subtitle">{subtitle}</div>}
                </div>
            </div>
            <div className="card-info-footer">
                <div className="card-info-value">{value}</div>
                <button className="card-info-button" onClick={onButtonClick}>
                    Ver
                </button>
            </div>
        </div>
    );
};

export default CardInfo;