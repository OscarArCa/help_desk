import React from "react";

const COLOR_NARANJA = "#FFC676";

interface StatsCardProps {
    title: string;
    value: string | number;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col justify-between items-start rounded-[10px] shadow-xl text-black select-none cursor-pointer transition-transform hover:scale-105 ml-[20px] p-[10px]"
        style={{
            backgroundColor: COLOR_NARANJA,
            width: 300,
            height: 300,
        }}
    >
        <div className="w-full flex items-start justify-between">
            <Icon className="w-[85px] h-[85px]" />
            <div className="text-left">
                <h3 className="text-lg font-semibold text-black">{title}</h3>
            </div>
        </div>

        <div className="w-full flex flex-col items-start">
            <div className="w-full flex justify-between items-center">
                <div className="text-[36px] font-extrabold text-black">{value}</div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onClick) onClick();
                    }}
                    className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-sm hover:opacity-90"
                >
                    Ver
                </button>
            </div>
        </div>
    </div>
);

export default StatsCard;
export type { StatsCardProps };
