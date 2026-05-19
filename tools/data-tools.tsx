"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import cronstrue from "cronstrue";
import Papa from "papaparse";
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
  Database, FileSpreadsheet, Eye, Braces, Code, Clipboard, 
  Terminal, BarChart3, RefreshCw, Check, Copy 
} from "lucide-react";

interface DataToolsProps {
  toolId: string;
}

export default function DataTools({ toolId }: DataToolsProps) {
  switch (toolId) {
    case "json-to-excel":
      return <JSONToExcel />;
    case "excel-to-json":
      return <ExcelToJSON />;
    case "json-schema-generator":
      return <JSONSchemaGenerator />;
    case "json-validator-lines":
      return <JSONValidatorLines />;
    case "sql-query-builder":
      return <SQLQueryBuilder />;
    case "regex-tester":
      return <RegexTester />;
    case "cron-descriptor":
      return <CronDescriptor />;
    case "faker-mock-generator":
      return <MockGenerator />;
    case "xml-formatter-parser":
      return <XMLFormatterParser />;
    case "csv-parser-stringify":
      return <CSVParserStringify />;
    case "text-to-sql-generator":
      return <TextToSQLGenerator />;
    case "graph-chart-maker":
      return <GraphChartMaker />;
    default:
      return <div className="text-center text-neutral-500 py-10">Data Tool Not Found</div>;
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

// 110. JSON to Excel Converter
function JSONToExcel() {
  const [input, setInput] = useState('[{"name":"John","role":"admin"},{"name":"Jane","role":"user"}]');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = () => {
    setIsProcessing(true);
    try {
      const data = JSON.parse(input);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "data_export.xlsx");
    } catch (e) {
      alert("Invalid JSON format. Must be an array of objects.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON to Excel (.xlsx)</h2>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <button onClick={handleConvert} disabled={isProcessing} className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5">
        {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <FileSpreadsheet size={14} />} Convert & Download Excel
      </button>
    </div>
  );
}

// 111. Excel to JSON Converter
function ExcelToJSON() {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const handleFile = (files: File[]) => {
    const f = files[0];
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const ws = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(ws);
        setOutput(JSON.stringify(json, null, 2));
      } catch (err) {
        alert("Error parsing excel spreadsheet.");
      }
    };
    reader.readAsArrayBuffer(f);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Excel to JSON Parser</h2>
      {!file ? (
        <FileDropzone onFilesSelected={handleFile} accept={{ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }} maxFiles={1} description="Upload Excel sheet to convert" />
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded border border-neutral-850">
            <span className="text-xs text-white truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setOutput(""); }} className="text-xs text-neutral-500">Remove</button>
          </div>
          {output && (
            <div className="space-y-2">
              <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-36 focus:outline-none" />
              <button onClick={() => copy(output)} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs font-semibold rounded">{copied ? "Copied" : "Copy JSON"}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 112. JSON Schema Generator
function JSONSchemaGenerator() {
  const [json, setJson] = useState('{"id": 1, "title": "Dashboard", "tags": ["admin", "dev"]}');
  const [schema, setSchema] = useState("");
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(json);
      const build = (val: any): any => {
        const type = typeof val;
        if (val === null) return { type: "null" };
        if (Array.isArray(val)) {
          return { type: "array", items: val.length > 0 ? build(val[0]) : {} };
        }
        if (type === "object") {
          const props: Record<string, any> = {};
          for (const k in val) {
            props[k] = build(val[k]);
          }
          return { type: "object", properties: props };
        }
        return { type };
      };
      setSchema(JSON.stringify(build(parsed), null, 2));
    } catch (e) {
      alert("Invalid JSON format.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">JSON Schema Draft Builder</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
        <textarea readOnly value={schema} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleGenerate} className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 text-xs font-semibold rounded-lg text-white">Generate Schema</button>
        {schema && <button onClick={() => copy(schema)} className="px-4 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-xs rounded">{copied ? "Copied" : "Copy"}</button>}
      </div>
    </div>
  );
}

// 113. JSON Validator (With line error reports)
function JSONValidatorLines() {
  const [json, setJson] = useState('{\n  "id": 1,\n  "role": "admin",\n}');
  const [status, setStatus] = useState("");

  const handleValidate = () => {
    try {
      JSON.parse(json);
      setStatus("Valid JSON structure! No syntax issues found.");
    } catch (e: any) {
      setStatus(`Syntax Error: ${e.message}`);
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <h2 className="text-lg font-semibold text-white font-geist text-left">JSON Validator (Linter)</h2>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg h-32 focus:outline-none" />
      <button onClick={handleValidate} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Lint JSON</button>
      {status && <p className={`p-2 rounded border font-bold ${status.startsWith("Valid") ? "bg-emerald-950/20 border-emerald-900 text-emerald-400" : "bg-red-950/20 border-red-900 text-red-400"}`}>{status}</p>}
    </div>
  );
}

// 114. SQL Query Builder (Visual selection builder)
function SQLQueryBuilder() {
  const [table, setTable] = useState("users");
  const [action, setAction] = useState("SELECT");
  const [fields, setFields] = useState("*");
  const [condition, setCondition] = useState("id = 1");
  const [query, setQuery] = useState("");
  const { copied, copy } = useCopy();

  const build = () => {
    let sql = "";
    if (action === "SELECT") {
      sql = `SELECT ${fields} FROM ${table} WHERE ${condition};`;
    } else if (action === "INSERT") {
      sql = `INSERT INTO ${table} (${fields}) VALUES ('val1', 'val2');`;
    } else if (action === "UPDATE") {
      sql = `UPDATE ${table} SET ${fields} WHERE ${condition};`;
    }
    setQuery(sql);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Visual SQL Query Builder</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Query Action</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
            <option value="SELECT">SELECT</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
          </select>
        </div>
        <div className="space-y-1">
          <label>Table name</label>
          <input type="text" value={table} onChange={(e) => setTable(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
        <div className="space-y-1">
          <label>Fields / Columns</label>
          <input type="text" value={fields} onChange={(e) => setFields(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
        <div className="space-y-1">
          <label>Condition Clause</label>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
      </div>

      <button onClick={build} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Build Statement</button>

      {query && (
        <div className="flex justify-between items-center bg-neutral-900 border border-neutral-805 p-3 rounded-lg text-xs font-mono">
          <span className="text-yellow-500 font-bold truncate pr-3">{query}</span>
          <button onClick={() => copy(query)} className="text-neutral-500 hover:text-white shrink-0">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

// 115. Regex Tester
function RegexTester() {
  const [regexStr, setRegexStr] = useState("[a-z]+");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Vercel App Launcher 2026");
  const [matches, setMatches] = useState<string[]>([]);

  const handleTest = () => {
    try {
      const rx = new RegExp(regexStr, flags);
      const result = testStr.match(rx);
      setMatches(result || []);
    } catch (e) {
      alert("Invalid Regular Expression.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white font-geist">Regex Pattern Tester</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400">
        <div className="col-span-2 space-y-1">
          <label>Regex Expression</label>
          <input type="text" value={regexStr} onChange={(e) => setRegexStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white font-mono" />
        </div>
        <div className="space-y-1">
          <label>Flags</label>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white font-mono" />
        </div>
      </div>
      <div className="space-y-1 text-xs text-neutral-400">
        <label>String content to match</label>
        <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded h-20 text-white focus:outline-none" />
      </div>

      <button onClick={handleTest} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Run Matcher</button>

      {matches.length > 0 && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-xs font-mono">
          <span className="text-neutral-500 font-bold block mb-1">Matches found:</span>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => <span key={i} className="bg-yellow-950/40 border border-yellow-905 text-yellow-400 px-2 py-0.5 rounded">{m}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

// 116. Cron Expression Descriptor
function CronDescriptor() {
  const [expr, setExpr] = useState("*/5 * * * *");
  const [desc, setDesc] = useState("Every 5 minutes.");

  const handleDescribe = () => {
    try {
      const description = cronstrue.toString(expr);
      setDesc(description);
    } catch (e) {
      setDesc("Invalid Cron Expression syntax.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Cron Expression Translator</h2>
      <div className="flex gap-2">
        <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white font-mono" />
        <button onClick={handleDescribe} className="px-5 bg-yellow-600 hover:bg-yellow-700 text-xs font-semibold rounded-lg text-white">Describe</button>
      </div>

      {desc && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center text-xs text-neutral-300">
          <span className="text-neutral-500 font-mono block">English translation</span>
          <p className="text-sm font-bold text-yellow-500 mt-1">{desc}</p>
        </div>
      )}
    </div>
  );
}

// 117. Faker / Mock Data Generator
function MockGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState("user");
  const [data, setData] = useState<any[]>([]);

  const handleGenerate = () => {
    const list = [];
    const names = ["Alice Vance", "Bob Miller", "Charley Parker", "Diana Prince", "Ethan Hunt"];
    const roles = ["Developer", "Designer", "Admin", "HR Lead", "Product Manager"];
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length];
      const email = `${name.toLowerCase().replace(" ", "")}@company.org`;
      if (type === "user") {
        list.push({ id: i + 1, name, email, role: roles[i % roles.length] });
      } else {
        list.push({ id: i + 1, product: `Item-${i+1}`, price: `$${((i+1)*25).toFixed(2)}`, code: `PR-${1000 + i}` });
      }
    }
    setData(list);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Random Data Generator</h2>
      <div className="grid grid-cols-2 gap-3 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Template Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
            <option value="user">User Accounts</option>
            <option value="product">Products List</option>
          </select>
        </div>
        <div className="space-y-1">
          <label>Rows Count</label>
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 3)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs" />
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Mock Data</button>

      {data.length > 0 && (
        <textarea readOnly value={JSON.stringify(data, null, 2)} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded text-xs font-mono h-24 focus:outline-none" />
      )}
    </div>
  );
}

// 118. XML Parser / Formatter
function XMLFormatterParser() {
  const [xml, setXml] = useState("<data><record id='1'><name>Item</name></record></data>");
  const [status, setStatus] = useState("");

  const handleValidate = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");
      const isError = doc.getElementsByTagName("parsererror").length > 0;
      if (isError) {
        setStatus("Invalid XML Syntax parsing issues!");
      } else {
        setStatus("Valid XML Tree Structure!");
      }
    } catch (e) {
      setStatus("Error parsing XML structure.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white font-geist">XML Validator</h2>
      <textarea value={xml} onChange={(e) => setXml(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <button onClick={handleValidate} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Validate Tree</button>
      {status && <p className={`text-xs font-mono font-bold ${status.startsWith("Valid") ? "text-emerald-400" : "text-red-400"}`}>{status}</p>}
    </div>
  );
}

// 119. CSV Parser & Converter
function CSVParserStringify() {
  const [csv, setCsv] = useState("id,name,role\n1,Bob,admin\n2,Jane,user");
  const [output, setOutput] = useState("");

  const handleParse = () => {
    try {
      const parsed = Papa.parse(csv, { header: true });
      setOutput(JSON.stringify(parsed.data, null, 2));
    } catch (e) {
      alert("Invalid CSV.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">CSV to JSON Object Array</h2>
      <textarea value={csv} onChange={(e) => setCsv(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-32 focus:outline-none" />
      <button onClick={handleParse} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Convert</button>
      {output && (
        <textarea readOnly value={output} className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-24 focus:outline-none" />
      )}
    </div>
  );
}

// 120. Text to SQL Generator (Template prompts helper)
function TextToSQLGenerator() {
  const [prompt, setPrompt] = useState("Find all users who registered last week and spent over $100");
  const [sql, setSql] = useState("");
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    // Basic heuristics translation representation
    let query = "SELECT * FROM users";
    if (prompt.includes("spent")) {
      query += " JOIN orders ON users.id = orders.user_id WHERE orders.amount > 100";
    }
    if (prompt.includes("registered")) {
      query += " AND users.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
    }
    setSql(query + ";");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Natural Text to SQL Statement</h2>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs h-20 focus:outline-none" />
      <button onClick={handleGenerate} className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 font-semibold text-xs rounded-xl">Generate Query</button>

      {sql && (
        <div className="flex justify-between items-center bg-neutral-900 border border-neutral-805 p-3 rounded-lg text-xs font-mono">
          <span className="text-yellow-500 font-bold truncate pr-3">{sql}</span>
          <button onClick={() => copy(sql)} className="text-neutral-500 hover:text-white shrink-0">
            {copied ? "Copied" : "Copy SQL"}
          </button>
        </div>
      )}
    </div>
  );
}

// 121. Graph / Chart Maker
function GraphChartMaker() {
  const [valuesStr, setValuesStr] = useState("10, 45, 20, 80, 55");
  const [chartType, setChartType] = useState("bar");

  const values = valuesStr.split(",").map(v => parseInt(v.trim()) || 0);
  const maxVal = Math.max(...values, 1);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Visual Analytics Bar Graph Maker</h2>
      <div className="grid grid-cols-3 gap-2 text-xs text-neutral-400 items-center">
        <div className="col-span-2">
          <label>Values (comma-separated)</label>
          <input type="text" value={valuesStr} onChange={(e) => setValuesStr(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs font-mono" />
        </div>
        <div>
          <label>Chart Mode</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-xl flex items-end justify-around h-44 gap-2 pt-10">
        {values.map((v, i) => {
          const pct = (v / maxVal) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
              <span className="text-[10px] text-neutral-550 mb-1">{v}</span>
              <div 
                className="w-full bg-yellow-500 rounded-t transition-all duration-500" 
                style={{ height: `${pct}%`, minHeight: "4px" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
