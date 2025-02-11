import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface MediaPreviewProps {
  file?: File | string;
  type?: "image" | "video" | "pdf";
  onRemove?: () => void;
  className?: string;
}

const MediaPreview = ({
  file,
  type,
  onRemove,
  className = "",
}: MediaPreviewProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      if (typeof file === "string") {
        setUrl(file);
      } else {
        setUrl(URL.createObjectURL(file));
      }
    }
    return () => {
      if (file instanceof File) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  if (!file || !url) return null;

  return (
    <div className={`relative group ${className}`}>
      {type === "image" && (
        <img
          src={url}
          alt="Preview"
          className="w-full h-full object-contain rounded-lg"
        />
      )}

      {type === "video" && (
        <video
          src={url}
          controls
          className="w-full h-full object-contain rounded-lg"
        />
      )}

      {type === "pdf" && (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full"
            />
          </Document>

          {numPages > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow">
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {pageNumber} / {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(1)}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default MediaPreview;
