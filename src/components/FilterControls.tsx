import React from 'react';
import { Filters } from '../types/filters';

interface Props {
  filters: Filters;
  onChange: (name: keyof Filters, value: number) => void;
}

const FilterControls: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="space-y-6">
    {[
      { name: 'brightness', label: 'Brightness', max: 200 },
      { name: 'contrast', label: 'Contrast', max: 200 },
      { name: 'grayscale', label: 'Black & White', max: 100 },
      { name: 'saturate', label: 'Saturation', max: 300 },
      { name: 'sepia', label: 'Sepia', max: 100 },
      { name: 'invert', label: 'Invert', max: 100 },
    ].map(({ name, label, max }) => (
      <div key={name} className="w-full">
        <label className="block mb-2 text-sm font-medium text-white">
          {label}: {filters[name as keyof typeof filters]}%
        </label>
        <input
          type="range"
          min={0}
          max={max}
          value={filters[name as keyof typeof filters]}
          onChange={(e) =>
            onChange(name as keyof typeof filters, Number(e.target.value))
          }
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    ))}
  </div>
  );
};

export default FilterControls;
