import React from 'react';
import { Filters } from '../types/filters';

interface Props {
  imageUrl: string;
  filters: Filters;
  onCropClick: () => void;
}

const ImagePreview: React.FC<Props> = ({ imageUrl, filters, onCropClick }) => {
  const getFilterStyle = () => {
    const { brightness, contrast, grayscale } = filters;
    return `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <img
        src={imageUrl}
        alt="Preview"
        style={{ filter: getFilterStyle() }}
        className="max-w-full h-auto border rounded"
      />
      <button
        onClick={onCropClick}
        className="w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Crop
      </button>
    </div>
  );
};

export default ImagePreview;
