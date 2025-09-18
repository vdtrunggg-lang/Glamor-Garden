
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { GeneratedImagesDisplay } from './components/GeneratedImagesDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateGardenImages } from './services/geminiService';
import type { GardenStyle, AspectRatio } from './types';
import { GARDEN_STYLES, ASPECT_RATIOS } from './constants';

const App: React.FC = () => {
    const [selectedStyle, setSelectedStyle] = useState<GardenStyle>(GARDEN_STYLES[0]);
    const [modelImage, setModelImage] = useState<string | null>(null);
    const [gardenImage, setGardenImage] = useState<string | null>(null);
    const [modelDescription, setModelDescription] = useState<string>('');
    const [gardenPrompt, setGardenPrompt] = useState<string>('');
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
    
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateClick = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const images = await generateGardenImages({
                style: selectedStyle,
                gardenPrompt,
                modelDescription,
                aspectRatio: selectedAspectRatio.value,
            });
            setGeneratedImages(images);
        } catch (err) {
            console.error("Error generating images:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [selectedStyle, gardenPrompt, modelDescription, selectedAspectRatio]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Header />
            <main className="container mx-auto p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls Panel */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-fit">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-4">Bảng điều khiển</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-md font-semibold text-gray-600 mb-2">1. Chọn phong cách sân vườn</label>
                                <StyleSelector
                                    styles={GARDEN_STYLES}
                                    selectedStyle={selectedStyle}
                                    onSelectStyle={setSelectedStyle}
                                />
                            </div>

                            <div>
                                <label className="block text-md font-semibold text-gray-600 mb-2">2. Tải ảnh tham khảo (Tùy chọn)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageUploader title="Tải ảnh người mẫu" onImageUpload={setModelImage} uploadedImage={modelImage}/>
                                    <ImageUploader title="Tải ảnh sân vườn" onImageUpload={setGardenImage} uploadedImage={gardenImage}/>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="model-description" className="block text-md font-semibold text-gray-600 mb-2">3. Mô tả người mẫu</label>
                                <textarea
                                    id="model-description"
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    placeholder="VD: một người phụ nữ Châu Á mặc váy trắng đang đọc sách..."
                                    value={modelDescription}
                                    onChange={(e) => setModelDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="garden-prompt" className="block text-md font-semibold text-gray-600 mb-2">4. Mô tả sân vườn</label>
                                <textarea
                                    id="garden-prompt"
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    placeholder="VD: một khu vườn có nhiều cây xanh, hồ cá koi, và một lối đi bằng đá..."
                                    value={gardenPrompt}
                                    onChange={(e) => setGardenPrompt(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-md font-semibold text-gray-600 mb-2">5. Chọn tỷ lệ &amp; độ phân giải</label>
                                <div className="flex flex-wrap gap-2">
                                    {ASPECT_RATIOS.map((ratio) => (
                                        <button
                                            key={ratio.label}
                                            onClick={() => setSelectedAspectRatio(ratio)}
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                                                selectedAspectRatio.label === ratio.label
                                                    ? 'bg-green-700 text-white shadow-md'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {ratio.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleGenerateClick}
                                disabled={isLoading || !gardenPrompt}
                                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg"
                            >
                                {isLoading ? (
                                    <LoadingSpinner small={true}/>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                )}
                                <span>{isLoading ? 'Đang xử lý...' : 'Tạo ảnh'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Image Display Area */}
                    <div className="lg:col-span-8">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 min-h-[600px] flex flex-col justify-center items-center">
                          {isLoading && <LoadingSpinner />}
                          {error && <ErrorMessage message={error} />}
                          {!isLoading && !error && generatedImages.length > 0 && (
                              <GeneratedImagesDisplay images={generatedImages} />
                          )}
                          {!isLoading && !error && generatedImages.length === 0 && (
                              <div className="text-center text-gray-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <h3 className="mt-4 text-lg font-semibold">Khu vực hiển thị ảnh</h3>
                                  <p className="mt-1 text-sm">Hình ảnh do AI tạo ra sẽ xuất hiện ở đây.</p>
                              </div>
                          )}
                      </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
