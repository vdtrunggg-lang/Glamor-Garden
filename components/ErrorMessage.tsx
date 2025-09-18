
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md w-full max-w-2xl text-center" role="alert">
            <p className="font-bold">Đã xảy ra lỗi</p>
            <p>{message}</p>
        </div>
    );
};
