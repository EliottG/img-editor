import { useState } from 'react';

export default function ImageEditor() {
  const [image, setImage] = useState<string| null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
}