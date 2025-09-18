
import React from 'react';

interface LoadingSpinnerProps {
    small?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ small = false }) => {
    const sizeClasses = small ? 'h-5 w-5 border-2' : 'h-16 w-16 border-4';
    const messages = [
        "Đang gieo hạt ý tưởng...",
        "Đang tưới nước cho sự sáng tạo...",
        "Khu vườn của bạn sắp nở rộ...",
        "Các kiến trúc sư AI đang làm việc...",
        "Đang sắp xếp từng chiếc lá...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 2500);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (small) {
        return <div className={`animate-spin rounded-full ${sizeClasses} border-t-transparent border-white`}></div>
    }

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className={`animate-spin rounded-full ${sizeClasses} border-t-transparent border-green-600`}></div>
            <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>
        </div>
    );
};
