"use client";

import React, { useState } from "react";
import { diffLines, Change } from "diff";
import { marked } from "marked";
import { 
  Copy, Check, RefreshCw, AlignLeft, Hash, ArrowLeftRight, Trash2, 
  SortAsc, Space, Columns, BookOpen, KeyRound, Fingerprint, Link, 
  FileType, Heading, Repeat, Scissors 
} from "lucide-react";

interface TextToolsProps {
  toolId: string;
}

export default function TextTools({ toolId }: TextToolsProps) {
  switch (toolId) {
    case "word-counter":
      return <WordCounter />;
    case "character-counter":
      return <CharacterCounter />;
    case "text-case-converter":
      return <TextCaseConverter />;
    case "text-reverser":
      return <TextReverser />;
    case "duplicate-line-remover":
      return <DuplicateLineRemover />;
    case "text-sorter":
      return <TextSorter />;
    case "whitespace-remover":
      return <WhitespaceRemover />;
    case "text-differ":
      return <TextDiffer />;
    case "lorem-ipsum-generator":
      return <LoremIpsumGenerator />;
    case "password-generator":
      return <PasswordGenerator />;
    case "uuid-generator":
      return <UUIDGenerator />;
    case "text-to-slug":
      return <TextToSlug />;
    case "markdown-to-html":
      return <MarkdownToHTML />;
    case "html-to-markdown":
      return <HTMLToMarkdown />;
    case "text-truncator":
      return <TextTruncator />;
    case "string-repeater":
      return <StringRepeater />;
    default:
      return <div className="text-center text-neutral-500 py-10">Text Tool Not Found</div>;
  }
}

// Custom Copy Hook Helper
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

// 28. Word Counter
function WordCounter() {
  const [text, setText] = useState("");
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 wpm

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Word & Sentence Counter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-40 focus:outline-none"
      />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Words", val: wordCount },
          { label: "Characters", val: charCount },
          { label: "Sentences", val: sentenceCount },
          { label: "Paragraphs", val: paragraphCount },
          { label: "Reading Time", val: `${readingTime} min` }
        ].map((item, idx) => (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-center">
            <p className="text-[10px] text-neutral-500 font-bold uppercase">{item.label}</p>
            <p className="text-lg font-extrabold text-white mt-1">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 29. Character Counter
function CharacterCounter() {
  const [text, setText] = useState("");
  const totalChars = text.length;
  const noSpaces = text.replace(/\s+/g, "").length;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Character Counter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text..."
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-36 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-center">
          <span className="text-xs text-neutral-400">Total Characters</span>
          <p className="text-xl font-extrabold text-white mt-1">{totalChars}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg text-center">
          <span className="text-xs text-neutral-400">Excluding Spaces</span>
          <p className="text-xl font-extrabold text-white mt-1">{noSpaces}</p>
        </div>
      </div>
    </div>
  );
}

// 30. Text Case Converter
function TextCaseConverter() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const convert = (type: string) => {
    let result = text;
    if (type === "upper") result = text.toUpperCase();
    if (type === "lower") result = text.toLowerCase();
    if (type === "title") {
      result = text.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    }
    if (type === "camel") {
      result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    if (type === "snake") {
      result = text.toLowerCase().replace(/\s+/g, "_");
    }
    if (type === "kebab") {
      result = text.toLowerCase().replace(/\s+/g, "-");
    }
    setText(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Case Converter</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Input text to alter case..."
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-32 focus:outline-none"
      />
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {["upper", "lower", "title", "camel", "snake", "kebab"].map((type) => (
          <button
            key={type}
            onClick={() => convert(type)}
            className="py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded text-xs font-semibold uppercase text-neutral-300"
          >
            {type}
          </button>
        ))}
      </div>
      {text && (
        <button
          onClick={() => copy(text)}
          className="w-full py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold rounded flex items-center justify-center gap-1"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />} Copy Output
        </button>
      )}
    </div>
  );
}

// 31. Text Reverser
function TextReverser() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const handleReverse = () => {
    setText(text.split("").reverse().join(""));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Reverse Text</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-32 focus:outline-none"
      />
      <div className="flex gap-2">
        <button onClick={handleReverse} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-lg">
          Reverse Characters
        </button>
        <button onClick={() => copy(text)} className="px-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// 32. Duplicate Line Remover
function DuplicateLineRemover() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const removeDuplicates = () => {
    const lines = text.split("\n");
    const unique = Array.from(new Set(lines));
    setText(unique.join("\n"));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Remove Duplicate Lines</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text lists here..."
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-36 focus:outline-none"
      />
      <div className="flex gap-2">
        <button onClick={removeDuplicates} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-lg">
          Remove Duplicates
        </button>
        <button onClick={() => copy(text)} className="px-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded border-none text-xs">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// 33. Text Sorter
function TextSorter() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const handleSort = (direction: "asc" | "desc" | "shuffle") => {
    const lines = text.split("\n").filter(l => l.length > 0);
    if (direction === "asc") lines.sort();
    if (direction === "desc") lines.sort().reverse();
    if (direction === "shuffle") {
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
      }
    }
    setText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Sort Lists / Lines</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-32 focus:outline-none"
      />
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => handleSort("asc")} className="py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-semibold rounded text-neutral-300">
          A-Z
        </button>
        <button onClick={() => handleSort("desc")} className="py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-semibold rounded text-neutral-300">
          Z-A
        </button>
        <button onClick={() => handleSort("shuffle")} className="py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-semibold rounded text-neutral-300">
          Shuffle
        </button>
        <button onClick={() => copy(text)} className="py-2 bg-amber-600 hover:bg-amber-700 text-xs font-semibold rounded">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// 34. Whitespace Remover
function WhitespaceRemover() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const handleClean = () => {
    // Collapse multiples and trim ends
    setText(text.trim().replace(/\s+/g, " "));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Whitespace Remover</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-3 rounded-lg text-sm h-32 focus:outline-none"
      />
      <div className="flex gap-2">
        <button onClick={handleClean} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-lg">
          Normalize Whitespaces
        </button>
        <button onClick={() => copy(text)} className="px-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// 35. Text Differ
function TextDiffer() {
  const [text1, setText1] = useState("Hello World\nLine two is here.");
  const [text2, setText2] = useState("Hello worlds\nLine two was edited.");
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  const handleCompare = () => {
    const res = diffLines(text1, text2);
    setDiffResult(res);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Compare Two Texts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-400 block mb-1">Original Text</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-xs h-28 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-400 block mb-1">Modified Text</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 focus:border-neutral-700 p-2.5 rounded-lg text-xs h-28 focus:outline-none"
          />
        </div>
      </div>

      <button onClick={handleCompare} className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-xl transition-all">
        Compare Texts
      </button>

      {diffResult.length > 0 && (
        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-lg p-4 font-mono text-xs space-y-1 max-h-40 overflow-y-auto">
          {diffResult.map((part, index) => {
            const color = part.added
              ? "text-emerald-400 bg-emerald-950/20"
              : part.removed
              ? "text-red-400 bg-red-950/20 line-through"
              : "text-neutral-400";
            const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
            return (
              <div key={index} className={`px-2 py-0.5 rounded ${color} whitespace-pre-wrap`}>
                {prefix}{part.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 36. Lorem Ipsum Generator
function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  const generate = () => {
    const phrases = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      // shuffle phrases to mock paragraph
      const shuffle = [...phrases].sort(() => 0.5 - Math.random()).join(" ");
      result.push(shuffle);
    }
    setOutput(result.join("\n\n"));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Lorem Ipsum Generator</h2>
      <div className="flex items-center gap-3">
        <label className="text-xs text-neutral-400">Paragraphs count</label>
        <input
          type="number"
          min="1"
          max="20"
          value={paragraphs}
          onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
          className="bg-[#1e1e1e] border border-neutral-800 text-xs w-16 p-2 rounded focus:outline-none"
        />
        <button onClick={generate} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-xs font-semibold rounded-lg">
          Generate Mock Text
        </button>
      </div>

      {output && (
        <div className="space-y-2 border-t border-neutral-800 pt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Output</span>
            <button onClick={() => copy(output)} className="text-emerald-400 hover:text-emerald-300 font-semibold">
              {copied ? "Copied" : "Copy Mock Text"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded text-xs h-32 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

// 37. Password Generator
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { copied, copy } = useCopy();

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let res = "";
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Generate Secure Password</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-neutral-400">Password Length ({length})</label>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-neutral-400 block mb-1">Inclusions</label>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded text-amber-500 bg-neutral-900 border-neutral-800" />
              <span>A-Z</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded text-amber-500 bg-neutral-900 border-neutral-800" />
              <span>0-9</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="rounded text-amber-500 bg-neutral-900 border-neutral-800" />
              <span>Symbols</span>
            </label>
          </div>
        </div>
      </div>

      <button onClick={generate} className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-xl">
        Generate Password
      </button>

      {password && (
        <div className="flex items-center gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 mt-2">
          <input readOnly type="text" value={password} className="w-full bg-transparent text-sm font-mono font-bold text-white focus:outline-none" />
          <button onClick={() => copy(password)} className="text-neutral-400 hover:text-white shrink-0">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}

// 38. UUID Generator
function UUIDGenerator() {
  const [uuid, setUuid] = useState("");
  const { copied, copy } = useCopy();

  const generate = () => {
    // Generate UUID V4
    const randomUuid = crypto.randomUUID();
    setUuid(randomUuid);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">UUID Generator (V4)</h2>
      <p className="text-xs text-neutral-400">Generate secure standard RFC 4122 random ID keys.</p>
      
      <button onClick={generate} className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-xl">
        Generate Unique ID
      </button>

      {uuid && (
        <div className="flex items-center gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 font-mono text-xs">
          <span className="w-full text-white">{uuid}</span>
          <button onClick={() => copy(uuid)} className="text-neutral-400 hover:text-white shrink-0">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

// 39. Text to Slug (slugify)
function TextToSlug() {
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Text to Slug</h2>
      <input
        type="text"
        placeholder="Enter string (e.g. My First Blog Post!)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs text-white focus:outline-none"
      />

      {slug && (
        <div className="flex items-center gap-2 bg-neutral-900 p-2.5 border border-neutral-800 rounded-lg text-xs font-mono">
          <span className="w-full text-amber-400 truncate">{slug}</span>
          <button onClick={() => copy(slug)} className="text-neutral-400 hover:text-white shrink-0">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

// 40. Markdown to HTML
function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState("# Header\n\n* List item 1\n* List item 2");
  const [html, setHtml] = useState("");
  const { copied, copy } = useCopy();

  const handleConvert = () => {
    try {
      const parsed = marked.parse(markdown);
      setHtml(parsed as string);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Markdown to HTML</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none"
        />
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs font-mono h-28 overflow-y-auto text-neutral-400 select-all">
          {html || "HTML code block output will render here..."}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleConvert} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-lg">
          Parse MD
        </button>
        {html && (
          <button onClick={() => copy(html)} className="px-4 bg-neutral-900 border border-neutral-850 rounded-lg text-xs">
            {copied ? "Copied" : "Copy HTML"}
          </button>
        )}
      </div>
    </div>
  );
}

// 41. HTML to Markdown
function HTMLToMarkdown() {
  const [html, setHtml] = useState("<h1>Header</h1>\n<p>This is a paragraph</p>");
  const [markdown, setMarkdown] = useState("");
  const { copied, copy } = useCopy();

  const handleConvert = () => {
    // Simple regex tags strip representation
    const md = html
      .replace(/<h1>(.*?)<\/h1>/gi, "# $1")
      .replace(/<h2>(.*?)<\/h2>/gi, "## $1")
      .replace(/<p>(.*?)<\/p>/gi, "$1\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<a\s+href="(.*?)">(.*?)<\/a>/gi, "[$2]($1)");
    setMarkdown(md);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">HTML to Markdown Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none"
        />
        <textarea
          readOnly
          value={markdown}
          placeholder="Clean Markdown representation"
          className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-xs font-mono h-28 focus:outline-none"
        />
      </div>
      <div className="flex gap-2">
        <button onClick={handleConvert} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold text-xs rounded-lg">
          Extract Markdown
        </button>
        {markdown && (
          <button onClick={() => copy(markdown)} className="px-4 bg-neutral-900 border border-neutral-850 rounded-lg text-xs">
            {copied ? "Copied" : "Copy Markdown"}
          </button>
        )}
      </div>
    </div>
  );
}

// 42. Text Truncator
function TextTruncator() {
  const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const [limit, setLimit] = useState(20);
  const { copied, copy } = useCopy();

  const truncated = text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Text Truncator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="sm:col-span-2 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-xs h-20 focus:outline-none"
        />
        <div className="space-y-1.5 text-xs text-neutral-400">
          <label>Char Limit ({limit})</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none"
          />
        </div>
      </div>

      {truncated && (
        <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg border border-neutral-800 text-xs">
          <span className="truncate pr-4">{truncated}</span>
          <button onClick={() => copy(truncated)} className="text-neutral-400 hover:text-white shrink-0">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

// 43. String Repeater
function StringRepeater() {
  const [text, setText] = useState("Hello");
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState(" ");
  const { copied, copy } = useCopy();

  const repeated = Array(Math.max(0, count)).fill(text).join(separator);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">String Repeater</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
        <div>
          <label>Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none text-white"
          />
        </div>
        <div>
          <label>Repetition Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none text-white"
          />
        </div>
        <div>
          <label>Separator symbol</label>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none text-white"
          />
        </div>
      </div>

      {repeated && (
        <div className="space-y-2 border-t border-neutral-800 pt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Output</span>
            <button onClick={() => copy(repeated)} className="text-emerald-400 hover:text-emerald-300 font-semibold">
              {copied ? "Copied" : "Copy Result"}
            </button>
          </div>
          <textarea
            readOnly
            value={repeated}
            className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded text-xs h-24 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
