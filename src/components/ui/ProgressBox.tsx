import React from 'react';

interface ProgressBoxProps {
    title: string;
    subtitle?: string;
    value: number;
    type: 'proceso' | 'resueltos';
}

const ProgressBox: React.FC<ProgressBoxProps> = ({ title, subtitle, value, type }) => {
    const circumference = 2 * Math.PI * 56;
    const progress = (value / 100) * circumference;

    return (
        <div className={`progress-box ${type === 'proceso' ? 'en-proceso' : 'resueltos'}`}>
            <div className="progress-title">{title}</div>
            {subtitle && <div className="progress-subtitle">{subtitle}</div>}
            <div className="progress-circle">
                <svg>
                    <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="progress-circle-bg"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className={`progress-circle-fill ${type}`}
                        strokeDasharray={`${progress} ${circumference}`}
                    />
                </svg>
                <span className="progress-percentage">{value} %</span>
            </div>
        </div>
    );
};

export default ProgressBox;