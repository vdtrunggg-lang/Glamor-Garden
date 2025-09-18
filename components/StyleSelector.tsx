
import React from 'react';
import type { GardenStyle } from '../types';

interface StyleSelectorProps {
    styles: GardenStyle[];
    selectedStyle: GardenStyle;
    onSelectStyle: (style: GardenStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onSelectStyle(style)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        selectedStyle.id === style.id
                            ? 'bg-green-700 text-white shadow-lg transform scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-green-200 hover:text-green-800'
                    }`}
                >
                    {style.name}
                </button>
            ))}
        </div>
    );
};
