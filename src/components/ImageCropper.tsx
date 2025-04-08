import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { Filters } from '../types/filters';
import { Check, X } from 'lucide-react';

interface Props {
  image: string;
  filters: Filters;
  onCropComplete: (croppedImage: string) => void;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

const ImageCropper: React.FC<Props> = ({ image, filters, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback((_: any, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, filters);
      onCropComplete(croppedImage);
    }
  };

  const handleCancel = async () => {
      onCropComplete(image);
  };

  return (
    <div>
      <div className="relative w-full h-[400px]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
        />
      </div>
      <div className='flex gap-4 justify-end'>
        
      <button onClick={handleCancel} className="flex justify-center cursor-pointer gap-4 mt-4 p-2 bg-gray-200 hover:bg-gray-300 text-dark rounded">
        <X/>
        Annuler
      </button>
      <button onClick={handleDone} className="flex justify-center cursor-pointer gap-4 mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
      <Check/>

        Rogner
      </button>
      </div>
    </div>
  );
};

export default ImageCropper;