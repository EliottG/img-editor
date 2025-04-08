import React, { useRef, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ImageCropper from '../components/ImageCropper';
import FilterControls from '../components/FilterControls';
import { Filters } from '../types/filters';
import ActionButtons from '../components/ActionButtons';

const defaultFilter: Filters = {
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  saturate: 100,
  sepia: 0,
  invert: 0,
};

const EditorPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>(defaultFilter);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const cropperRef = useRef<HTMLDivElement | null>(null);

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setCroppedImage(null);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCropComplete = (cropped: string) => {
    setCroppedImage(cropped);
    setIsCropping(false);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleResetCrop = () => {
    setCroppedImage(null);
    setIsCropping(true);
    setTimeout(() => {
      cropperRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };



  const handleFilterChange = (name: keyof Filters, value: number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100  px-4 py-10">
<div className="max-w-5xl mx-auto space-y-8">
<div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-1">🖌️ Image Editor</h1>
    <p className="text-gray-500 text-sm">Edit, crop, and apply filters to your images in seconds.</p>
  </div>
  
    <ImageUploader onImageSelected={handleImageSelected} />
</div>

        {selectedImage && isCropping && (
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 ref={cropperRef} className="text-lg font-medium text-gray-700 mb-4">Crop your image</h2>
            <ImageCropper
              image={selectedImage}
              filters={filters}
              onCropComplete={handleCropComplete}
            />
          </div>
        )}

      {selectedImage && (
        <div  className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <FilterControls filters={filters} onChange={handleFilterChange} />
            <ActionButtons
              croppedImage={croppedImage}
              handleResetCrop={handleResetCrop}
              selectedImage={selectedImage}
              filters={filters}
              handleReset={() => {
                setFilters(defaultFilter);
                setCroppedImage(selectedImage);
              }}
            />
          </div>

          <div ref={editorRef} className="flex justify-center lg:justify-end mt-4 lg:mt-0">
  <div className="w-full max-w-md aspect-video border rounded-lg shadow flex items-center justify-center overflow-hidden">
    <img
      src={croppedImage || selectedImage}
      alt="Cropped"
      style={{
        filter: `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          grayscale(${filters.grayscale}%)
          saturate(${filters.saturate}%)
          sepia(${filters.sepia}%)
          invert(${filters.invert}%)
        `,
      }}
      className="w-full h-full object-contain"
    />
  </div>
</div>
        </div>
      )}
      </div>
    </div>
  );
};

export default EditorPage;