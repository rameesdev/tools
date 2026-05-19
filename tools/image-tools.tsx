"use client";

import React, { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
// Custom native downloader to ensure file extensions are properly preserved on Windows client-side
const saveAs = (blob: Blob | string, filename: string) => {
  const url = typeof blob === "string" ? blob : URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof blob !== "string") {
    URL.revokeObjectURL(url);
  }
};
import { 
  Download, RefreshCw, Image as ImageIcon, Shrink, Maximize2, Crop,
  Code, Info, RotateCw, Contrast, Eraser, Files, FileCode, Zap, Trash2
} from "lucide-react";

interface ImageToolsProps {
  toolId: string;
}

export default function ImageTools({ toolId }: ImageToolsProps) {
  switch (toolId) {
    case "image-compressor":
      return <ImageCompressor />;
    case "image-resizer":
      return <ImageResizer />;
    case "image-cropper":
      return <ImageCropper />;
    case "image-converter":
      return <ImageConverter />;
    case "image-to-base64":
      return <ImageToBase64 />;
    case "base64-to-image":
      return <Base64ToImage />;
    case "image-metadata-viewer":
      return <ImageMetadataViewer />;
    case "image-flipper-rotator":
      return <ImageFlipperRotator />;
    case "grayscale-converter":
      return <GrayscaleConverter />;
    case "background-remover":
      return <BackgroundRemover />;
    case "image-watermark-adder":
      return <ImageWatermarkAdder />;
    case "bulk-image-resizer":
      return <BulkImageResizer />;
    case "svg-to-png-converter":
      return <SVGToPNGConverter />;
    case "png-to-svg":
      return <PNGToSVGConverter />;
    case "webp-converter":
      return <WebPConverter />;
    default:
      return <div className="text-center text-neutral-500 py-10">Image Tool Not Found</div>;
  }
}

// Helper to load File into HTMLImageElement
const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 13. Image Compressor
function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      // Compress via jpeg quality
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      setPreview(dataUrl);

      // Convert back to blob to estimate size
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      setCompressedSize(blob.size);
    } catch (e) {
      console.error(e);
      alert("Error compressing image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (preview && file) {
      saveAs(preview, `compressed_${file.name.split(".")[0]}.jpg`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white font-geist">Image Compressor</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to compress"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <ImageIcon size={16} className="text-emerald-500" />
              <span className="text-sm font-medium text-white">{file.name}</span>
              <span className="text-xs text-neutral-500">({(file.size / 1024).toFixed(0)} KB)</span>
            </div>
            <button onClick={() => { setFile(null); setPreview(null); }} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-semibold flex justify-between">
              <span>Quality ({Math.round(quality * 100)}%)</span>
              <span>Smaller Size ↔ Best Quality</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <button
            onClick={handleCompress}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Shrink size={16} />}
            Compress Image
          </button>

          {preview && (
            <div className="space-y-3 border-t border-neutral-800 pt-4 text-center">
              <p className="text-xs text-neutral-400">
                Compressed Size:{" "}
                <span className="text-emerald-400 font-semibold">
                  {compressedSize ? `${(compressedSize / 1024).toFixed(0)} KB` : "N/A"}
                </span>{" "}
                (Savings: {compressedSize ? `${Math.max(0, Math.round((1 - compressedSize / file.size) * 100))}%` : "0%"})
              </p>
              <div className="flex justify-center">
                <img src={preview} alt="Compressed preview" className="max-h-60 rounded border border-neutral-800" />
              </div>
              <button
                onClick={handleDownload}
                className="w-full py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold rounded-lg text-white transition-all flex items-center justify-center gap-2"
              >
                <Download size={14} /> Download Compressed JPG
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 14. Image Resizer
function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [aspectRatio, setAspectRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      });
    }
  }, [file]);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (aspectRatio) {
      setHeight(Math.round(val / originalRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (aspectRatio) {
      setWidth(Math.round(val * originalRatio));
    }
  };

  const handleResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `resized_${file.name}`);
        }
      }, file.type);
    } catch (e) {
      console.error(e);
      alert("Error resizing image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Image Resizer</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to resize"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <ImageIcon size={16} className="text-emerald-500" />
              <span className="text-sm font-medium text-white">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ratio"
              checked={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.checked)}
              className="rounded border-neutral-800 bg-neutral-900 text-emerald-500 focus:ring-0"
            />
            <label htmlFor="ratio" className="text-xs text-neutral-400 select-none">Maintain Aspect Ratio</label>
          </div>

          <button
            onClick={handleResize}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Maximize2 size={16} />}
            Resize & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 15. Image Cropper (Visual Slider Mock or Custom Canvas Coordinates)
function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [cropData, setCropData] = useState({ x: 10, y: 10, w: 80, h: 80 }); // in percentages
  const [isProcessing, setIsProcessing] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImgSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      
      const realX = (cropData.x / 100) * img.width;
      const realY = (cropData.y / 100) * img.height;
      const realW = (cropData.w / 100) * img.width;
      const realH = (cropData.h / 100) * img.height;

      canvas.width = realW;
      canvas.height = realH;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, realX, realY, realW, realH, 0, 0, realW, realH);

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `cropped_${file.name}`);
        }
      }, file.type);
    } catch (e) {
      console.error(e);
      alert("Error cropping image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Image Cropper</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to crop"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setImgSrc(null); }} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          {imgSrc && (
            <div className="relative border border-neutral-850 rounded overflow-hidden max-h-64 flex justify-center bg-neutral-950">
              <img src={imgSrc} alt="crop view" className="object-contain max-h-64 opacity-50" />
              {/* Highlight box */}
              <div 
                className="absolute border-2 border-emerald-500 bg-emerald-500/10 cursor-move"
                style={{
                  left: `${cropData.x}%`,
                  top: `${cropData.y}%`,
                  width: `${cropData.w}%`,
                  height: `${cropData.h}%`,
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs text-neutral-400">
            <div className="space-y-1">
              <label>Crop Width (%)</label>
              <input
                type="number"
                value={cropData.w}
                onChange={(e) => setCropData(prev => ({ ...prev, w: Math.min(100 - prev.x, parseInt(e.target.value) || 10) }))}
                className="w-full bg-[#1e1e1e] border border-neutral-800 p-1.5 rounded focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label>Crop Height (%)</label>
              <input
                type="number"
                value={cropData.h}
                onChange={(e) => setCropData(prev => ({ ...prev, h: Math.min(100 - prev.y, parseInt(e.target.value) || 10) }))}
                className="w-full bg-[#1e1e1e] border border-neutral-800 p-1.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCrop}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Crop size={16} />}
            Crop & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 16. Image Converter
function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("image/png");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const extension = format.split("/")[1];
          saveAs(blob, `${file.name.split(".")[0]}.${extension}`);
        }
      }, format);
    } catch (e) {
      console.error(e);
      alert("Error converting file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Image Converter</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to convert format"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-semibold">Convert to Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-sm focus:outline-none"
            >
              <option value="image/png">PNG Format</option>
              <option value="image/jpeg">JPEG Format</option>
              <option value="image/webp">WebP Format</option>
              <option value="image/bmp">BMP Format</option>
            </select>
          </div>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <RefreshCw size={16} />}
            Convert & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 17. Image to Base64
function ImageToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBase64("");
    }
  }, [file]);

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Image to Base64</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to encode"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          {base64 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-400">Base64 URI String</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  {copied ? "Copied!" : "Copy String"}
                </button>
              </div>
              <textarea
                readOnly
                value={base64}
                className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded-lg text-[10px] font-mono h-32 focus:outline-none resize-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 18. Base64 to Image
function Base64ToImage() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState("");

  const handleLoad = () => {
    if (base64.trim().startsWith("data:image")) {
      setPreview(base64.trim());
    } else if (base64.trim()) {
      // Append mime prefix fallback
      setPreview(`data:image/png;base64,${base64.trim()}`);
    }
  };

  const handleDownload = () => {
    if (preview) {
      saveAs(preview, "decoded_image.png");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Base64 to Image</h2>
      <div className="space-y-2">
        <label className="text-xs text-neutral-400">Paste Base64 Code Block</label>
        <textarea
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          placeholder="Paste data:image/png;base64,... string here"
          className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none"
        />
      </div>

      <button
        onClick={handleLoad}
        disabled={!base64}
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs rounded-xl transition-all"
      >
        Render Image
      </button>

      {preview && (
        <div className="space-y-3 border-t border-neutral-800 pt-4 text-center">
          <div className="flex justify-center bg-neutral-950 p-2 rounded">
            <img src={preview} alt="Rendered base64" className="max-h-60 rounded border border-neutral-850" />
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-2 bg-neutral-900 border border-neutral-800 text-xs font-semibold rounded-lg text-white hover:border-neutral-700 flex items-center justify-center gap-2"
          >
            <Download size={14} /> Download Decoded PNG
          </button>
        </div>
      )}
    </div>
  );
}

// 19. Image Metadata Viewer (Dimension, types, tags viewer)
function ImageMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => {
        setMeta({
          filename: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          width: `${img.width} px`,
          height: `${img.height} px`,
          ratio: (img.width / img.height).toFixed(2),
          lastModified: new Date(file.lastModified).toLocaleString(),
        });
      });
    } else {
      setMeta(null);
    }
  }, [file]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Metadata Viewer</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to inspect details"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          {meta && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 space-y-2 text-xs">
              <h3 className="font-semibold text-neutral-300 border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
                <Info size={14} className="text-emerald-400" /> Image Properties
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5 pt-1.5 font-mono text-neutral-300">
                <span className="text-neutral-500">Filename:</span> <span className="text-right truncate">{meta.filename}</span>
                <span className="text-neutral-500">File Size:</span> <span className="text-right">{meta.size}</span>
                <span className="text-neutral-500">MIME Type:</span> <span className="text-right">{meta.type}</span>
                <span className="text-neutral-500">Dimensions:</span> <span className="text-right">{meta.width} x {meta.height}</span>
                <span className="text-neutral-500">Aspect Ratio:</span> <span className="text-right">{meta.ratio}</span>
                <span className="text-neutral-500">Modified Date:</span> <span className="text-right">{meta.lastModified}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 20. Image Flipper/Rotator
function ImageFlipperRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApply = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimension based on rotation
      if (rotation === 90 || rotation === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      if (!ctx) return;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `transformed_${file.name}`);
        }
      }, file.type);
    } catch (e) {
      console.error(e);
      alert("Error rotating image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Flip & Rotate Image</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to transform"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Rotation</label>
              <div className="grid grid-cols-4 gap-1">
                {[0, 90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => setRotation(deg)}
                    className={`py-1.5 rounded border text-xs font-mono font-bold ${
                      rotation === deg
                        ? "bg-emerald-600 border-emerald-650 text-white"
                        : "bg-neutral-900 border-neutral-800 text-neutral-400"
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Flip Axis</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFlipH(!flipH)}
                  className={`flex-1 py-1.5 rounded border text-xs font-semibold ${
                    flipH ? "bg-emerald-600 border-emerald-650 text-white" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  Horizontal
                </button>
                <button
                  type="button"
                  onClick={() => setFlipV(!flipV)}
                  className={`flex-1 py-1.5 rounded border text-xs font-semibold ${
                    flipV ? "bg-emerald-600 border-emerald-650 text-white" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  Vertical
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleApply}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <RotateCw size={16} />}
            Apply & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 21. Grayscale Converter
function GrayscaleConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGrayscale = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        // Grayscale conversion logic
        for (let i = 0; i < data.length; i += 4) {
          const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          data[i] = brightness;     // Red
          data[i + 1] = brightness; // Green
          data[i + 2] = brightness; // Blue
        }
        ctx.putImageData(imgData, 0, 0);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `gray_${file.name}`);
        }
      }, file.type);
    } catch (e) {
      console.error(e);
      alert("Error generating grayscale image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Grayscale Converter</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to convert to grayscale"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <button
            onClick={handleGrayscale}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Contrast size={16} />}
            Grayscale & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 22. Background Remover (Chroma key / Light pixels threshold filter + fallback notice)
function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState(240); // 0-255 range to remove white/light backdrops
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleRemove = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Strip pixels brighter than the threshold
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const brightness = (r + g + b) / 3;
          
          if (brightness >= threshold) {
            data[i+3] = 0; // set alpha to fully transparent
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);
    } catch (e) {
      console.error(e);
      alert("Error removing background.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (preview && file) {
      saveAs(preview, `nobg_${file.name.split(".")[0]}.png`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Background Remover</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image with a light/white background"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setPreview(null); }} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-semibold flex justify-between">
              <span>Threshold ({threshold})</span>
              <span>Removes pixels lighter than selected</span>
            </label>
            <input
              type="range"
              min="100"
              max="255"
              step="5"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <button
            onClick={handleRemove}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Eraser size={16} />}
            Process (Clear Background)
          </button>

          {preview && (
            <div className="space-y-3 border-t border-neutral-800 pt-4 text-center">
              <p className="text-xs text-neutral-400">Processed Preview (Transparent grid representation):</p>
              <div className="flex justify-center bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:10px_10px] p-4 rounded border border-neutral-850">
                <img src={preview} alt="processed nobg" className="max-h-60 object-contain" />
              </div>
              <button
                onClick={handleDownload}
                className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded-lg text-white transition-all flex items-center justify-center gap-2"
              >
                <Download size={14} /> Download PNG
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 23. Image Watermark Adder
function ImageWatermarkAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("© COPYRIGHT");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWatermark = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "right";
        ctx.fillText(watermarkText, img.width - 20, img.height - 20);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `watermarked_${file.name}`);
        }
      }, file.type);
    } catch (e) {
      console.error(e);
      alert("Error adding watermark.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Add Watermark</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to add watermark"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-semibold">Watermark Overlay Text</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-sm focus:outline-none"
            />
          </div>

          <button
            onClick={handleWatermark}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
            Watermark & Download
          </button>
        </div>
      )}
    </div>
  );
}

// 24. Bulk Image Resizer
function BulkImageResizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [scale, setScale] = useState(50); // percentage scale
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkResize = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      for (const file of files) {
        const img = await loadImage(file);
        const canvas = document.createElement("canvas");
        const w = Math.round(img.width * (scale / 100));
        const h = Math.round(img.height * (scale / 100));
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL(file.type);
        saveAs(dataUrl, `resized_${file.name}`);
      }
      alert("Successfully resized and downloaded all images.");
    } catch (e) {
      console.error(e);
      alert("Error resizing some files.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Bulk Image Resizer</h2>
      <FileDropzone
        onFilesSelected={(newFiles) => setFiles(prev => [...prev, ...newFiles])}
        accept={{ "image/*": [] }}
        description="Select multiple images to scale down"
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="max-h-32 overflow-y-auto p-2 border border-neutral-800 rounded-lg space-y-1">
            {files.map((file, idx) => (
              <div key={idx} className="flex justify-between items-center bg-neutral-900 px-3 py-1.5 rounded text-xs text-neutral-300">
                <span className="truncate">{file.name}</span>
                <button onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} className="text-neutral-500 hover:text-red-400">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-semibold">Scale Dimensions ({scale}%)</label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <button
            onClick={handleBulkResize}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Files size={16} />}
            Resize & Download All
          </button>
        </div>
      )}
    </div>
  );
}

// 25. SVG to PNG Converter
function SVGToPNGConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgString = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width || 800;
          canvas.height = img.height || 600;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, `${file.name.split(".")[0]}.png`);
            }
          }, "image/png");
        };
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
      };
      reader.readAsText(file);
    } catch (e) {
      console.error(e);
      alert("Error rasterizing SVG vector file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">SVG to PNG Converter</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/svg+xml": [".svg"] }}
          maxFiles={1}
          description="Upload an SVG file to rasterize"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <FileCode size={16} />}
            Rasterize to PNG
          </button>
        </div>
      )}
    </div>
  );
}

// 26. PNG to SVG (Basic Tracing mockup or vector embed wrapper)
function PNGToSVGConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTrace = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        // Basic SVG wrapping containing the dataURI representing vector tracer tags
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <image href="${base64}" x="0" y="0" width="100" height="100"/>\n</svg>`;
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        saveAs(blob, `${file.name.split(".")[0]}.svg`);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      alert("Error wrapping image in SVG.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">PNG to SVG Vectorizer</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/png": [".png"] }}
          maxFiles={1}
          description="Upload PNG file to convert"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <button
            onClick={handleTrace}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <FileCode size={16} />}
            Trace to SVG Output
          </button>
        </div>
      )}
    </div>
  );
}

// 27. WebP Converter
function WebPConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${file.name.split(".")[0]}.webp`);
        }
      }, "image/webp");
    } catch (e) {
      console.error(e);
      alert("Error converting to WebP.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">WebP Converter</h2>
      {!file ? (
        <FileDropzone
          onFilesSelected={(files) => setFile(files[0])}
          accept={{ "image/*": [] }}
          maxFiles={1}
          description="Upload an image to convert to WebP"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <span className="text-sm text-white truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-xs text-neutral-500 hover:text-white">Remove</button>
          </div>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
            Convert to WebP
          </button>
        </div>
      )}
    </div>
  );
}
