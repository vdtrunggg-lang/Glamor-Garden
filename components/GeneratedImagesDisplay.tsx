
import React from 'react';

interface GeneratedImagesDisplayProps {
    images: string[];
}

const ImageCard: React.FC<{ src: string, index: number }> = ({ src, index }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `glamor-garden-image-${index + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src={src} alt={`Generated Garden ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button
                    onClick={handleDownload}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 font-bold py-2 px-4 rounded-full flex items-center space-x-2 transform scale-90 group-hover:scale-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Tải về</span>
                </button>
            </div>
        </div>
    );
};


export const GeneratedImagesDisplay: React.FC<GeneratedImagesDisplayProps> = ({ images }) => {
    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Kết quả của bạn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, index) => (
                    <ImageCard key={index} src={img} index={index} />
                ))}
            </div>
        </div>
    );
};
