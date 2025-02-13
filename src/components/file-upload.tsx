// app/components/FileUpload.tsx
'use client';

import { Cloud } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const FileUpload = ({
  onFileSelect,
  preview,
}: {
  onFileSelect: (file: File) => void;
  preview?: string;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="mb-6">
      <p className="text-gray-300 mb-2">Upload Profile Photo</p>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? 'border-teal-400 bg-[#08343C]/50' : 'border-teal-800 bg-[#08343C]/30'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-32 h-32">
            <Image
              fill
              src={preview}
              alt="Preview"
              className="w-32 h-32 mx-auto rounded-lg object-cover"
            />
          </div>
        ) : (
          <>
            <Cloud className="w-8 h-8 mx-auto mb-2 text-teal-400" />
            <p className="text-gray-300">Drag & drop or click to upload</p>
          </>
        )}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) =>
            e.target.files?.[0] && onFileSelect(e.target.files[0])
          }
          accept="image/*"
        />
      </div>
    </div>
  );
};
