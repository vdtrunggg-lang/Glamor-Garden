
import React, { useRef } from 'react';

interface ImageUploaderProps {
    title: string;
    onImageUpload: (base64: string | null) => void;
    uploadedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload, uploadedImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        onImageUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 flex flex-col justify-center items-center text-center hover:border-green-500 transition cursor-pointer"
             onClick={() => fileInputRef.current?.click()}>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            {uploadedImage ? (
                <>
                    <img src={uploadedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 leading-none hover:bg-red-700 transition"
                        aria-label="Remove image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">{title}</span>
                </>
            )}
        </div>
    );
};
