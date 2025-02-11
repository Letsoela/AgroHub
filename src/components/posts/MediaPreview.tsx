import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

interface MediaPreviewProps {
  file: File;
  onRemove: () => void;
}

const MediaPreview = ({ file, onRemove }: MediaPreviewProps) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  const isPDF = file.type === "application/pdf";
  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="relative group">
      {isImage && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      {isVideo && (
        <video
          src={URL.createObjectURL(file)}
          className="w-full h-48 object-cover rounded-lg"
          controls
        />
      )}

      {isPDF && (
        <div className="w-full h-48 bg-gray-50 rounded-lg overflow-hidden">
          <Document
            file={URL.createObjectURL(file)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              width={200}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          {numPages > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 p-1 rounded">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                {pageNumber} / {numPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setPageNumber(Math.min(numPages, pageNumber + 1))
                }
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MediaPreview;
