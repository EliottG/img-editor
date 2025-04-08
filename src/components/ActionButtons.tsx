import React, { useState } from 'react'
import { Filters } from '../types/filters';
import { Crop, Download, RotateCcw } from 'lucide-react';

interface Props {
    handleResetCrop: () => void;
    handleReset: () => void;
    croppedImage: string | null;
    selectedImage: string;
    filters: Filters;
  }
const ActionButtons: React.FC<Props> = ({handleResetCrop, handleReset, croppedImage, selectedImage, filters}) => {
    const [downloadFormat, setDownloadFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
    const handleDownload = () => {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // important pour éviter les soucis CORS
      image.src = croppedImage || selectedImage || '';
    
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        // Appliquer les filtres CSS au contexte du canvas
        ctx.filter = `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          grayscale(${filters.grayscale}%)
          saturate(${filters.saturate}%)
          sepia(${filters.sepia}%)
          invert(${filters.invert}%)
        `;
    
        ctx.drawImage(image, 0, 0, image.width, image.height);
    
        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = canvas.toDataURL();
        link.click();
      };
    
      };

  return (
    <div className="flex flex-col gap-4  justify-center flex-wrap">
                <div className='flex  justify-between gap-2 items-center'>
                <button
                  onClick={handleResetCrop}
                  className="flex gap-4 justify-center px-4 py-2 flex-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
                  >
                  <Crop/>
                  Crop
                </button>
                <button
                  onClick={handleReset}
                  className="flex gap-4 justify-center px-4 py-2 flex-1 bg-gray-200 text-dark rounded-lg hover:bg-gray-300 transition cursor-pointer"
                  >
                  <RotateCcw/>
                  Reset
                </button>
                </div>
                
  <div className="flex justify-between gap-2 items-center">
    <select
      value={downloadFormat}
      onChange={(e) => setDownloadFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
      className="border rounded px-2 py-1"
    >
      <option value="jpeg">JPEG</option>
      <option value="png">PNG</option>
      <option value="webp">WEBP</option>
    </select>
    <button
    onClick={handleDownload}
    className="flex gap-4 justify-center px-4 py-2 flex-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
  >
    <Download/>
    Download
</button>
  </div>
</div>)
}

export default ActionButtons
