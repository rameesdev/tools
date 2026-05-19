"use client";

import React, { useState, useRef } from "react";
import CryptoJS from "crypto-js";
import QRCode from "qrcode";
import jsQR from "jsqr";
import bcrypt from "bcryptjs";
import { 
  Hash, ShieldCheck, Link2, Key, HelpCircle, ShieldAlert, 
  Lock, QrCode, Scan, Fingerprint 
} from "lucide-react";

interface SecurityToolsProps {
  toolId: string;
}

export default function SecurityTools({ toolId }: SecurityToolsProps) {
  switch (toolId) {
    case "hash-generator":
      return <HashGenerator />;
    case "base64-encoder-decoder":
      return <Base64EncoderDecoder />;
    case "url-encoder-decoder":
      return <URLEncoderDecoder />;
    case "jwt-decoder":
      return <JWTDecoder />;
    case "html-entity-encoder-decoder":
      return <HTMLEntityEncoderDecoder />;
    case "password-strength-checker":
      return <PasswordStrengthChecker />;
    case "text-encrypter-decrypter":
      return <TextEncrypterDecrypter />;
    case "qr-code-generator":
      return <QRCodeGenerator />;
    case "qr-code-reader":
      return <QRCodeReader />;
    case "bcrypt-hash-generator":
      return <BcryptHashGenerator />;
    case "hmac-generator":
      return <HMACGenerator />;
    default:
      return <div className="text-center text-neutral-500 py-10">Security Tool Not Found</div>;
  }
}

// 73. Hash Generator
function HashGenerator() {
  const [text, setText] = useState("Hello World");
  const [hashes, setHases] = useState<any>({ md5: "", sha1: "", sha256: "", sha512: "" });

  const generate = () => {
    setHases({
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Cryptographic Hash Generator</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
      <button onClick={generate} className="w-full py-2 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-xl">Compute Hashes</button>

      {hashes.md5 && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg space-y-2 text-xs font-mono text-neutral-300">
          <div className="break-all"><span className="text-neutral-500 font-bold">MD5:</span> {hashes.md5}</div>
          <div className="break-all"><span className="text-neutral-500 font-bold">SHA-1:</span> {hashes.sha1}</div>
          <div className="break-all"><span className="text-neutral-500 font-bold">SHA-256:</span> {hashes.sha256}</div>
          <div className="break-all"><span className="text-neutral-500 font-bold">SHA-512:</span> {hashes.sha512}</div>
        </div>
      )}
    </div>
  );
}

// 74. Base64 Encoder/Decoder
function Base64EncoderDecoder() {
  const [input, setInput] = useState("Hello standard encode");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input));
      setOutput(encoded);
    } catch (e) {
      alert("Error encoding string.");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8);
      setOutput(decoded);
    } catch (e) {
      alert("Invalid base64 string.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Base64 Encoder / Decoder</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={handleEncode} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Encode</button>
        <button onClick={handleDecode} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Decode</button>
      </div>
      {output && (
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
      )}
    </div>
  );
}

// 75. URL Encoder/Decoder
function URLEncoderDecoder() {
  const [input, setInput] = useState("name=John Doe&query=cats & dogs");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      alert("Invalid encoded URL.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">URL Percent Encoder / Decoder</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={handleEncode} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Encode</button>
        <button onClick={handleDecode} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Decode</button>
      </div>
      {output && (
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
      )}
    </div>
  );
}

// 76. JWT Decoder
function JWTDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  const decodeJWT = () => {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) {
        alert("Invalid JWT format (must have 3 parts separated by dots).");
        return;
      }
      const rawHeader = CryptoJS.enc.Base64.parse(parts[0]).toString(CryptoJS.enc.Utf8);
      const rawPayload = CryptoJS.enc.Base64.parse(parts[1]).toString(CryptoJS.enc.Utf8);

      setHeader(JSON.stringify(JSON.parse(rawHeader), null, 2));
      setPayload(JSON.stringify(JSON.parse(rawPayload), null, 2));
    } catch (e) {
      alert("Failed decoding token segments.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JWT Decoder</h2>
      <textarea value={jwt} onChange={(e) => setJwt(e.target.value)} placeholder="Paste JWT token here..." className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
      <button onClick={decodeJWT} className="w-full py-2 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-xl">Decode Token</button>

      {payload && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-neutral-450 block mb-1">Header</span>
            <textarea readOnly value={header} className="w-full bg-neutral-950 border border-neutral-800 p-2 rounded text-xs font-mono h-32 resize-none" />
          </div>
          <div>
            <span className="text-xs text-neutral-450 block mb-1">Payload</span>
            <textarea readOnly value={payload} className="w-full bg-neutral-950 border border-neutral-800 p-2 rounded text-xs font-mono h-32 resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}

// 77. HTML Entity Encoder/Decoder
function HTMLEntityEncoderDecoder() {
  const [input, setInput] = useState("<div>Hello & Welcome</div>");
  const [output, setOutput] = useState("");

  const handleEscape = () => {
    const temp = document.createElement("div");
    temp.textContent = input;
    setOutput(temp.innerHTML);
  };

  const handleUnescape = () => {
    const temp = document.createElement("div");
    temp.innerHTML = input;
    setOutput(temp.textContent || "");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTML Entity Encoder / Decoder</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={handleEscape} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Escape</button>
        <button onClick={handleUnescape} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg text-white">Unescape</button>
      </div>
      {output && (
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
      )}
    </div>
  );
}

// 78. Password Strength Checker
function PasswordStrengthChecker() {
  const [pass, setPass] = useState("");

  const checkStrength = () => {
    if (!pass) return { label: "Empty", percentage: 0, color: "bg-neutral-800" };
    let score = 0;
    if (pass.length > 8) score += 20;
    if (pass.length > 14) score += 20;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 20;

    if (score < 40) return { label: "Weak", percentage: score, color: "bg-red-500" };
    if (score < 80) return { label: "Medium", percentage: score, color: "bg-amber-500" };
    return { label: "Strong", percentage: score, color: "bg-emerald-500" };
  };

  const strength = checkStrength();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Password Strength Evaluator</h2>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Type password..." className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded-lg text-sm text-white" />
      
      {pass && (
        <div className="space-y-2 border border-neutral-800 rounded-lg p-4 bg-neutral-900/40">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Entropy Label</span>
            <span className="font-extrabold text-white uppercase tracking-wider">{strength.label}</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} transition-all duration-350`} style={{ width: `${strength.percentage}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

// 79. Text Encrypter/Decrypter (AES)
function TextEncrypterDecrypter() {
  const [message, setMessage] = useState("Secret memo");
  const [passkey, setPasskey] = useState("pass123");
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(message, passkey).toString();
    setOutput(encrypted);
  };

  const handleDecrypt = () => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(message, passkey);
      const originalText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error();
      setOutput(originalText);
    } catch (e) {
      alert("Invalid password key, or message block corrupted.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">AES Encrypter / Decrypter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Message / Cipher block</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-xs font-mono h-24 focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Security Key</label>
          <input type="text" value={passkey} onChange={(e) => setPasskey(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-xs font-mono focus:outline-none" />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={handleEncrypt} className="flex-1 py-2 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-lg">AES Encrypt</button>
        <button onClick={handleDecrypt} className="flex-1 py-2 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-lg">AES Decrypt</button>
      </div>

      {output && (
        <div className="space-y-1 text-xs">
          <span className="text-neutral-400">Output</span>
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-850 p-2 rounded font-mono h-20 focus:outline-none" />
        </div>
      )}
    </div>
  );
}

// 80. QR Code Generator
function QRCodeGenerator() {
  const [text, setText] = useState("https://toolbox.local");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = async () => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">QR Code Generator</h2>
      <div className="flex gap-2">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
        <button onClick={handleGenerate} className="px-5 bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg shrink-0">Generate</button>
      </div>

      {qrUrl && (
        <div className="text-center space-y-3 pt-4 border-t border-neutral-800">
          <div className="flex justify-center bg-white p-4 rounded-lg w-40 h-40 mx-auto">
            <img src={qrUrl} alt="qr code" className="w-full h-full" />
          </div>
          <a href={qrUrl} download="qrcode.png" className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold">
            Download QR PNG
          </a>
        </div>
      )}
    </div>
  );
}

// 81. QR Code Reader
function QRCodeReader() {
  const [qrText, setQrText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const imgData = ctx?.getImageData(0, 0, img.width, img.height);
        if (imgData) {
          const code = jsQR(imgData.data, imgData.width, imgData.height);
          if (code) {
            setQrText(code.data);
          } else {
            alert("No QR Code detected in image.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">QR Code Decoder</h2>
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-800 rounded-lg">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-750 text-xs font-semibold rounded text-white">
          Upload QR Code Image
        </button>
      </div>

      {qrText && (
        <div className="bg-neutral-900 border border-neutral-805 p-3 rounded text-center text-xs font-mono">
          <span className="text-neutral-500">Decoded Contents</span>
          <p className="text-sm font-bold text-emerald-400 mt-1 break-all select-all">{qrText}</p>
        </div>
      )}
    </div>
  );
}

// 82. Bcrypt Hash Generator
function BcryptHashGenerator() {
  const [password, setPassword] = useState("pass123");
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState("");

  const handleHash = () => {
    try {
      const salt = bcrypt.genSaltSync(rounds);
      const hashed = bcrypt.hashSync(password, salt);
      setHash(hashed);
    } catch (e) {
      alert("Error generating bcrypt hash.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Bcrypt Hash Generator</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400">
        <div className="col-span-2 space-y-1">
          <label>Password String</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
        <div className="space-y-1">
          <label>Salt Rounds</label>
          <input type="number" min="4" max="15" value={rounds} onChange={(e) => setRounds(parseInt(e.target.value) || 10)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
      </div>

      <button onClick={handleHash} className="w-full py-2.5 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-xl">Generate Bcrypt</button>

      {hash && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-[10px] break-all select-all">
          <span className="text-neutral-500">Hash:</span> {hash}
        </div>
      )}
    </div>
  );
}

// 83. HMAC Generator
function HMACGenerator() {
  const [message, setMessage] = useState("Secret payload");
  const [key, setKey] = useState("key123");
  const [hash, setHash] = useState("");

  const handleHMAC = () => {
    const hmac = CryptoJS.HmacSHA256(message, key).toString();
    setHash(hmac);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HMAC-SHA256 Signature Builder</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Message</label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
        <div className="space-y-1">
          <label>Key</label>
          <input type="text" value={key} onChange={(e) => setKey(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
      </div>

      <button onClick={handleHMAC} className="w-full py-2.5 bg-red-600 hover:bg-red-700 font-semibold text-xs rounded-xl">Compute Signature</button>

      {hash && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs break-all select-all">
          <span className="text-neutral-500">HMAC-SHA256 Signature:</span> <span className="text-white font-bold block mt-1">{hash}</span>
        </div>
      )}
    </div>
  );
}
