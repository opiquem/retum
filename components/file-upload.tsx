'use client';
import { UploadDropzone } from '@/lib/uploadThings';
import '@uploadthing/react/styles.css';
import { X } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

export const FileUpload: FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const fileType = value.split('.').pop();
  const isImageType = value && fileType !== 'pdf';

  if (isImageType) {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        console.error(err);
      }}
    />
  );
};
