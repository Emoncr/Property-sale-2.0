"use client";

import React, { useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useControllableState } from "@/hooks/useControllableState";
import { toast } from "sonner";
import heic2any from "heic2any";
import imageCompression from "browser-image-compression";
import { X } from "lucide-react";

export function FileUploader(props) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    accept = { "image/*": [], "image/heic": [], },
    maxSize = 1024 * 1024 * 10, // 10MB
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });
  const [isConverting, setIsConverting] = useState(false);

  const placeholderForHeic =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsqQcAAZ0BDTSBuAQAAAAASUVORK5CYII=";

  const onDrop = React.useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error("Cannot upload more than 1 file at a time");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      // Immediately add files to the list with 0 progress
      const newFiles = acceptedFiles.map((file) => ({
        ...file,
        preview:
          file.type === "image/heic"
            ? placeholderForHeic
            : URL.createObjectURL(file),
      }));
      setFiles((prev) => (prev ? [...prev, ...newFiles] : newFiles));

      setIsConverting(true);

      const processFile = async (file) => {
        let processedFile = file;

        // Convert HEIC to JPEG if necessary
        if (file.type === "image/heic") {
          try {
            const blob = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.8,
            });
            processedFile = new File(
              [blob],
              file.name.replace(/\.heic$/i, ".jpg"),
              {
                type: "image/jpeg",
                lastModified: new Date().getTime(),
              }
            );
          } catch (error) {
            console.error("Error converting HEIC file:", error);
            toast.error(`Failed to convert ${file.name}`);
            return null;
          }
        }

        // Compress and convert to WebP
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: "image/webp",
          };

          const compressedFile = await imageCompression(processedFile, options);
          const finalFile = new File(
            [compressedFile],
            file.name.replace(/\.[^/.]+$/, ".webp"),
            {
              type: "image/webp",
              lastModified: new Date().getTime(),
            }
          );

          return Object.assign(finalFile, {
            preview: URL.createObjectURL(finalFile),
          });
        } catch (error) {
          console.error("Error compressing and converting file:", error);
          toast.error(`Failed to process ${file.name}`);
          return null;
        }
      };

      try {
        const processedFiles = await Promise.all(
          acceptedFiles.map(processFile)
        );
        const newFiles = processedFiles.filter((file) => file !== null);

        let updatedFiles;
        if (maxFiles === 1) {
          updatedFiles = newFiles[0];
        } else {
          updatedFiles = files ? [...files, ...newFiles] : newFiles;
        }

        setFiles(updatedFiles);
        onUpload?.(updatedFiles);

        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ file }) => {
            toast.error(`File ${file.name} was rejected`);
          });
        }
      } finally {
        setIsConverting(false);
      }
    },
    [files, maxFiles, multiple, setFiles, onUpload]
  );

  function onRemove(index) {
    if (!files) return;
    if (!Array.isArray(files) && maxFiles === 1 && typeof files === "object") {
      setFiles(null);
      onValueChange?.(null);
    } else if (!index && maxFiles === 1) {
      setFiles(null);
      onValueChange?.(null);
    } else {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onValueChange?.(newFiles);
    }
  }

  React.useEffect(() => {
    return () => {
      if (!files) return;
      Array.isArray(files) &&
        files.forEach((file) => {
          if (isFileWithPreview(file)) {
            URL.revokeObjectURL(file.preview);
          }
        });
    };
  }, [files]);
  const isDisabled =
    disabled ||
    (files && (Array.isArray(files) ? files.length : 1) >= maxFiles);

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled || isConverting}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "group relative grid h-72 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-primary",
              (isDisabled || isConverting) && "pointer-events-none opacity-60",
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full ">
                  <div className="flex items-center justify-center">
                    <Image
                      width={42}
                      height={42}
                      src={"/icons/upload.png"}
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="space-y-px">
                  <p className="text-sm sm:text-base font-normal text-[#0B0B0B]">
                    {"Drop the files here"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full ">
                  <div className="flex items-center justify-center">
                    <Image
                      width={42}
                      height={42}
                      src={"/icons/upload.png"}
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="space-y-px">
                  <p className="text-sm sm:text-base font-normal text-[#0B0B0B]">
                    {"Drag your file to start uploading"}
                  </p>
                </div>
                <div className="my-1 flex items-center justify-center gap-2">
                  <div className="w-10 sm:w-20 border border-border"></div>
                  <p className="text-[#6D6D6D] font-bold text-xs">OR</p>
                  <div className="w-10 sm:w-20 border border-border"></div>
                </div>
                <div>
                  <Button
                    type="button"
                    className="inline-block  border-primary border-2 font-gilroy font-bold text-primary hover:text-primary/90 text-sm py-1 px-3 rounded-lg cursor-pointer transition bg-transparent hover:bg-transparent"
                  >
                    Browse files
                  </Button>
                </div>
                <div>
                  <p className="text-[#6D6D6D] font-bold text-xs">
                    {"Supports .jpg, .png, and .heic"}
                  </p>
                  <p className="text-[#6D6D6D] font-bold text-[10px] mt-0.5">
                    {`( max size: 10MB per file, ${maxFiles > 1 ? `max ${maxFiles} files` : "max 1 file"
                      } )`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {Array.isArray(files) && files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="max-h-48 space-y-4">
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                isConverting={isConverting}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}

      {maxFiles === 1 &&
        files &&
        !Array.isArray(files) &&
        typeof files === "object" &&
        isFileWithPreview(files) && (
          <ScrollArea className="h-fit w-full px-3">
            <div className="max-h-48 space-y-4">
              <FileCard
                file={files}
                onRemove={() => onRemove(null)}
                isConverting={isConverting}
              />
            </div>
          </ScrollArea>
        )}

      {maxFiles === 1 &&
        files &&
        !Array.isArray(files) &&
        typeof files === "string" && (
          <div className="flex flex-1 space-x-4 relative max-w-[600px]">
            <Image
              src={files}
              alt={files.name}
              width={62}
              height={62}
              loading="lazy"
              className="aspect-square shrink-0 rounded-md object-cover"
            />
            <div className="flex items-center gap-2 absolute right-2 top-2 ">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => onRemove(null)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}

function FileCard({ file, isConverting, onRemove }) {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex flex-1 space-x-4">
        {isFileWithPreview(file) ? (
          <Image
            src={file.preview}
            alt={file.name}
            width={120}
            height={120}
            loading="lazy"
            className="aspect-square shrink-0 rounded-md object-cover"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsqQcAAZ0BDTSBuAQAAAAASUVORK5CYII="
          />
        ) : null}
        <div className="flex w-full flex-col gap-2 justify-center">
          <div className="space-y-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
          </div>
          <p
            className={`line-clamp-1 text-xs font-gilroy ${isConverting
                ? "text-gray-400 font-medium"
                : "text-green-600 font-bold"
              }`}
          >
            {isConverting ? "Compressing..." : "Completed"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string";
}
