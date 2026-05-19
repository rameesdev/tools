"use client";

import React, { useState } from "react";
import { diffLines } from "diff";
import yaml from "js-yaml";
import { marked } from "marked";
import cronstrue from "cronstrue";
import { 
  GitBranch, Terminal, RefreshCw, Layers, Copy, Check, Eye 
} from "lucide-react";

interface DeveloperToolsProps {
  toolId: string;
}

export default function DeveloperTools({ toolId }: DeveloperToolsProps) {
  switch (toolId) {
    case "git-command-helper":
      return <GitCommandHelper />;
    case "dockerfile-generator":
      return <DockerfileGenerator />;
    case "regex-tester-dev":
      return <RegexTesterDev />;
    case "crontab-generator":
      return <CrontabGenerator />;
    case "markdown-editor":
      return <MarkdownEditor />;
    case "diff-viewer":
      return <DiffViewer />;
    case "json-validator":
      return <JSONValidatorDev />;
    case "sql-builder":
      return <SQLBuilderDev />;
    case "yaml-to-json":
      return <YAMLToJSON />;
    case "url-parser":
      return <URLParserDev />;
    case "base64-encode-decode":
      return <Base64EncoderDecoderDev />;
    case "user-agent":
      return <UserAgentDev />;
    case "ip-address-geo":
      return <IPAddressGeoDev />;
    default:
      return <div className="text-center text-neutral-500 py-10">Developer Tool Not Found</div>;
  }
}

// Copy Hook
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

// 122. Git Command Helper
function GitCommandHelper() {
  const [action, setAction] = useState("branch-create");
  const [param, setParam] = useState("feature/login");
  const { copied, copy } = useCopy();

  const getCommand = () => {
    if (action === "branch-create") return `git checkout -b ${param}`;
    if (action === "commit") return `git commit -m "${param}"`;
    if (action === "push") return `git push origin ${param}`;
    if (action === "revert") return `git revert ${param}`;
    return `git checkout ${param}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Git Commands Generator</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Action Type</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
            <option value="branch-create">Create new branch</option>
            <option value="commit">Commit all staged changes</option>
            <option value="push">Push branch to upstream</option>
            <option value="revert">Revert a specific commit</option>
          </select>
        </div>
        <div className="space-y-1">
          <label>Parameters / Arguments</label>
          <input type="text" value={param} onChange={(e) => setParam(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
      </div>

      <div className="flex justify-between items-center bg-neutral-900 border border-neutral-805 p-3 rounded-lg text-xs font-mono">
        <span className="text-blue-400 font-bold truncate pr-3">{getCommand()}</span>
        <button onClick={() => copy(getCommand())} className="text-neutral-500 hover:text-white shrink-0">
          {copied ? <Check size={14} className="text-emerald-450" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

// 123. Dockerfile Generator
function DockerfileGenerator() {
  const [nodeVersion, setNodeVersion] = useState("20");
  const [port, setPort] = useState("3000");
  const [cmd, setCmd] = useState("npm start");
  const { copied, copy } = useCopy();

  const fileContent = `FROM node:${nodeVersion}-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE ${port}\nCMD ["${cmd.split(" ")[0]}", "${cmd.split(" ").slice(1).join('", "')}"]`;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Dockerfile Builder</h2>
      <div className="grid grid-cols-3 gap-2.5 text-xs text-neutral-400">
        <div>
          <label>Node Version</label>
          <input type="text" value={nodeVersion} onChange={(e) => setNodeVersion(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
        <div>
          <label>Exposed Port</label>
          <input type="text" value={port} onChange={(e) => setPort(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
        <div>
          <label>Start Command</label>
          <input type="text" value={cmd} onChange={(e) => setCmd(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-500 font-mono">Dockerfile output:</span>
          <button onClick={() => copy(fileContent)} className="text-blue-400 hover:text-blue-300 font-semibold">{copied ? "Copied" : "Copy Content"}</button>
        </div>
        <textarea readOnly value={fileContent} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-32 focus:outline-none" />
      </div>
    </div>
  );
}

// 124. Regex Tester (dev edition)
function RegexTesterDev() {
  const [regex, setRegex] = useState("[0-9]+");
  const [text, setText] = useState("Vercel App launched in 2026");
  const [matches, setMatches] = useState<string[]>([]);

  const handleMatch = () => {
    try {
      const rx = new RegExp(regex, "g");
      const matched = text.match(rx);
      setMatches(matched || []);
    } catch (e) {
      alert("Invalid Regex");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Regex Tester</h2>
      <input type="text" value={regex} onChange={(e) => setRegex(e.target.value)} placeholder="Regex (e.g. \w+)" className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white font-mono" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Target String" className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs h-20 focus:outline-none" />
      <button onClick={handleMatch} className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl">Match Regex</button>

      {matches.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {matches.map((m, i) => <span key={i} className="bg-blue-950/40 border border-blue-900 text-blue-400 px-2 py-0.5 rounded text-xs font-mono">{m}</span>)}
        </div>
      )}
    </div>
  );
}

// 125. Crontab Generator
function CrontabGenerator() {
  const [cron, setCron] = useState("* * * * *");
  const [desc, setDesc] = useState("Every minute.");

  const handleGenerate = () => {
    try {
      setDesc(cronstrue.toString(cron));
    } catch (e) {
      setDesc("Invalid Cron expression.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Crontab Descriptor</h2>
      <div className="flex gap-2">
        <input type="text" value={cron} onChange={(e) => setCron(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white font-mono" />
        <button onClick={handleGenerate} className="px-5 bg-blue-600 hover:bg-blue-700 text-xs font-semibold rounded-lg text-white">Describe</button>
      </div>
      <p className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center text-xs text-blue-400 font-mono">
        {desc}
      </p>
    </div>
  );
}

// 126. Markdown Editor & Previewer
function MarkdownEditor() {
  const [md, setMd] = useState("# Live Preview\n\nEdit *this*...");
  const [preview, setPreview] = useState("");

  const handlePreview = () => {
    setPreview(marked.parse(md) as string);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Markdown Live Editor</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={md} onChange={(e) => setMd(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <div dangerouslySetInnerHTML={{ __html: preview }} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs h-32 overflow-y-auto prose prose-invert" />
      </div>
      <button onClick={handlePreview} className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl">Preview</button>
    </div>
  );
}

// 127. Diff Viewer
function DiffViewer() {
  const [t1, setT1] = useState("Hello line A");
  const [t2, setT2] = useState("Hello line B");
  const [result, setResult] = useState<any[]>([]);

  const handleDiff = () => {
    setResult(diffLines(t1, t2));
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <h2 className="text-lg font-semibold text-white font-geist text-left">Code Diff Viewer</h2>
      <div className="grid grid-cols-2 gap-3">
        <textarea value={t1} onChange={(e) => setT1(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded h-20 focus:outline-none" />
        <textarea value={t2} onChange={(e) => setT2(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded h-20 focus:outline-none" />
      </div>
      <button onClick={handleDiff} className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl text-white">Compare Lines</button>

      {result.length > 0 && (
        <div className="bg-neutral-950 border border-neutral-800 p-3 rounded space-y-1">
          {result.map((part, idx) => (
            <div key={idx} className={`p-1 rounded ${part.added ? "bg-emerald-950/20 text-emerald-400" : part.removed ? "bg-red-950/20 text-red-405 line-through" : "text-neutral-400"}`}>
              {part.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 128. JSON Validator Dev
function JSONValidatorDev() {
  const [json, setJson] = useState('{"id": 123}');
  const [status, setStatus] = useState("");

  const handleValidate = () => {
    try {
      JSON.parse(json);
      setStatus("JSON structure verified!");
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <h2 className="text-lg font-semibold text-white font-geist text-left">JSON Validator</h2>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded h-28 focus:outline-none" />
      <button onClick={handleValidate} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl">Validate Structure</button>
      {status && <p className={`p-2 rounded border font-bold ${status.includes("verified") ? "text-emerald-400 bg-emerald-950/20 border-emerald-900" : "text-red-400 bg-red-950/20 border-red-900"}`}>{status}</p>}
    </div>
  );
}

// 129. SQL Builder
function SQLBuilderDev() {
  const [query, setQuery] = useState("SELECT * FROM records;");
  const { copied, copy } = useCopy();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">SQL Statement View</h2>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <button onClick={() => copy(query)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl text-white">
        {copied ? "Copied" : "Copy Query"}
      </button>
    </div>
  );
}

// 130. YAML to JSON
function YAMLToJSON() {
  const [yamlStr, setYamlStr] = useState("title: App\nenabled: true");
  const [json, setJson] = useState("");

  const handleConvert = () => {
    try {
      const parsed = yaml.load(yamlStr);
      setJson(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert("Invalid YAML.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">YAML to JSON</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={yamlStr} onChange={(e) => setYamlStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <textarea readOnly value={json} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      </div>
      <button onClick={handleConvert} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl text-white">Convert to JSON</button>
    </div>
  );
}

// 131. URL Parser Dev
function URLParserDev() {
  const [url, setUrl] = useState("https://example.com/path");
  const [parsed, setParsed] = useState<any>(null);

  const parse = () => {
    try {
      const u = new URL(url);
      setParsed({ hostname: u.hostname, path: u.pathname });
    } catch (e) {
      alert("Invalid URL");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">URL Hostname Extractor</h2>
      <div className="flex gap-2">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
        <button onClick={parse} className="px-5 bg-blue-600 hover:bg-blue-700 text-xs font-semibold rounded-lg text-white">Parse</button>
      </div>

      {parsed && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs">
          <div><span className="text-neutral-500">Hostname:</span> {parsed.hostname}</div>
          <div><span className="text-neutral-500">Pathname:</span> {parsed.path}</div>
        </div>
      )}
    </div>
  );
}

// 132. Base64 encode/decode dev
function Base64EncoderDecoderDev() {
  const [str, setStr] = useState("encode me");
  const [out, setOut] = useState("");

  const handleEncode = () => {
    setOut(btoa(str));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Base64 Encoder</h2>
      <input type="text" value={str} onChange={(e) => setStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
      <button onClick={handleEncode} className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl">Encode Base64</button>
      {out && (
        <textarea readOnly value={out} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-16 focus:outline-none" />
      )}
    </div>
  );
}

// 133. User Agent Dev
function UserAgentDev() {
  const [ua, setUa] = useState(
    typeof window !== "undefined" ? window.navigator.userAgent : ""
  );

  return (
    <div className="space-y-4 font-mono text-xs">
      <h2 className="text-lg font-semibold text-white font-geist text-left">User Agent String</h2>
      <textarea readOnly value={ua} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded h-20 focus:outline-none" />
    </div>
  );
}

// 134. IP Address Geo Dev
function IPAddressGeoDev() {
  const [ip, setIp] = useState("");

  const locate = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const json = await res.json();
      setIp(json.ip);
    } catch (e) {
      alert("Error.");
    }
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold text-white text-left">IP Address Resolver</h2>
      <button onClick={locate} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-xl">Resolve IP</button>
      {ip && (
        <p className="bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs text-blue-400">
          IP: {ip}
        </p>
      )}
    </div>
  );
}
