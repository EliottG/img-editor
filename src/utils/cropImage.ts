import { Filters } from '../types/filters';

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getCroppedImg = (
  imageSrc: string,
  crop: Crop,
  filters?: Filters
): Promise<string> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 🖌️ Appliquer les filtres dans le canvas
      if (filters) {
        ctx.filter = `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          grayscale(${filters.grayscale}%)
        `.trim();
      }

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      resolve(dataUrl);
    };
  });
};

export default getCroppedImg;