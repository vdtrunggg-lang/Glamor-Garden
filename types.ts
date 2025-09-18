
export interface GardenStyle {
  id: string;
  name: string;
  prompt: string;
}

export interface AspectRatio {
  label: string;
  value: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  resolutionHint: string;
}

export interface GenerateImageParams {
  style: GardenStyle;
  gardenPrompt: string;
  modelDescription: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
}
