"use client";
import React from "react";
import { Plus } from "lucide-react";
import useFileUploader from "@/hooks/use-fileuploader";
import { Progress } from "./ui/progress";

interface FileUploaderProps {
  onImageUrlsReceived: (imageUrls: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onImageUrlsReceived }) => {
  const uploadApiEndpoint = "/api/upload" as string;
  const { getRootProps, getInputProps, uploading, uploadProgress, removeFile } =
    useFileUploader({ uploadApiEndpoint, onImageUrlsReceived });

  return (
    <div
      role="button"
      {...getRootProps()}
      className={`w-20 h-20 cursor-pointer  rounded-[8px] bg-[#e5f6e8]`}
    >
      <div className="relative flex flex-col items-center justify-center h-full">
        <input {...getInputProps()} />
        <Plus className="h-6 w-6 !text-primary" />

        {uploading && (
          <div
            className="absolute px-1 inset-0 bg-white/50 backdrop-blur-sm 
        flex flex-col items-center justify-center"
          >
            <Progress value={uploadProgress} className="w-full" />
            <span className="text-xs text-black">{uploadProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
