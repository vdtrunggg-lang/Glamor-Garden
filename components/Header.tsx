
import React from 'react';
import { GLAMOR_GARDEN_LOGO } from '../constants';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={GLAMOR_GARDEN_LOGO} alt="Glamor Garden Logo" className="h-16 w-16 object-contain" />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-green-800">Tạo ảnh sân vườn mẫu</h1>
                        <p className="text-sm md:text-md text-gray-500">by GLAMOR GARDEN</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
