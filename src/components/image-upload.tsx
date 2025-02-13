'use client';

import { CloudinaryResponse } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud, Loader2, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  error?: string;
  maxSizeMB?: number;
}

export const ImageUpload = ({
  onUploadComplete,
  error: externalError,
  maxSizeMB = 5,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const [error, setError] = useState<string>();

  const validateFile = (file: File) => {
    setError(undefined);

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return false;
    }

    // Check image dimensions (optional)
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 100 || img.height < 100) {
          setError('Image dimensions must be at least 100x100 pixels');
          resolve(false);
        }
        if (img.width > 4096 || img.height > 4096) {
          setError('Image dimensions cannot exceed 4096x4096 pixels');
          resolve(false);
        }
        resolve(true);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        setError('Invalid image file');
        resolve(false);
      };
    });
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/cloudinary', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data: CloudinaryResponse = await response.json();
    return data;
  };

  const deleteFromCloudinary = async (publicId: string) => {
    const response = await fetch(`/api/cloudinary?publicId=${publicId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return await response.json();
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        try {
          // Validate file before uploading
          const isValid = await validateFile(file);
          if (!isValid) return;

          setUploading(true);
          setError(undefined);

          // If there's an existing image, delete it first
          if (publicId) {
            await deleteFromCloudinary(publicId);
          }

          const data = await uploadToCloudinary(file);
          setPublicId(data.public_id);
          setPreview(data.secure_url);
          onUploadComplete(data.secure_url);
        } catch (error) {
          console.error('Upload failed:', error);
          setError('Upload failed. Please try again.');
        } finally {
          setUploading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onUploadComplete, publicId, maxSizeMB]
  );

  const handleDelete = async () => {
    if (publicId) {
      setUploading(true);
      try {
        await deleteFromCloudinary(publicId);
        setPreview(undefined);
        setPublicId(undefined);
        onUploadComplete('');
        setError(undefined);
      } catch (error) {
        console.error('Delete failed:', error);
        setError('Delete failed. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const displayError = externalError || error;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragActive ? 'border-teal-400 bg-[#08343C]/50' : 'border-teal-800 bg-[#08343C]/30'}
          ${displayError ? 'border-red-500' : ''}
          ${uploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
              <p className="mt-2 text-gray-300">Uploading...</p>
            </motion.div>
          ) : preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative inline-block"
            >
              <motion.img
                src={preview}
                alt="Preview"
                className="w-32 h-32 mx-auto rounded-lg object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                disabled={uploading}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Cloud className="w-8 h-8 text-teal-400" />
              <p className="mt-2 text-gray-300">
                Drag & drop or click to upload
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Max size: {maxSizeMB}MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {displayError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {displayError}
        </motion.p>
      )}
    </motion.div>
  );
};
