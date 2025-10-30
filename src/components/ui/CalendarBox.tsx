import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarBoxProps {
    onDateClick?: (date: number) => void;
    onCalendarClick?: () => void; // Nueva prop para cuando se hace clic en el calendario
}

const CalendarBox: React.FC<CalendarBoxProps> = ({ onDateClick }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date(2023, 4, 1)); // Mayo 2023
    const [selectedDate, setSelectedDate] = useState<number>(13);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (date: Date): { firstDay: number; daysInMonth: number } => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const handleDateClick = (day: number) => {
        setSelectedDate(day);
        if (onDateClick) {
            onDateClick(day);
        }
    };

    const renderCalendar = () => {
        const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
        const days: React.ReactNode[] = [];
        const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

        // Ajustar firstDay para que lunes sea 0
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < adjustedFirstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = day === selectedDate;
            const isHighlighted = day === 18;

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                >
                    {day}
                </div>
            );
        }

        return (
            <>
                {weekDays.map(day => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}
                {days}
            </>
        );
    };

    const changeMonth = (direction: number): void => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)} className="calendar-nav-button">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="calendar-title">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} className="calendar-nav-button">
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="calendar-grid">
                {renderCalendar()}
            </div>
        </div>
    );
};

export default CalendarBox;