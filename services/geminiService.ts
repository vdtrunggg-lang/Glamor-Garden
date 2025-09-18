
import { GoogleGenAI } from "@google/genai";
import type { GenerateImageParams } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildFullPrompt = (params: GenerateImageParams): string => {
    const { style, gardenPrompt, modelDescription } = params;

    let prompt = `Create an ultra-realistic, photorealistic, high-resolution photograph of ${style.prompt}. `;
    
    prompt += `The scene is described as: "${gardenPrompt}". `;

    if (modelDescription.trim() !== '') {
        prompt += `In the scene, there is the following person or element: "${modelDescription}". `;
    }

    prompt += `The image should have natural lighting, incredible detail, and the quality of a professional photograph taken with a DSLR camera using a wide aperture lens. Emphasize realism and natural beauty.`;

    return prompt;
};


export const generateGardenImages = async (params: GenerateImageParams): Promise<string[]> => {
    try {
        const fullPrompt = buildFullPrompt(params);
        console.log("Generating with prompt:", fullPrompt);
        console.log("Aspect Ratio:", params.aspectRatio);

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: {
              numberOfImages: 4,
              outputMimeType: 'image/jpeg',
              aspectRatio: params.aspectRatio,
            },
        });
        
        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("The API did not return any images.");
        }

        return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        
        let errorMessage = "Failed to generate images.";
        if (error instanceof Error) {
            errorMessage += ` Details: ${error.message}`;
        }
        
        // This generic error is often better for user-facing messages
        // than exposing potential API key issues or other internal details.
        throw new Error("Sorry, there was a problem creating your garden images. Please check your prompt and try again.");
    }
};
