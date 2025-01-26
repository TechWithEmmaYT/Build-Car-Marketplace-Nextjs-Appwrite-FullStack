"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios, { AxiosProgressEvent } from "axios";
import { toast } from "./use-toast";

interface UseFileUploaderProps {
  uploadApiEndpoint: string;
  onImageUrlsReceived: (imageUrls: string[]) => void;
}

interface UseFileUploaderResult {
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: ReturnType<typeof useDropzone>["isDragActive"];
  files: File[];
  uploading: boolean;
  uploadProgress: number;
  removeFile: (fileToRemove: File) => void;
}

const useFileUploader = ({
  uploadApiEndpoint,
  onImageUrlsReceived,
}: UseFileUploaderProps): UseFileUploaderResult => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFilesToApi = useCallback(
    async (filesToUpload: File[]) => {
      setUploading(true);
      setUploadProgress(0);
      const imageUrls: string[] = [];
      for (const file of filesToUpload) {
        try {
          const formData = new FormData();
          formData.append("image", file);
          const response = await axios.post(uploadApiEndpoint, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const progress = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              console.log(`Upload progress for ${file.name}: ${progress}%`);
              setUploadProgress(progress);
            },
          });
          if (response.status !== 200) {
            console.log(
              `Upload failed for ${file.name}: Status ${response.status}`
            );
            continue;
          }
          const imageUrl = response.data?.imageUrl;
          if (!imageUrl) {
            console.error(`API response missing imageUrl for ${file.name}`);
            continue;
          }
          imageUrls.push(imageUrl);
        } catch (error) {
          console.log(`Error uploading ${file.name}`, error);
          toast({
            title: "Upload failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      }
      setUploading(false);
      onImageUrlsReceived(imageUrls);
    },
    [uploadApiEndpoint, onImageUrlsReceived]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      await uploadFilesToApi(acceptedFiles);
    },
    [uploadFilesToApi]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
    maxFiles: 10,
  });

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove)
    );
  }, []);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    uploading,
    uploadProgress,
    removeFile,
  };
};

export default useFileUploader;
