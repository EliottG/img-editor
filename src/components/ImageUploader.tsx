import { Upload } from 'lucide-react';
import React, { useState, DragEvent } from 'react';

interface Props {
  onImageSelected: (imageUrl: string) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelected(imageUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <label
  onDrop={handleDrop}
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={(e) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const { clientX, clientY } = e;
    if (
      clientX <= rect.left ||
      clientX >= rect.right ||
      clientY <= rect.top ||
      clientY >= rect.bottom
    ) {
      setIsDragging(false);
    }
  }}
  className={`flex flex-col items-center justify-center gap-3 w-full max-w-md h-40 px-4 py-6 rounded-xl border-2 border-dashed transition 
    ${isDragging ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'} cursor-pointer text-gray-600 hover:border-blue-400`}
>
  <Upload className="w-6 h-6" />
  <span className="font-medium">
    {isDragging ? 'Drop the image here' : 'Click or drag an image here'}
  </span>
  <input
    type="file"
    accept="image/*"
    onChange={handleChange}
    className="hidden"
  />
</label>
  );
};

export default ImageUploader;
