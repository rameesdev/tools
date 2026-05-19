"use client";

import React, { useCallback } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import { Upload, File, AlertCircle } from "lucide-react";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number; // In bytes
  description?: string;
  className?: string;
}

export default function FileDropzone({
  onFilesSelected,
  accept,
  maxFiles = 0, // 0 means unlimited
  maxSize = 50 * 1024 * 1024, // Default 50MB
  description = "Drag & drop files here, or click to select",
  className = "",
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
      if (rejectedFiles.length > 0) {
        // Handle rejection messages
        const errors = rejectedFiles.map((f) => {
          const fileError = f.errors[0];
          if (fileError?.code === "file-too-large") {
            return `${f.file.name} is too large (max size is ${(maxSize / (1024 * 1024)).toFixed(0)}MB).`;
          }
          if (fileError?.code === "file-invalid-type") {
            return `${f.file.name} has an invalid file type.`;
          }
          return `${f.file.name}: ${fileError?.message || "Invalid file"}`;
        });
        alert(errors.join("\n"));
      }
    },
    [onFilesSelected, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[220px] ${
        isDragActive
          ? "border-blue-500 bg-blue-500/5"
          : isDragReject
          ? "border-red-500 bg-red-500/5"
          : "border-neutral-800 bg-[#121212] hover:border-neutral-700 hover:bg-[#151515]"
      } ${className}`}
    >
      <input {...getInputProps()} />
      <div className="p-4 bg-neutral-900 rounded-full text-neutral-400 group-hover:text-white transition-colors mb-4 border border-neutral-800">
        {isDragReject ? (
          <AlertCircle className="w-8 h-8 text-red-500" />
        ) : (
          <Upload className="w-8 h-8 text-neutral-300" />
        )}
      </div>
      <p className="text-sm text-neutral-200 font-medium">
        {isDragActive ? "Drop files to upload" : description}
      </p>
      <p className="text-xs text-neutral-500 mt-2">
        Processing is done 100% in your browser. Files never upload to any server.
      </p>
    </div>
  );
}
