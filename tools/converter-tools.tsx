"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import yaml from "js-yaml";
import { marked } from "marked";
import { 
  FileSpreadsheet, FileCode, Code2, Table, Eye, AlignJustify, 
  FileJson, Database, Settings2, Braces, Layers, CornerDownRight 
} from "lucide-react";

interface ConverterToolsProps {
  toolId: string;
}

export default function ConverterTools({ toolId }: ConverterToolsProps) {
  switch (toolId) {
    case "json-csv-converter":
      return <JSONCSVConverter />;
    case "json-yaml-converter":
      return <JSONYAMLConverter />;
    case "json-xml-converter":
      return <JSONXMLConverter />;
    case "csv-to-table-viewer":
      return <CSVToTableViewer />;
    case "markdown-to-html-preview":
      return <MarkdownPreviewer />;
    case "html-to-plain-text":
      return <HTMLToPlainText />;
    case "json-formatter-validator":
      return <JSONFormatterValidator />;
    case "xml-formatter-validator":
      return <XMLFormatterValidator />;
    case "yaml-validator":
      return <YAMLValidator />;
    case "sql-formatter":
      return <SQLFormatter />;
    case "css-formatter-minifier":
      return <CSSFormatterMinifier />;
    case "js-formatter-minifier":
      return <JSFormatterMinifier />;
    case "html-formatter-minifier":
      return <HTMLFormatterMinifier />;
    case "number-base-converter":
      return <NumberBaseConverter />;
    case "ascii-to-hex-binary":
      return <ASCIIToHexBinary />;
    default:
      return <div className="text-center text-neutral-500 py-10">Converter Not Found</div>;
  }
}

// Simple Copy Hook
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

// 58. JSON ↔ CSV Converter
function JSONCSVConverter() {
  const [input, setInput] = useState('[{"name":"John","age":30},{"name":"Jane","age":25}]');
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const convertToCSV = () => {
    try {
      const parsed = JSON.parse(input);
      const csv = Papa.unparse(parsed);
      setOutput(csv);
    } catch (e) {
      alert("Invalid JSON input. Must be an array of objects.");
    }
  };

  const convertToJSON = () => {
    try {
      const parsed = Papa.parse(input, { header: true });
      setOutput(JSON.stringify(parsed.data, null, 2));
    } catch (e) {
      alert("Error parsing CSV.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON ↔ CSV Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={convertToCSV} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">JSON to CSV</button>
        <button onClick={convertToJSON} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">CSV to JSON</button>
        {output && <button onClick={() => copy(output)} className="px-4 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs rounded-lg">{copied ? "Copied" : "Copy"}</button>}
      </div>
    </div>
  );
}

// 59. JSON ↔ YAML Converter
function JSONYAMLConverter() {
  const [input, setInput] = useState('{\n  "title": "Config",\n  "enabled": true\n}');
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const toYAML = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(yaml.dump(parsed));
    } catch (e) {
      alert("Invalid JSON structure.");
    }
  };

  const toJSON = () => {
    try {
      const parsed = yaml.load(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert("Invalid YAML structure.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON ↔ YAML Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={toYAML} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">JSON to YAML</button>
        <button onClick={toJSON} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">YAML to JSON</button>
        {output && <button onClick={() => copy(output)} className="px-4 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs rounded-lg">{copied ? "Copied" : "Copy"}</button>}
      </div>
    </div>
  );
}

// 60. JSON ↔ XML Converter
function JSONXMLConverter() {
  const [input, setInput] = useState('{"user": {"name": "Bob", "role": "admin"}}');
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const toXML = () => {
    try {
      const obj = JSON.parse(input);
      const build = (node: any, name: string): string => {
        let xml = "";
        if (typeof node === "object") {
          for (const key in node) {
            xml += build(node[key], key);
          }
          return `<${name}>${xml}</${name}>`;
        }
        return `<${name}>${node}</${name}>`;
      };
      // Find root key
      const keys = Object.keys(obj);
      if (keys.length === 1) {
        setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${build(obj[keys[0]], keys[0])}`);
      } else {
        setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<root>${build(obj, "root")}</root>`);
      }
    } catch (e) {
      alert("Invalid JSON format.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON to XML</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={toXML} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Convert to XML</button>
        {output && <button onClick={() => copy(output)} className="px-4 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs rounded-lg">{copied ? "Copied" : "Copy"}</button>}
      </div>
    </div>
  );
}

// 61. CSV to Table Viewer
function CSVToTableViewer() {
  const [csv, setCsv] = useState("Name,Age,Role\nAlice,24,Designer\nBob,30,Developer");
  const [data, setData] = useState<string[][]>([]);

  const handleParse = () => {
    const parsed = Papa.parse(csv);
    setData(parsed.data as string[][]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">CSV to Table Grid</h2>
      <textarea value={csv} onChange={(e) => setCsv(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      <button onClick={handleParse} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Parse CSV</button>

      {data.length > 0 && (
        <div className="overflow-x-auto border border-neutral-800 rounded-lg max-h-48">
          <table className="w-full text-xs text-left text-neutral-300">
            <thead className="bg-neutral-900 text-neutral-400 font-bold border-b border-neutral-800">
              <tr>
                {data[0].map((cell, idx) => <th key={idx} className="p-3">{cell}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-neutral-900 bg-[#121212] hover:bg-neutral-900/40">
                  {row.map((cell, cIdx) => <td key={cIdx} className="p-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// 62. Markdown Previewer
function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState("# Live Preview\n\nEdit this **markdown** text...");
  const [preview, setPreview] = useState("");

  const handlePreview = () => {
    setPreview(marked.parse(markdown) as string);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Markdown Live Render</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <div dangerouslySetInnerHTML={{ __html: preview }} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs h-32 overflow-y-auto prose prose-invert" />
      </div>
      <button onClick={handlePreview} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Render HTML View</button>
    </div>
  );
}

// 63. HTML to Plain Text
function HTMLToPlainText() {
  const [html, setHtml] = useState("<div class='main'>\n  <h2>Header</h2>\n  <p>Hello World!</p>\n</div>");
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const handleStrip = () => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    setText(doc.body.textContent || "");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTML to Plain Text</h2>
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
      <button onClick={handleStrip} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Strip HTML Tags</button>
      {text && (
        <div className="space-y-2">
          <textarea readOnly value={text} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-20 focus:outline-none" />
          <button onClick={() => copy(text)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded flex items-center justify-center gap-1">{copied ? "Copied" : "Copy Output"}</button>
        </div>
      )}
    </div>
  );
}

// 64. JSON Formatter & Validator
function JSONFormatterValidator() {
  const [json, setJson] = useState('{"name":"Bob","age":28,"role":"admin"}');
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const { copied, copy } = useCopy();

  const format = (minify: boolean) => {
    try {
      const parsed = JSON.parse(json);
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
      setStatus("Valid JSON!");
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON Formatter & Validator</h2>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={() => format(false)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Beautify JSON</button>
        <button onClick={() => format(true)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Minify JSON</button>
      </div>
      {status && <p className={`text-xs font-bold ${status.startsWith("Valid") ? "text-emerald-400" : "text-red-400"}`}>{status}</p>}
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy Output"}</button>
        </div>
      )}
    </div>
  );
}

// 65. XML Formatter & Validator
function XMLFormatterValidator() {
  const [xml, setXml] = useState("<user><name>Alice</name><age>25</age></user>");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const handleFormat = () => {
    // Basic XML Indent prettify mockup
    let formatted = "";
    let reg = /(>)(<)(\/*)/g;
    let temp = xml.replace(reg, "$1\r\n$2$3");
    let pad = 0;
    temp.split("\r\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w+>/)) {
        indent = 0;
      } else if (node.match(/<\/\w+/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/<\w([^>]*[^/])?>/)) {
        indent = 1;
      }
      formatted += "  ".repeat(pad) + node + "\r\n";
      pad += indent;
    });
    setOutput(formatted.trim());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">XML Formatter</h2>
      <textarea value={xml} onChange={(e) => setXml(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <button onClick={handleFormat} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Format XML</button>
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy XML"}</button>
        </div>
      )}
    </div>
  );
}

// 66. YAML Validator
function YAMLValidator() {
  const [input, setInput] = useState("title: Config\nversion: 1.0\nenabled: true");
  const [status, setStatus] = useState("");

  const validate = () => {
    try {
      yaml.load(input);
      setStatus("Valid YAML syntax!");
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">YAML Validator & Linter</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <button onClick={validate} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Validate Structure</button>
      {status && (
        <p className={`text-xs font-mono font-bold ${status.startsWith("Valid") ? "text-emerald-400" : "text-red-400"}`}>
          {status}
        </p>
      )}
    </div>
  );
}

// 67. SQL Formatter
function SQLFormatter() {
  const [sql, setSql] = useState("select * from users join posts on users.id = posts.user_id where status = 'active'");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const handleFormat = () => {
    // Basic SELECT statement indentation helper
    let formatted = sql
      .replace(/\s+/g, " ")
      .replace(/\b(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|LIMIT)\b/gi, "\n$1\n  ")
      .trim();
    setOutput(formatted);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">SQL Formatter</h2>
      <textarea value={sql} onChange={(e) => setSql(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
      <button onClick={handleFormat} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Format SQL</button>
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy SQL"}</button>
        </div>
      )}
    </div>
  );
}

// 68. CSS Formatter / Minifier
function CSSFormatterMinifier() {
  const [css, setCss] = useState(".card { display: flex; padding: 20px; }");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const process = (minify: boolean) => {
    let result = css;
    if (minify) {
      result = css
        .replace(/\s+/g, " ")
        .replace(/\s*([;{}:,])\s*/g, "$1")
        .replace(/;}/g, "}");
    } else {
      result = css
        .replace(/\s+/g, " ")
        .replace(/{/g, " {\n  ")
        .replace(/;/g, ";\n  ")
        .replace(/}/g, "\n}\n")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/\n\s*\n/g, "\n");
    }
    setOutput(result.trim());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">CSS Beautifier / Minifier</h2>
      <textarea value={css} onChange={(e) => setCss(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={() => process(false)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Format CSS</button>
        <button onClick={() => process(true)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Minify CSS</button>
      </div>
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy Output"}</button>
        </div>
      )}
    </div>
  );
}

// 69. JS Formatter / Minifier (Prettier equivalent browser client)
function JSFormatterMinifier() {
  const [js, setJs] = useState("function sum(a, b) { return a + b; }");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const process = (minify: boolean) => {
    let result = js;
    if (minify) {
      result = js
        .replace(/\s+/g, " ")
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "") // strip comments
        .replace(/\s*([=+\-*/{}();,])\s*/g, "$1");
    } else {
      // Basic formatting markup
      result = js
        .replace(/{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/}\s*/g, "\n}\n")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/\n\s*\n/g, "\n");
    }
    setOutput(result.trim());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JS Formatter & Minifier</h2>
      <textarea value={js} onChange={(e) => setJs(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={() => process(false)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Format JS</button>
        <button onClick={() => process(true)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Minify JS</button>
      </div>
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy"}</button>
        </div>
      )}
    </div>
  );
}

// 70. HTML Formatter / Minifier
function HTMLFormatterMinifier() {
  const [html, setHtml] = useState("<div class='container'>\n  <p>Hello</p>\n</div>");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const process = (minify: boolean) => {
    let result = html;
    if (minify) {
      result = html
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><");
    } else {
      // Beautify indent tags
      let indent = 0;
      let formatted = "";
      const reg = /(>)(<)(\/*)/g;
      const temp = html.replace(reg, "$1\r\n$2$3");
      temp.split("\r\n").forEach((node) => {
        if (node.match(/<\/\w+/)) {
          if (indent > 0) indent--;
        }
        formatted += "  ".repeat(indent) + node + "\n";
        if (node.match(/<\w[^>]*[^/]>$/) && !node.match(/<\/\w+>/)) {
          indent++;
        }
      });
      result = formatted.trim();
    }
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTML Beautifier & Minifier</h2>
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <div className="flex gap-2">
        <button onClick={() => process(false)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Format HTML</button>
        <button onClick={() => process(true)} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white">Minify HTML</button>
      </div>
      {output && (
        <div className="space-y-2">
          <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none" />
          <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy Output"}</button>
        </div>
      )}
    </div>
  );
}

// 71. Number Base Converter (Binary, Octal, Decimal, Hex)
function NumberBaseConverter() {
  const [val, setVal] = useState("42");
  const [base, setBase] = useState(10);
  const [bin, setBin] = useState("");
  const [oct, setOct] = useState("");
  const [dec, setDec] = useState("");
  const [hex, setHex] = useState("");

  const handleConvert = () => {
    try {
      const parsed = parseInt(val, base);
      if (isNaN(parsed)) {
        alert("Invalid input for selected base.");
        return;
      }
      setBin(parsed.toString(2));
      setOct(parsed.toString(8));
      setDec(parsed.toString(10));
      setHex(parsed.toString(16).toUpperCase());
    } catch (e) {
      alert("Error converting numbers.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Number Base Converter</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-sm col-span-2" />
        <select value={base} onChange={(e) => setBase(parseInt(e.target.value))} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
          <option value="2">Binary</option>
          <option value="8">Octal</option>
          <option value="10">Decimal</option>
          <option value="16">Hexadecimal</option>
        </select>
      </div>

      <button onClick={handleConvert} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Convert Bases</button>

      {(bin || dec) && (
        <div className="grid grid-cols-2 gap-2 bg-neutral-900 border border-neutral-800 p-3 rounded font-mono text-xs">
          <div><span className="text-neutral-500">Binary:</span> <span className="text-white font-bold">{bin}</span></div>
          <div><span className="text-neutral-500">Octal:</span> <span className="text-white font-bold">{oct}</span></div>
          <div><span className="text-neutral-500">Decimal:</span> <span className="text-white font-bold">{dec}</span></div>
          <div><span className="text-neutral-500">Hex:</span> <span className="text-white font-bold">{hex}</span></div>
        </div>
      )}
    </div>
  );
}

// 72. ASCII to Hex / Binary
function ASCIIToHexBinary() {
  const [text, setText] = useState("Hello");
  const [hex, setHex] = useState("");
  const [bin, setBin] = useState("");

  const handleConvert = () => {
    let hexResult = "";
    let binResult = "";
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      hexResult += code.toString(16).padStart(2, "0") + " ";
      binResult += code.toString(2).padStart(8, "0") + " ";
    }
    setHex(hexResult.trim());
    setBin(binResult.trim());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">ASCII to Byte Streams</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white" />
      <button onClick={handleConvert} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs rounded-xl">Convert ASCII</button>

      {(hex || bin) && (
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-2 text-xs font-mono">
          <div><span className="text-neutral-500">Hexadecimal:</span> <span className="text-white block mt-0.5">{hex}</span></div>
          <div><span className="text-neutral-500">Binary bytes:</span> <span className="text-white block mt-0.5">{bin}</span></div>
        </div>
      )}
    </div>
  );
}
