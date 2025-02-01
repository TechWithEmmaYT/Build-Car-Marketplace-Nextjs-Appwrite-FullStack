"use client";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
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
  fileRejections: ReturnType<typeof useDropzone>["fileRejections"];
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
      try {
        const formData = new FormData();

        // Append all files to the FormData object
        filesToUpload.forEach((file, index) => {
          formData.append(`files`, file); // Use `files` as the key
        });

        const response = await axios.post(uploadApiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        });

        if (response.status !== 200) {
          console.log(`Upload failed: Status ${response.status}`);
          toast({
            title: "Upload failed",
            description: "Please try again",
            variant: "destructive",
          });
          return;
        }
        // Assuming the API returns an array of image URLs
        const imageUrls = response.data?.files.map((file: any) => file.url);
        console.log(imageUrls);

        if (!imageUrls || !Array.isArray(imageUrls)) {
          console.error("API response missing or invalid imageUrls");
          toast({
            title: "Upload failed",
            description: "Invalid response from server",
            variant: "destructive",
          });
          return;
        }
        onImageUrlsReceived(imageUrls);
        setFiles([]);
      } catch (error) {
        console.log("Error uploading files", error);
        toast({
          title: "Upload failed",
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [uploadApiEndpoint, onImageUrlsReceived]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      if (rejectedFiles.length > 0) {
        toast({
          title: "File type not supported",
          description: "Please upload a valid image file",
          variant: "destructive",
        });
        return;
      }
      await uploadFilesToApi(acceptedFiles);
    },
    [uploadFilesToApi]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        // "image/*": [".png", ".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/webp": [".webp"],
      },
      maxFiles: 7,
      maxSize: 10 * 1024 * 1024, // 10MB
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
    fileRejections,
  };
};

export default useFileUploader;

// const uploadFilesToApi = useCallback(
//   async (filesToUpload: File[]) => {
//     setUploading(true);
//     setUploadProgress(0);
//     const imageUrls: string[] = [];
//     for (const file of filesToUpload) {
//       try {
//         const formData = new FormData();
//         formData.append("image", file);
//         const response = await axios.post(uploadApiEndpoint, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//             const progress = progressEvent.total
//               ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
//               : 0;
//             console.log(`Upload progress for ${file.name}: ${progress}%`);
//             setUploadProgress(progress);
//           },
//         });
//         if (response.status !== 200) {
//           console.log(
//             `Upload failed for ${file.name}: Status ${response.status}`
//           );
//           continue;
//         }
//         const imageUrl = response.data?.imageUrl;
//         if (!imageUrl) {
//           console.error(`API response missing imageUrl for ${file.name}`);
//           continue;
//         }
//         imageUrls.push(imageUrl);
//       } catch (error) {
//         console.log(`Error uploading ${file.name}`, error);
//         toast({
//           title: "Upload failed",
//           description: "Please try again",
//           variant: "destructive",
//         });
//       }
//     }
//     setUploading(false);
//     onImageUrlsReceived(imageUrls);
//   },
//   [uploadApiEndpoint, onImageUrlsReceived]
// );
