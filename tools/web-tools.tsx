"use client";

import React, { useState } from "react";
import { 
  Globe, Link, HelpCircle, Laptop, Wifi, Terminal, 
  Code, Search, FileText, Check, Copy, Mail, ArrowLeft, Trash2, RefreshCw
} from "lucide-react";

interface WebToolsProps {
  toolId: string;
}

export default function WebTools({ toolId }: WebToolsProps) {
  switch (toolId) {
    case "url-parser-builder":
      return <URLParserBuilder />;
    case "url-slug-generator":
      return <URLSlugGenerator />;
    case "query-string-parser":
      return <QueryStringParser />;
    case "user-agent-parser":
      return <UserAgentParser />;
    case "http-status-codes":
      return <HTTPStatusCodes />;
    case "ip-address-lookup":
      return <IPAddressLookup />;
    case "dns-lookup":
      return <DNSLookupMock />;
    case "html-encoder-decoder":
      return <HTMLEncoderDecoder />;
    case "mime-type-lookup":
      return <MimeTypeLookup />;
    case "json-schema-validator":
      return <JSONSchemaValidator />;
    case "meta-tags-generator":
      return <MetaTagsGenerator />;
    case "robotstxt-generator":
      return <RobotsTxtGenerator />;
    case "temp-mail":
      return <TempMailGenerator />;
    default:
      return <div className="text-center text-neutral-500 py-10">Web Tool Not Found</div>;
  }
}

// Simple Copy Helper
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

// 84. URL Parser & Builder
function URLParserBuilder() {
  const [urlStr, setUrlStr] = useState("https://user:pass@example.com:8080/path/to/page?query=1#hash-tag");
  const [parsed, setParsed] = useState<any>(null);

  const handleParse = () => {
    try {
      const url = new URL(urlStr);
      setParsed({
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      });
    } catch (e) {
      alert("Invalid URL structure.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">URL Breakdown Parser</h2>
      <div className="flex gap-2">
        <input type="text" value={urlStr} onChange={(e) => setUrlStr(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
        <button onClick={handleParse} className="px-5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Parse</button>
      </div>

      {parsed && (
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-xs font-mono text-neutral-350 space-y-2">
          <div><span className="text-neutral-550 font-bold">Protocol:</span> <span className="text-indigo-400">{parsed.protocol}</span></div>
          <div><span className="text-neutral-550 font-bold">Host:</span> <span className="text-white">{parsed.hostname}</span></div>
          <div><span className="text-neutral-550 font-bold">Port:</span> <span className="text-white">{parsed.port || "default"}</span></div>
          <div><span className="text-neutral-550 font-bold">Path:</span> <span className="text-white">{parsed.pathname}</span></div>
          <div><span className="text-neutral-550 font-bold">Query params:</span> <span className="text-white">{parsed.search}</span></div>
          <div><span className="text-neutral-550 font-bold">Hash Tag:</span> <span className="text-white">{parsed.hash}</span></div>
        </div>
      )}
    </div>
  );
}

// 85. URL Slug Generator
function URLSlugGenerator() {
  const [text, setText] = useState("Vercel Web App Launcher!");
  const { copied, copy } = useCopy();

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">URL Slug Builder</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
      {slug && (
        <div className="flex justify-between items-center bg-neutral-900 border border-neutral-805 p-3 rounded-lg text-xs font-mono">
          <span className="text-indigo-400 font-bold">{slug}</span>
          <button onClick={() => copy(slug)} className="text-neutral-400 hover:text-white shrink-0">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

// 86. Query String Parser / Stringifier
function QueryStringParser() {
  const [queryString, setQueryString] = useState("?name=John&role=developer&active=true");
  const [parsed, setParsed] = useState<any>(null);

  const handleParse = () => {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    setParsed(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Query Parameters Parser</h2>
      <div className="flex gap-2">
        <input type="text" value={queryString} onChange={(e) => setQueryString(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
        <button onClick={handleParse} className="px-5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Parse</button>
      </div>

      {parsed && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg font-mono text-xs">
          {Object.entries(parsed).map(([k, v]: any) => (
            <div key={k} className="flex justify-between border-b border-neutral-850 py-1.5 last:border-0">
              <span className="text-neutral-500 font-bold">{k}:</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 87. User Agent Parser
function UserAgentParser() {
  const [uaString, setUaString] = useState(
    typeof window !== "undefined" ? window.navigator.userAgent : "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
  );
  const [parsedUA, setParsedUA] = useState<any>(null);

  const handleParse = () => {
    // Simple mock detection for client convenience
    const isWin = /Windows/i.test(uaString);
    const isMac = /Macintosh/i.test(uaString);
    const isLinux = /Linux/i.test(uaString);
    const isChrome = /Chrome/i.test(uaString);
    const isFirefox = /Firefox/i.test(uaString);
    const isSafari = /Safari/i.test(uaString) && !/Chrome/i.test(uaString);

    setParsedUA({
      os: isWin ? "Windows OS" : isMac ? "macOS" : isLinux ? "Linux" : "Unknown OS",
      browser: isChrome ? "Google Chrome" : isFirefox ? "Mozilla Firefox" : isSafari ? "Apple Safari" : "Unknown Browser",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">User Agent Parser</h2>
      <textarea value={uaString} onChange={(e) => setUaString(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <button onClick={handleParse} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Parse User Agent</button>

      {parsedUA && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-xs font-mono text-neutral-300">
          <div><span className="text-neutral-500">Operating System:</span> {parsedUA.os}</div>
          <div><span className="text-neutral-500">Browser:</span> {parsedUA.browser}</div>
        </div>
      )}
    </div>
  );
}

// 88. HTTP Status Codes Checker
function HTTPStatusCodes() {
  const [query, setQuery] = useState("404");
  const codes: Record<string, string> = {
    "200": "OK - The request succeeded.",
    "201": "Created - The request succeeded and a new resource was created.",
    "301": "Moved Permanently - URI of requested resource has been changed permanently.",
    "400": "Bad Request - Server cannot process request due to client error.",
    "401": "Unauthorized - Client must authenticate to get response.",
    "403": "Forbidden - Client has no access rights to content.",
    "404": "Not Found - Server cannot find requested resource.",
    "500": "Internal Server Error - Server encountered situation it doesn't know how to handle."
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTTP Status Codes Search</h2>
      <div className="flex gap-2">
        <input type="text" placeholder="Search code (e.g. 404)" value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
      </div>

      <div className="space-y-1.5">
        {Object.entries(codes)
          .filter(([code]) => code.includes(query))
          .map(([code, desc]) => (
            <div key={code} className="bg-neutral-900 border border-neutral-850 p-2.5 rounded text-xs flex justify-between gap-4">
              <span className="font-extrabold text-indigo-400 font-mono shrink-0">{code}</span>
              <span className="text-neutral-300">{desc}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

// 89. IP Address Lookup
function IPAddressLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchIP = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const json = await res.json();
      setIp(json.ip);
      setData(json);
    } catch (e) {
      alert("Error resolving client IP mapping.");
    }
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold text-white text-left">Your IP Geolocation Details</h2>
      <button onClick={fetchIP} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Locate IP</button>

      {ip && (
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-left text-xs font-mono space-y-2">
          <div><span className="text-neutral-500">IP Address:</span> <span className="text-indigo-400 font-bold">{ip}</span></div>
          <div><span className="text-neutral-500">City / Region:</span> {data?.city}, {data?.region}</div>
          <div><span className="text-neutral-500">Country:</span> {data?.country_name}</div>
          <div><span className="text-neutral-500">ISP Provider:</span> {data?.org}</div>
        </div>
      )}
    </div>
  );
}

// 90. DNS Lookup Mock/Explain
function DNSLookupMock() {
  const [domain, setDomain] = useState("google.com");
  const [records, setRecords] = useState<any>(null);

  const handleLookup = () => {
    // Generate simulated standard DNS layout records for display
    setRecords([
      { type: "A", val: "142.250.190.46" },
      { type: "AAAA", val: "2607:f8b0:4005:802::200e" },
      { type: "MX", val: "10 smtp.google.com" },
      { type: "TXT", val: "v=spf1 include:_spf.google.com ~all" }
    ]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">DNS Records Resolver (Simulation)</h2>
      <div className="flex gap-2">
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
        <button onClick={handleLookup} className="px-5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Lookup</button>
      </div>

      {records && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg space-y-2 font-mono text-xs">
          {records.map((r: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b border-neutral-850 pb-1.5 last:border-0 last:pb-0">
              <span className="font-bold text-indigo-400 uppercase">{r.type}:</span>
              <span className="text-neutral-300">{r.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 91. HTML Encoder/Decoder (Unique layout)
function HTMLEncoderDecoder() {
  const [input, setInput] = useState("<script>alert(1)</script>");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const el = document.createElement("div");
    el.textContent = input;
    setOutput(el.innerHTML);
  };

  const handleDecode = () => {
    const el = document.createElement("div");
    el.innerHTML = input;
    setOutput(el.textContent || "");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTML Characters Escaper</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={handleEncode} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Encode</button>
        <button onClick={handleDecode} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Decode</button>
      </div>
      {output && (
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
      )}
    </div>
  );
}

// 92. MIME Type Lookup
function MimeTypeLookup() {
  const [ext, setExt] = useState(".png");
  const list: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".zip": "application/zip",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">MIME Type Lookup</h2>
      <input type="text" placeholder="Search extension (e.g. .png)" value={ext} onChange={(e) => setExt(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
      
      {list[ext.trim().toLowerCase()] ? (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center text-xs font-mono">
          <span className="text-neutral-500">MIME Content Type:</span>
          <p className="text-sm font-bold text-indigo-400 mt-1">{list[ext.trim().toLowerCase()]}</p>
        </div>
      ) : (
        <p className="text-xs text-neutral-500 italic">No entry found for current query.</p>
      )}
    </div>
  );
}

// 94. JSON Schema Validator
function JSONSchemaValidator() {
  const [schemaStr, setSchemaStr] = useState('{"type":"object","properties":{"id":{"type":"number"}}}');
  const [dataStr, setDataStr] = useState('{"id":123}');
  const [status, setStatus] = useState("");

  const handleValidate = () => {
    try {
      const schema = JSON.parse(schemaStr);
      const data = JSON.parse(dataStr);
      // Basic type validation check
      if (schema.type === "object" && typeof data === "object") {
        for (const prop in schema.properties) {
          const typeMatch = typeof data[prop] === schema.properties[prop].type;
          if (!typeMatch) {
            setStatus(`Failed: property '${prop}' must be a ${schema.properties[prop].type}`);
            return;
          }
        }
        setStatus("Schema validation passed successfully!");
      }
    } catch (e) {
      setStatus("Error: Invalid JSON parsing formats.");
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <h2 className="text-lg font-semibold text-white font-geist text-left">Schema Validator</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-neutral-500 block mb-1">JSON Schema</label>
          <textarea value={schemaStr} onChange={(e) => setSchemaStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded h-24 focus:outline-none" />
        </div>
        <div>
          <label className="text-neutral-500 block mb-1">Target Object</label>
          <textarea value={dataStr} onChange={(e) => setDataStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded h-24 focus:outline-none" />
        </div>
      </div>
      <button onClick={handleValidate} className="w-full py-2 bg-indigo-600 hover:bg-indigo-750 font-semibold text-xs rounded-lg text-white">Run Validator</button>
      {status && <p className={`text-xs font-bold ${status.startsWith("Schema") ? "text-emerald-400" : "text-red-400"}`}>{status}</p>}
    </div>
  );
}

// 95. Meta Tags Generator
function MetaTagsGenerator() {
  const [title, setTitle] = useState("Launch Pad");
  const [desc, setDesc] = useState("Vercel web dashboard application.");
  const [tags, setTags] = useState("");
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    const code = `<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">`;
    setTags(code);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">SEO Meta Tags Builder</h2>
      <div className="grid grid-cols-2 gap-3 text-xs text-neutral-400">
        <div>
          <label>Title Tag</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
        <div>
          <label>Meta Description</label>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white" />
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Generate tags</button>

      {tags && (
        <div className="space-y-2">
          <textarea readOnly value={tags} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-24 focus:outline-none" />
          <button onClick={() => copy(tags)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy Tags"}</button>
        </div>
      )}
    </div>
  );
}

// 96. Robots.txt Generator
function RobotsTxtGenerator() {
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [txt, setTxt] = useState("");
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    const output = `User-agent: *\nDisallow: /admin\nDisallow: /private\n\nSitemap: ${sitemap}`;
    setTxt(output);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Robots.txt Generator</h2>
      <div className="flex gap-2">
        <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="Sitemap URL" className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
        <button onClick={handleGenerate} className="px-5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Generate</button>
      </div>

      {txt && (
        <div className="space-y-2">
          <textarea readOnly value={txt} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-24 focus:outline-none" />
          <button onClick={() => copy(txt)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy robots.txt"}</button>
        </div>
      )}
    </div>
  );
}

// 97. Temporary Email Generator
function TempMailGenerator() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [domain, setDomain] = useState("1secmail.com");
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const { copied, copy } = useCopy();

  const domains = ["1secmail.com", "1secmail.net", "1secmail.org"];

  const generateRandomEmail = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomLogin = "";
    for (let i = 0; i < 10; i++) {
      randomLogin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
    setLogin(randomLogin);
    setDomain(selectedDomain);
    setEmail(`${randomLogin}@${selectedDomain}`);
    setMessages([]);
    setSelectedMessage(null);
  };

  React.useEffect(() => {
    generateRandomEmail();
  }, []);

  const refreshInbox = async () => {
    if (!login || !domain) return;
    setIsRefreshing(true);
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (e) {
      console.error("Error checking inbox:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  React.useEffect(() => {
    if (login && domain) {
      refreshInbox();
      const interval = setInterval(refreshInbox, 10000); // refresh every 10s
      return () => clearInterval(interval);
    }
  }, [login, domain]);

  const viewMessage = async (id: number) => {
    setIsLoadingMessage(true);
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`
      );
      const data = await res.json();
      setSelectedMessage(data);
    } catch (e) {
      console.error("Error reading email:", e);
      alert("Failed to load email content.");
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const handleCustomEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.trim()) {
      setEmail(`${login.trim()}@${domain}`);
      setMessages([]);
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white font-geist flex items-center gap-2">
        <Mail className="text-blue-500" size={20} />
        Temporary Email Generator
      </h2>

      {/* Email Address Panel */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-neutral-400 font-semibold">Your Temporary Email Address</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center justify-between bg-neutral-950 border border-neutral-800 px-3 py-2.5 rounded-lg text-sm font-mono text-blue-400">
              <span className="truncate">{email || "Generating..."}</span>
              {email && (
                <button
                  onClick={() => copy(email)}
                  className="text-neutral-500 hover:text-white shrink-0 ml-2"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              )}
            </div>
            <button
              onClick={generateRandomEmail}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg text-white transition-all shrink-0"
            >
              Generate New
            </button>
          </div>
        </div>

        {/* Custom Email Form */}
        <form onSubmit={handleCustomEmail} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-800/60">
          <div className="sm:col-span-2 flex gap-1">
            <input
              type="text"
              placeholder="Custom username..."
              value={login}
              onChange={(e) => setLogin(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())}
              className="flex-1 bg-[#1e1e1e] border border-neutral-800 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none"
            />
            <span className="text-neutral-500 self-center text-xs">@</span>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-[#1e1e1e] border border-neutral-800 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none"
            >
              {domains.map((dom) => (
                <option key={dom} value={dom}>
                  {dom}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-xs font-semibold py-1.5 rounded-lg text-white transition-all"
          >
            Apply Email
          </button>
        </form>
      </div>

      {/* Inbox & View Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Messages List (left side) */}
        <div className="md:col-span-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col h-[400px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3 shrink-0">
            <span className="text-xs font-bold text-neutral-300">Inbox Messages</span>
            <button
              onClick={refreshInbox}
              disabled={isRefreshing}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 disabled:opacity-50"
            >
              <RefreshCw className={`h-4.5 w-4.5 ${isRefreshing ? "animate-spin" : ""}`} size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 p-4 space-y-2">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center animate-pulse">
                  <Mail size={14} className="text-neutral-500" />
                </div>
                <p className="text-[10px]">Waiting for emails...</p>
                <p className="text-[9px] text-neutral-600">Auto-refreshing every 10s</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => viewMessage(msg.id)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all space-y-1.5 block ${
                    selectedMessage?.id === msg.id
                      ? "bg-blue-600/10 border-blue-500/40 text-white"
                      : "bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-300"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-neutral-400">
                    <span className="truncate font-semibold text-blue-400">{msg.from.split("@")[0]}</span>
                    <span>{msg.date.split(" ")[1]}</span>
                  </div>
                  <p className="font-semibold truncate">{msg.subject || "(No Subject)"}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Viewer (right side) */}
        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col h-[400px]">
          {isLoadingMessage ? (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
              <RefreshCw className="animate-spin text-blue-500 mb-2" size={24} />
              <span className="text-xs">Loading email content...</span>
            </div>
          ) : selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="border-b border-neutral-800 pb-3 mb-3 shrink-0 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-white truncate mr-4">{selectedMessage.subject || "(No Subject)"}</h3>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <ArrowLeft size={12} /> Back
                  </button>
                </div>
                <div className="text-[10px] text-neutral-400">
                  <span className="text-neutral-500">From:</span> {selectedMessage.from}
                </div>
                <div className="text-[10px] text-neutral-400">
                  <span className="text-neutral-500">Date:</span> {selectedMessage.date}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto bg-neutral-950 border border-neutral-850 p-3 rounded-lg text-xs text-neutral-300 space-y-4">
                {selectedMessage.htmlBody ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedMessage.htmlBody }}
                    className="prose prose-invert prose-xs max-w-none text-neutral-200"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{selectedMessage.body || selectedMessage.textBody}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-500 p-4">
              <Mail className="text-neutral-700 mb-2 animate-bounce" size={32} />
              <span className="text-xs">Select an email from the inbox to read its content.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
