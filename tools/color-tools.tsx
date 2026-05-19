"use client";

import React, { useState, useRef } from "react";
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
  Palette, Eye, Droplet, RefreshCw, Layers, Check, Copy, Image as ImageIcon
} from "lucide-react";

interface ColorToolsProps {
  toolId: string;
}

export default function ColorTools({ toolId }: ColorToolsProps) {
  switch (toolId) {
    case "color-picker":
      return <ColorPickerTool />;
    case "hex-rgb-converter":
      return <HEXRGBConverter />;
    case "rgb-hex-converter":
      return <RGBHEXConverter />;
    case "hex-hsl-converter":
      return <HEXHSLConverter />;
    case "hsl-hex-converter":
      return <HSLHEXConverter />;
    case "rgb-hsl-converter":
      return <RGBHSLConverter />;
    case "hsl-rgb-converter":
      return <HSLRGBConverter />;
    case "color-palette-generator":
      return <ColorPaletteGenerator />;
    case "contrast-ratio-checker":
      return <ContrastRatioChecker />;
    case "css-gradient-generator":
      return <CSSGradientGenerator />;
    case "color-blindness-simulator":
      return <ColorBlindnessSimulator />;
    case "image-color-extractor":
      return <ImageColorExtractor />;
    case "color-mixer-blender":
      return <ColorMixerBlender />;
    default:
      return <div className="text-center text-neutral-500 py-10">Color Tool Not Found</div>;
  }
}

// Copy Helper
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

// Helper Conversions
const hexToRgb = (hex: string) => {
  const match = hex.replace(/^#/, "").match(/.{1,2}/g);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[0], 16),
    g: parseInt(match[1], 16),
    b: parseInt(match[2], 16)
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100; l /= 100; h /= 360;
  let r = l, g = l, b = l;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// 97. Color Picker
function ColorPickerTool() {
  const [color, setColor] = useState("#a855f7");
  const { copied, copy } = useCopy();

  return (
    <div className="space-y-4 max-w-xs mx-auto text-center">
      <h2 className="text-lg font-semibold text-white text-left">Interactive Color Picker</h2>
      <div className="flex justify-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-24 h-24 border-0 rounded-full cursor-pointer bg-transparent"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono">
          <span className="text-neutral-500 font-bold">HEX:</span>
          <span className="text-purple-400 font-semibold">{color.toUpperCase()}</span>
          <button onClick={() => copy(color.toUpperCase())} className="text-neutral-500 hover:text-white">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// 98. HEX to RGB
function HEXRGBConverter() {
  const [hex, setHex] = useState("#a855f7");
  const [rgb, setRgb] = useState("rgb(168, 85, 247)");

  const convert = () => {
    const res = hexToRgb(hex);
    setRgb(`rgb(${res.r}, ${res.g}, ${res.b})`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HEX to RGB Converter</h2>
      <div className="flex gap-2">
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
        <button onClick={convert} className="px-5 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-lg">Convert</button>
      </div>
      {rgb && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400">
          {rgb}
        </div>
      )}
    </div>
  );
}

// 99. RGB to HEX
function RGBHEXConverter() {
  const [r, setR] = useState(168);
  const [g, setG] = useState(85);
  const [b, setB] = useState(247);
  const [hex, setHex] = useState("#a855f7");

  const convert = () => {
    setHex(rgbToHex(r, g, b));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">RGB to HEX Converter</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" min="0" max="255" value={r} onChange={(e) => setR(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" min="0" max="255" value={g} onChange={(e) => setG(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" min="0" max="255" value={b} onChange={(e) => setB(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
      </div>
      <button onClick={convert} className="w-full py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl">Convert</button>
      {hex && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400 uppercase">
          {hex}
        </div>
      )}
    </div>
  );
}

// 100. HEX to HSL
function HEXHSLConverter() {
  const [hex, setHex] = useState("#a855f7");
  const [hsl, setHsl] = useState("hsl(271, 91%, 65%)");

  const convert = () => {
    const rgb = hexToRgb(hex);
    const res = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHsl(`hsl(${res.h}, ${res.s}%, ${res.l}%)`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HEX to HSL Converter</h2>
      <div className="flex gap-2">
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
        <button onClick={convert} className="px-5 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-lg">Convert</button>
      </div>
      {hsl && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400">
          {hsl}
        </div>
      )}
    </div>
  );
}

// 101. HSL to HEX
function HSLHEXConverter() {
  const [h, setH] = useState(271);
  const [s, setS] = useState(91);
  const [l, setL] = useState(65);
  const [hex, setHex] = useState("#a855f7");

  const convert = () => {
    const rgb = hslToRgb(h, s, l);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HSL to HEX Converter</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" value={h} onChange={(e) => setH(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={s} onChange={(e) => setS(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={l} onChange={(e) => setL(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
      </div>
      <button onClick={convert} className="w-full py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl">Convert</button>
      {hex && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400 uppercase">
          {hex}
        </div>
      )}
    </div>
  );
}

// 102. RGB to HSL
function RGBHSLConverter() {
  const [r, setR] = useState(168);
  const [g, setG] = useState(85);
  const [b, setB] = useState(247);
  const [hsl, setHsl] = useState("hsl(271, 91%, 65%)");

  const convert = () => {
    const res = rgbToHsl(r, g, b);
    setHsl(`hsl(${res.h}, ${res.s}%, ${res.l}%)`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">RGB to HSL Converter</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" value={r} onChange={(e) => setR(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={g} onChange={(e) => setG(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={b} onChange={(e) => setB(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
      </div>
      <button onClick={convert} className="w-full py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl">Convert</button>
      {hsl && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400">
          {hsl}
        </div>
      )}
    </div>
  );
}

// 103. HSL to RGB
function HSLRGBConverter() {
  const [h, setH] = useState(271);
  const [s, setS] = useState(91);
  const [l, setL] = useState(65);
  const [rgb, setRgb] = useState("rgb(168, 85, 247)");

  const convert = () => {
    const res = hslToRgb(h, s, l);
    setRgb(`rgb(${res.r}, ${res.g}, ${res.b})`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HSL to RGB Converter</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" value={h} onChange={(e) => setH(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={s} onChange={(e) => setS(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
        <input type="number" value={l} onChange={(e) => setL(parseInt(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-center text-sm" />
      </div>
      <button onClick={convert} className="w-full py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl">Convert</button>
      {rgb && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-center text-purple-400">
          {rgb}
        </div>
      )}
    </div>
  );
}

// 104. Color Palette Generator
function ColorPaletteGenerator() {
  const [seed, setSeed] = useState("#a855f7");
  const [palette, setPalette] = useState<string[]>([]);

  const generate = () => {
    const rgb = hexToRgb(seed);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate monochromatic / analogous slots
    const colors = [
      seed,
      `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`,
      `hsl(${(hsl.h + 60) % 360}, ${hsl.s}%, ${hsl.l}%)`,
      `hsl(${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%)`, // complementary
      `hsl(${hsl.h}, ${hsl.s}%, ${Math.max(10, hsl.l - 20)}%)`
    ];
    setPalette(colors);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Color Palette Schemes Generator</h2>
      <div className="flex gap-2">
        <input type="color" value={seed} onChange={(e) => setSeed(e.target.value)} className="w-10 h-10 border-0 rounded cursor-pointer bg-transparent" />
        <button onClick={generate} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-lg text-white">Generate Palette</button>
      </div>

      {palette.length > 0 && (
        <div className="grid grid-cols-5 gap-2 pt-2">
          {palette.map((c, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <div className="h-14 rounded-lg border border-neutral-800" style={{ backgroundColor: c }} />
              <span className="text-[10px] text-neutral-400 font-mono block truncate">{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 105. Contrast Ratio Checker (WCAG checker)
function ContrastRatioChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#0a0a0a");
  const [ratio, setRatio] = useState<number | null>(null);

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculate = () => {
    const rgbFg = hexToRgb(fg);
    const rgbBg = hexToRgb(bg);

    const l1 = getLuminance(rgbFg.r, rgbFg.g, rgbFg.b);
    const l2 = getLuminance(rgbBg.r, rgbBg.g, rgbBg.b);

    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);

    const result = (brightest + 0.05) / (darkest + 0.05);
    setRatio(parseFloat(result.toFixed(2)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">WCAG Color Contrast Checker</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Text Color</label>
          <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
        <div className="space-y-1">
          <label>Background Color</label>
          <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl">Check Contrast</button>

      {ratio !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex justify-between items-center text-xs">
          <div>
            <span className="text-neutral-500">Contrast Ratio</span>
            <p className="text-xl font-extrabold text-white mt-1">{ratio}:1</p>
          </div>
          <div className="text-right">
            <span className={`font-bold uppercase tracking-wider block ${ratio >= 4.5 ? "text-emerald-400" : "text-red-400"}`}>
              WCAG AA: {ratio >= 4.5 ? "PASS" : "FAIL"}
            </span>
            <span className={`font-bold uppercase tracking-wider block mt-1 ${ratio >= 7 ? "text-emerald-400" : "text-red-400"}`}>
              WCAG AAA: {ratio >= 7 ? "PASS" : "FAIL"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// 106. CSS Gradient Generator
function CSSGradientGenerator() {
  const [col1, setCol1] = useState("#a855f7");
  const [col2, setCol2] = useState("#3b82f6");
  const [angle, setAngle] = useState(135);
  const { copied, copy } = useCopy();

  const code = `linear-gradient(${angle}deg, ${col1}, ${col2})`;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Gradient Designer</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400 items-center">
        <div>
          <label>Color A</label>
          <input type="color" value={col1} onChange={(e) => setCol1(e.target.value)} className="w-full h-8 bg-transparent border-0 cursor-pointer" />
        </div>
        <div>
          <label>Color B</label>
          <input type="color" value={col2} onChange={(e) => setCol2(e.target.value)} className="w-full h-8 bg-transparent border-0 cursor-pointer" />
        </div>
        <div className="space-y-1">
          <label>Angle ({angle}°)</label>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full bg-neutral-800 rounded accent-purple-500" />
        </div>
      </div>

      <div className="h-16 rounded-xl border border-neutral-800" style={{ background: code }} />

      <div className="flex justify-between items-center bg-neutral-900 border border-neutral-805 p-3 rounded-lg text-[10px] font-mono">
        <span className="text-purple-400 truncate max-w-[200px]">{code}</span>
        <button onClick={() => copy(code)} className="text-neutral-500 hover:text-white shrink-0">
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}

// 107. Color Blindness Simulator
function ColorBlindnessSimulator() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("protanopia");

  const handleFile = (files: File[]) => {
    setFile(files[0]);
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result as string);
    reader.readAsDataURL(files[0]);
  };

  const getFilterStyle = () => {
    // Basic approximate matrix style overlay values
    if (filterType === "protanopia") return "contrast(1.1) sepia(0.8) hue-rotate(-20deg)";
    if (filterType === "deuteranopia") return "contrast(1.1) sepia(0.7) hue-rotate(20deg)";
    if (filterType === "tritanopia") return "contrast(1.1) sepia(0.5) hue-rotate(180deg)";
    return "none";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Color Blindness Simulator</h2>
      {!file ? (
        <FileDropzone onFilesSelected={handleFile} accept={{ "image/*": [] }} maxFiles={1} description="Upload image to simulate color vision styles" />
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded-lg border border-neutral-850">
            <span className="text-xs text-white truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setImgSrc(null); }} className="text-xs text-neutral-500">Remove</button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["protanopia", "deuteranopia", "tritanopia"].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`py-1.5 rounded border text-xs font-semibold uppercase ${
                  filterType === t ? "bg-purple-600 border-purple-650 text-white" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {imgSrc && (
            <div className="flex justify-center bg-neutral-950 p-2.5 rounded border border-neutral-800">
              <img src={imgSrc} alt="color blind simulation" className="max-h-56 object-contain rounded" style={{ filter: getFilterStyle() }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 108. Image Color Extractor
function ImageColorExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleExtract = (files: File[]) => {
    setFile(files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx?.drawImage(img, 0, 0, 100, 100);

        const imgData = ctx?.getImageData(0, 0, 100, 100);
        if (!imgData) return;

        // Sample dominant color ranges
        const data = imgData.data;
        const sampled: string[] = [];
        for (let i = 0; i < data.length; i += 2000) {
          const hex = rgbToHex(data[i], data[i+1], data[i+2]);
          if (!sampled.includes(hex)) sampled.push(hex);
        }
        setColors(sampled.slice(0, 5));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Dominant Color Extractor</h2>
      {!file ? (
        <FileDropzone onFilesSelected={handleExtract} accept={{ "image/*": [] }} maxFiles={1} description="Upload image to extract color points" />
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded-lg border border-neutral-850">
            <span className="text-xs text-white truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setColors([]); }} className="text-xs text-neutral-500">Remove</button>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {colors.length > 0 && (
            <div className="space-y-2 border-t border-neutral-800 pt-4">
              <span className="text-xs text-neutral-400 block">Extracted Dominant Swatches</span>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((c, idx) => (
                  <div key={idx} className="space-y-1 text-center">
                    <div className="h-10 rounded border border-neutral-800" style={{ backgroundColor: c }} />
                    <span className="text-[10px] text-neutral-400 font-mono block truncate">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 109. Color Mixer / Blender
function ColorMixerBlender() {
  const [col1, setCol1] = useState("#a855f7");
  const [col2, setCol2] = useState("#3b82f6");
  const [ratio, setRatio] = useState(50); // percentage color1
  const [mixed, setMixed] = useState("#716cb6");

  const blend = () => {
    const rgb1 = hexToRgb(col1);
    const rgb2 = hexToRgb(col2);

    const f1 = ratio / 100;
    const f2 = 1 - f1;

    const r = Math.round(rgb1.r * f1 + rgb2.r * f2);
    const g = Math.round(rgb1.g * f1 + rgb2.g * f2);
    const b = Math.round(rgb1.b * f1 + rgb2.b * f2);

    setMixed(rgbToHex(r, g, b));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Color Mixer / Blender</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-400 block mb-1">Color A</label>
          <input type="color" value={col1} onChange={(e) => setCol1(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
        </div>
        <div>
          <label className="text-xs text-neutral-400 block mb-1">Color B</label>
          <input type="color" value={col2} onChange={(e) => setCol2(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-neutral-400 font-semibold flex justify-between">
          <span>Mix Ratio ({ratio}%)</span>
          <span>Color A ↔ Color B</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={ratio}
          onChange={(e) => setRatio(parseInt(e.target.value))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <button onClick={blend} className="w-full py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-xs rounded-xl text-white">Mix Colors</button>

      {mixed && (
        <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-neutral-800" style={{ backgroundColor: mixed }} />
            <span className="text-purple-400 font-semibold">{mixed.toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
