export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export type ToolCategory =
  | "pdf"
  | "image"
  | "text"
  | "calculator"
  | "converter"
  | "security"
  | "web"
  | "color"
  | "data"
  | "developer";

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  accentClass: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "pdf",
    name: "PDF Tools",
    icon: "FileText",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-500/10",
    borderClass: "border-rose-500/20",
    accentClass: "rose",
    description: "Merge, split, compress, protect and edit PDF files online."
  },
  {
    id: "image",
    name: "Image Tools",
    icon: "Image",
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/20",
    accentClass: "emerald",
    description: "Crop, resize, compress, convert and edit images client-side."
  },
  {
    id: "text",
    name: "Text Tools",
    icon: "AlignLeft",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
    accentClass: "amber",
    description: "Analyze, format, generate and inspect text data instantly."
  },
  {
    id: "calculator",
    name: "Calculators",
    icon: "Calculator",
    colorClass: "text-cyan-500",
    bgClass: "bg-cyan-500/10",
    borderClass: "border-cyan-500/20",
    accentClass: "cyan",
    description: "Perform mathematical, physical, financial and date calculations."
  },
  {
    id: "converter",
    name: "Converters",
    icon: "RefreshCw",
    colorClass: "text-indigo-500",
    bgClass: "bg-indigo-500/10",
    borderClass: "border-indigo-500/20",
    accentClass: "indigo",
    description: "Format, convert and beautify code and serialized structured data."
  },
  {
    id: "security",
    name: "Security Tools",
    icon: "ShieldAlert",
    colorClass: "text-red-500",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/20",
    accentClass: "red",
    description: "Generate hashes, encode text, verify strength and encrypt data securely."
  },
  {
    id: "web",
    name: "Web Tools",
    icon: "Globe",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/20",
    accentClass: "blue",
    description: "Build sitemaps, inspect URLs, read standards and check local network info."
  },
  {
    id: "color",
    name: "Color Tools",
    icon: "Palette",
    colorClass: "text-fuchsia-500",
    bgClass: "bg-fuchsia-500/10",
    borderClass: "border-fuchsia-500/20",
    accentClass: "fuchsia",
    description: "Pick, convert, generate palettes and check contrast ratios."
  },
  {
    id: "data",
    name: "Data Tools",
    icon: "BarChart3",
    colorClass: "text-violet-500",
    bgClass: "bg-violet-500/10",
    borderClass: "border-violet-500/20",
    accentClass: "violet",
    description: "View, edit, parse and render tabular or hierarchical dataset files."
  },
  {
    id: "developer",
    name: "Developer Tools",
    icon: "Code2",
    colorClass: "text-teal-500",
    bgClass: "bg-teal-500/10",
    borderClass: "border-teal-500/20",
    accentClass: "teal",
    description: "InspectSpecificity, play with Flex/Grid, calculate layout, compare files."
  }
];

export const tools: Tool[] = [
  // === PDF TOOLS ===
  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Combine multiple PDF documents into a single file with exact page ordering.",
    category: "pdf",
    icon: "FileStack",
    tags: ["pdf", "merge", "combine", "join"],
    isPopular: true
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split a PDF file into multiple files by specifying page ranges.",
    category: "pdf",
    icon: "Scissors",
    tags: ["pdf", "split", "extract", "divide"]
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce the file size of PDF documents while retaining readable text and images.",
    category: "pdf",
    icon: "FileDown",
    tags: ["pdf", "compress", "minimize", "size"],
    isPopular: true
  },
  {
    id: "pdf-to-images",
    name: "PDF to Images",
    description: "Convert pages of a PDF document into high-quality PNG or JPEG images.",
    category: "pdf",
    icon: "FileImage",
    tags: ["pdf", "image", "png", "jpeg", "extract"]
  },
  {
    id: "images-to-pdf",
    name: "Images to PDF",
    description: "Combine multiple images (JPG, PNG, WebP) into a single clean PDF document.",
    category: "pdf",
    icon: "Images",
    tags: ["image", "pdf", "convert", "combine"]
  },
  {
    id: "pdf-page-remover",
    name: "PDF Page Remover",
    description: "Remove specific pages or ranges from a PDF document.",
    category: "pdf",
    icon: "FileMinus",
    tags: ["pdf", "delete", "remove", "clean"]
  },
  {
    id: "pdf-rotator",
    name: "PDF Rotator",
    description: "Rotate individual or all pages of a PDF file by 90, 180, or 270 degrees.",
    category: "pdf",
    icon: "RotateCw",
    tags: ["pdf", "rotate", "turn", "orientation"]
  },
  {
    id: "pdf-watermark",
    name: "PDF Watermark",
    description: "Add a custom text overlay as watermark on all pages of a PDF document.",
    category: "pdf",
    icon: "Stamp",
    tags: ["pdf", "watermark", "overlay", "stamp", "text"]
  },
  {
    id: "pdf-protector",
    name: "PDF Protector",
    description: "Secure your PDF files by adding a password with standard user encryption.",
    category: "pdf",
    icon: "Lock",
    tags: ["pdf", "password", "encrypt", "protect", "secure"]
  },
  {
    id: "pdf-unlock",
    name: "PDF Unlock",
    description: "Remove password protection and restrictions from a PDF if password is known.",
    category: "pdf",
    icon: "Unlock",
    tags: ["pdf", "decrypt", "unlock", "password", "remove"]
  },
  {
    id: "pdf-metadata-editor",
    name: "PDF Metadata Editor",
    description: "Edit internal PDF meta information: title, author, subject, and keywords.",
    category: "pdf",
    icon: "FileEdit",
    tags: ["pdf", "metadata", "author", "title", "exif"]
  },
  {
    id: "pdf-page-reorder",
    name: "PDF Page Reorder",
    description: "Drag and drop thumbnails to visually reorder pages in a PDF document.",
    category: "pdf",
    icon: "ArrowUpDown",
    tags: ["pdf", "reorder", "pages", "sort", "visual"]
  },

  // === IMAGE TOOLS ===
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images to reduce size while retaining quality.",
    category: "image",
    icon: "Shrink",
    tags: ["image", "compress", "size", "quality"],
    isPopular: true
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by pixels or custom percentage with aspect ratio constraints.",
    category: "image",
    icon: "Maximize2",
    tags: ["image", "resize", "scale", "width", "height"]
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images with aspect ratio presets (1:1, 16:9, 4:3) or custom bounding box.",
    category: "image",
    icon: "Crop",
    tags: ["image", "crop", "trim", "aspect", "ratio"]
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert image file formats between JPG, PNG, WebP, BMP, and GIF.",
    category: "image",
    icon: "RefreshCw",
    tags: ["image", "convert", "format", "png", "jpg"],
    isPopular: true
  },
  {
    id: "image-to-base64",
    name: "Image to Base64",
    description: "Encode images into Base64 URI strings for immediate use in CSS/HTML.",
    category: "image",
    icon: "Code",
    tags: ["image", "base64", "encode", "datauri"]
  },
  {
    id: "base64-to-image",
    name: "Base64 to Image",
    description: "Decode Base64 string data URI back to visual downloadable images.",
    category: "image",
    icon: "FileImage",
    tags: ["base64", "decode", "image", "datauri"]
  },
  {
    id: "image-metadata-viewer",
    name: "Image Metadata Viewer",
    description: "Extract and view EXIF, GPS, camera model, and other metadata from images.",
    category: "image",
    icon: "Info",
    tags: ["image", "exif", "metadata", "camera", "gps"]
  },
  {
    id: "image-flipper-rotator",
    name: "Image Flipper/Rotator",
    description: "Flip images horizontally, vertically, or rotate by arbitrary angles.",
    category: "image",
    icon: "RotateCcw",
    tags: ["image", "rotate", "flip", "mirror"]
  },
  {
    id: "grayscale-converter",
    name: "Grayscale Converter",
    description: "Convert colorful images into monochromatic black-and-white images.",
    category: "image",
    icon: "Contrast",
    tags: ["image", "grayscale", "blackandwhite", "filter"]
  },
  {
    id: "background-remover",
    name: "Background Remover",
    description: "Extract foreground subjects and remove backgrounds completely locally.",
    category: "image",
    icon: "Eraser",
    tags: ["image", "background", "remove", "transparent", "ai"],
    isNew: true
  },
  {
    id: "image-watermark-adder",
    name: "Image Watermark Adder",
    description: "Add a custom text or logo watermark onto your images.",
    category: "image",
    icon: "Stamp",
    tags: ["image", "watermark", "overlay", "copyright"]
  },
  {
    id: "bulk-image-resizer",
    name: "Bulk Image Resizer",
    description: "Resize multiple images in a single batch operation.",
    category: "image",
    icon: "Files",
    tags: ["image", "bulk", "batch", "resize", "scale"]
  },
  {
    id: "svg-to-png-converter",
    name: "SVG to PNG Converter",
    description: "Rasterize vector SVG files into standard high-resolution PNG assets.",
    category: "image",
    icon: "FileCode",
    tags: ["svg", "png", "convert", "vector", "raster"]
  },
  {
    id: "png-to-svg",
    name: "PNG to SVG Converter",
    description: "Trace basic pixel boundaries of PNG images into scalable vector SVG path tags.",
    category: "image",
    icon: "Vector",
    tags: ["png", "svg", "vectorize", "trace", "outline"]
  },
  {
    id: "webp-converter",
    name: "WebP Converter",
    description: "Convert various image formats quickly into lightweight, optimized WebP files.",
    category: "image",
    icon: "Zap",
    tags: ["webp", "compress", "image", "convert"]
  },

  // === TEXT TOOLS ===
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time.",
    category: "text",
    icon: "Binary",
    tags: ["text", "count", "words", "characters", "reading"],
    isPopular: true
  },
  {
    id: "character-counter",
    name: "Character Counter",
    description: "Real-time count of total characters with and without whitespaces.",
    category: "text",
    icon: "Hash",
    tags: ["text", "count", "letters", "characters"]
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text case format to UPPERCASE, lowercase, Title Case, camelCase, snake_case, or kebab-case.",
    category: "text",
    icon: "ChevronUp",
    tags: ["text", "case", "uppercase", "lowercase", "format"]
  },
  {
    id: "text-reverser",
    name: "Text Reverser",
    description: "Reverse whole sentences, words, or individual characters.",
    category: "text",
    icon: "ArrowLeftRight",
    tags: ["text", "reverse", "flip", "backwards"]
  },
  {
    id: "duplicate-line-remover",
    name: "Duplicate Line Remover",
    description: "Clean up your text by filtering out and removing duplicate lines of input.",
    category: "text",
    icon: "CheckSquare",
    tags: ["text", "duplicates", "remove", "clean", "filter"]
  },
  {
    id: "text-sorter",
    name: "Text Sorter",
    description: "Sort text lists alphabetically, in reverse, or randomly shuffle them.",
    category: "text",
    icon: "SortAsc",
    tags: ["text", "sort", "alphabetical", "list", "shuffle"]
  },
  {
    id: "whitespace-remover",
    name: "Whitespace Remover",
    description: "Trim lines, collapse multiple spaces, or strip all whitespaces entirely.",
    category: "text",
    icon: "Space",
    tags: ["text", "whitespace", "trim", "spaces", "clean"]
  },
  {
    id: "text-differ",
    name: "Text Differ",
    description: "Compare two text sections side-by-side to highlight additions and deletions.",
    category: "text",
    icon: "Columns",
    tags: ["text", "compare", "diff", "difference"],
    isPopular: true
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate mock placeholder paragraphs, sentences, or lists for designs.",
    category: "text",
    icon: "BookOpen",
    tags: ["text", "lorem", "mock", "placeholder", "generate"]
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create secure passwords with customizable options and built-in strength metrics.",
    category: "text",
    icon: "KeyRound",
    tags: ["password", "generate", "secure", "random"],
    isPopular: true
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate standard RFC 4122 compliant UUID version 1 and version 4 strings.",
    category: "text",
    icon: "Fingerprint",
    tags: ["uuid", "guid", "generate", "random", "id"]
  },
  {
    id: "text-to-slug",
    name: "Text to Slug",
    description: "Convert standard strings into URL-friendly lowercase slugs.",
    category: "text",
    icon: "Link",
    tags: ["text", "slug", "url", "format", "seo"]
  },
  {
    id: "markdown-to-html",
    name: "Markdown to HTML",
    description: "Parse structured Markdown text into browser-ready HTML blocks.",
    category: "text",
    icon: "FileType",
    tags: ["markdown", "html", "convert", "parse"]
  },
  {
    id: "html-to-markdown",
    name: "HTML to Markdown",
    description: "Convert HTML elements back into lightweight Markdown formatting.",
    category: "text",
    icon: "Heading",
    tags: ["html", "markdown", "convert", "parse"]
  },
  {
    id: "text-truncator",
    name: "Text Truncator",
    description: "Shorten strings to target counts appending ellipsis suffixes gracefully.",
    category: "text",
    icon: "Scissors",
    tags: ["text", "truncate", "shorten", "limit"]
  },
  {
    id: "string-repeater",
    name: "String Repeater",
    description: "Multiply a target string input by a set number of times with custom separators.",
    category: "text",
    icon: "Repeat",
    tags: ["text", "repeat", "multiply", "duplicate"]
  },

  // === CALCULATORS ===
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    description: "Standard calculation pad supporting trigonometric, log, power, and memory functions.",
    category: "calculator",
    icon: "Calculator",
    tags: ["math", "calculator", "scientific", "trig"],
    isPopular: true
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Determine exact age in years, months, weeks, and days based on birth date.",
    category: "calculator",
    icon: "Calendar",
    tags: ["date", "age", "birthday", "calculate"]
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Compute Body Mass Index (BMI) using metric or imperial units.",
    category: "calculator",
    icon: "Activity",
    tags: ["health", "bmi", "weight", "height", "body"]
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentage changes, ratios, relative shares, and fraction scales.",
    category: "calculator",
    icon: "Percent",
    tags: ["math", "percentage", "ratio", "change"]
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Divide bills among people adding customized tip percentages instantly.",
    category: "calculator",
    icon: "DollarSign",
    tags: ["finance", "tip", "bill", "split", "restaurant"]
  },
  {
    id: "loan-emi-calculator",
    name: "Loan / EMI Calculator",
    description: "Calculate monthly installments, interest payments, and breakdown schedules.",
    category: "calculator",
    icon: "Coins",
    tags: ["finance", "loan", "emi", "interest", "mortgage"],
    isPopular: true
  },
  {
    id: "date-difference-calculator",
    name: "Date Difference Calculator",
    description: "Count the number of calendar days, weeks, or business hours between two dates.",
    category: "calculator",
    icon: "CalendarRange",
    tags: ["date", "duration", "difference", "days"]
  },
  {
    id: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert clock timings across global locations and time zones.",
    category: "calculator",
    icon: "Clock",
    tags: ["time", "timezone", "utc", "gmt", "world"]
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert units of length, weight, temperature, area, volume, and speed.",
    category: "calculator",
    icon: "Scale",
    tags: ["measure", "convert", "unit", "weight", "length", "temp"],
    isPopular: true
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert values across international currencies with manual rate override options.",
    category: "calculator",
    icon: "Coins",
    tags: ["finance", "currency", "money", "exchange", "rates"]
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate original vs promotional prices, listing absolute savings.",
    category: "calculator",
    icon: "Tag",
    tags: ["finance", "discount", "sale", "price", "savings"]
  },
  {
    id: "tax-calculator",
    name: "Tax Calculator",
    description: "Determine tax amounts, net prices, and total margins given percentage rates.",
    category: "calculator",
    icon: "Receipt",
    tags: ["finance", "tax", "vat", "gst", "income"]
  },
  {
    id: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Calculate total trip fuel costs based on distance, consumption, and unit price.",
    category: "calculator",
    icon: "Fuel",
    tags: ["travel", "fuel", "gas", "cost", "trip", "car"]
  },
  {
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert arabic numbers to roman representations and vice versa.",
    category: "calculator",
    icon: "Binary",
    tags: ["math", "roman", "arabic", "number", "convert"]
  },

  // === FORMAT CONVERTERS ===
  {
    id: "json-csv-converter",
    name: "JSON ↔ CSV Converter",
    description: "Convert structured JSON lists into CSV spreadsheets, and vice versa.",
    category: "converter",
    icon: "FileSpreadsheet",
    tags: ["json", "csv", "convert", "format", "parse"],
    isPopular: true
  },
  {
    id: "json-yaml-converter",
    name: "JSON ↔ YAML Converter",
    description: "Interconvert structural hierarchies between JSON format and human-friendly YAML syntax.",
    category: "converter",
    icon: "FileCode",
    tags: ["json", "yaml", "convert", "format", "parse"]
  },
  {
    id: "json-xml-converter",
    name: "JSON ↔ XML Converter",
    description: "Translate hierarchical JSON nodes to XML tag sets, and vice versa.",
    category: "converter",
    icon: "Code2",
    tags: ["json", "xml", "convert", "format", "parse"]
  },
  {
    id: "csv-to-table-viewer",
    name: "CSV to Table Viewer",
    description: "Parse CSV strings to display them in clean, searchable visual web tables.",
    category: "converter",
    icon: "Table",
    tags: ["csv", "table", "viewer", "grid", "parse"]
  },
  {
    id: "markdown-to-html-preview",
    name: "Markdown Previewer",
    description: "Render markdown inputs side-by-side with formatted CSS visual displays.",
    category: "converter",
    icon: "Eye",
    tags: ["markdown", "html", "preview", "render"]
  },
  {
    id: "html-to-plain-text",
    name: "HTML to Plain Text",
    description: "Strip and extract tag-free text content from raw HTML markup files.",
    category: "converter",
    icon: "AlignJustify",
    tags: ["html", "text", "extract", "strip", "clean"]
  },
  {
    id: "json-formatter-validator",
    name: "JSON Formatter",
    description: "Beautify, validate, minify, and spot errors in JSON code blocks.",
    category: "converter",
    icon: "FileJson",
    tags: ["json", "format", "beautify", "validate", "minify"],
    isPopular: true
  },
  {
    id: "xml-formatter-validator",
    name: "XML Formatter",
    description: "Prettify, format, or minify XML markup tags, validating basic syntax.",
    category: "converter",
    icon: "Code",
    tags: ["xml", "format", "beautify", "validate"]
  },
  {
    id: "yaml-validator",
    name: "YAML Validator",
    description: "Check correctness, syntax hierarchies, and error locations in YAML inputs.",
    category: "converter",
    icon: "CheckSquare",
    tags: ["yaml", "validate", "lint", "syntax"]
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format structured SQL queries (SELECT, JOINs) for clean readability.",
    category: "converter",
    icon: "Database",
    tags: ["sql", "query", "format", "beautify", "database"]
  },
  {
    id: "css-formatter-minifier",
    name: "CSS Formatter / Minifier",
    description: "Beautify stylesheet listings or compress CSS definitions for deployment.",
    category: "converter",
    icon: "Scissors",
    tags: ["css", "format", "beautify", "minify", "compress"]
  },
  {
    id: "js-formatter-minifier",
    name: "JS Formatter / Minifier",
    description: "Beautify javascript syntax trees or minify variables to optimize footprint.",
    category: "converter",
    icon: "Settings2",
    tags: ["js", "javascript", "format", "beautify", "minify"]
  },
  {
    id: "html-formatter-minifier",
    name: "HTML Formatter / Minifier",
    description: "Indent HTML DOM trees logically or strip comments/spaces for speed.",
    category: "converter",
    icon: "Braces",
    tags: ["html", "format", "beautify", "minify", "compress"]
  },
  {
    id: "number-base-converter",
    name: "Number Base Converter",
    description: "Translate numeric representation among Binary, Octal, Decimal, and Hex bases.",
    category: "converter",
    icon: "Layers",
    tags: ["math", "base", "binary", "hex", "octal", "decimal"]
  },
  {
    id: "ascii-to-hex-binary",
    name: "ASCII to Hex / Binary",
    description: "Encode text strings into hexadecimal grids or byte streams, and vice versa.",
    category: "converter",
    icon: "CornerDownRight",
    tags: ["ascii", "hex", "binary", "text", "encode"]
  },

  // === SECURITY TOOLS ===
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes using the Web Crypto API.",
    category: "security",
    icon: "Hash",
    tags: ["hash", "md5", "sha256", "crypto", "sha512"],
    isPopular: true
  },
  {
    id: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode or decode strings to/from Base64 standard ASCII representations.",
    category: "security",
    icon: "ShieldCheck",
    tags: ["base64", "encode", "decode", "crypt"]
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Percent-encode queries to safe URL paths, and decode encoded URL formats.",
    category: "security",
    icon: "Link2",
    tags: ["url", "encode", "decode", "percent"]
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Inspect header, payload, and signatures of Json Web Tokens locally.",
    category: "security",
    icon: "Key",
    tags: ["jwt", "token", "decode", "payload", "auth"],
    isPopular: true
  },
  {
    id: "html-entity-encoder-decoder",
    name: "HTML Entity Encoder/Decoder",
    description: "Convert special characters (like <, >) to HTML entity representation codes, and vice versa.",
    category: "security",
    icon: "HelpCircle",
    tags: ["html", "entity", "escape", "unescape"]
  },
  {
    id: "password-strength-checker",
    name: "Password Strength Checker",
    description: "Evaluate password entropy, checking character splits and time-to-crack metrics.",
    category: "security",
    icon: "ShieldAlert",
    tags: ["password", "strength", "check", "entropy", "security"]
  },
  {
    id: "text-encrypter-decrypter",
    name: "AES Encrypter/Decrypter",
    description: "Encrypt and decrypt messages locally using robust AES-GCM standard keys.",
    category: "security",
    icon: "Lock",
    tags: ["crypto", "encrypt", "decrypt", "aes", "password"]
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate customized high-contrast QR Codes for links, text, or emails.",
    category: "security",
    icon: "QrCode",
    tags: ["qr", "qrcode", "generate", "code", "barcode"],
    isPopular: true
  },
  {
    id: "qr-code-reader",
    name: "QR Code Reader",
    description: "Read, scan, or extract URLs from QR codes using files or camera streams.",
    category: "security",
    icon: "Scan",
    tags: ["qr", "scan", "reader", "camera", "upload"]
  },
  {
    id: "bcrypt-hash-generator",
    name: "Bcrypt Hash Generator",
    description: "Compute bcrypt hashes with adjustable cost rounds to verify secure passwords.",
    category: "security",
    icon: "Fingerprint",
    tags: ["bcrypt", "hash", "password", "salt", "rounds"]
  },
  {
    id: "hmac-generator",
    name: "HMAC Generator",
    description: "Calculate Keyed-Hash Message Authentication Codes (HMAC) with custom secret keys.",
    category: "security",
    icon: "Lock",
    tags: ["hmac", "sha256", "signature", "key", "crypto"]
  },

  // === WEB TOOLS ===
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate standard SEO head tags: titles, meta descriptions, and crawling indices.",
    category: "web",
    icon: "Tags",
    tags: ["seo", "meta", "tag", "html", "head"],
    isPopular: true
  },
  {
    id: "open-graph-preview",
    name: "Open Graph Preview",
    description: "Mock preview card renderings for Twitter, Facebook, and Discord link shares.",
    category: "web",
    icon: "Laptop",
    tags: ["og", "preview", "social", "meta", "card"]
  },
  {
    id: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Build crawlers-friendly robots.txt rules allowing or disallowing search bots.",
    category: "web",
    icon: "Bot",
    tags: ["robots", "crawl", "seo", "google", "sitemap"]
  },
  {
    id: "sitemap-generator",
    name: "Sitemap Generator",
    description: "Build sitemap.xml listings quickly by manually inserting URL lists.",
    category: "web",
    icon: "Network",
    tags: ["sitemap", "xml", "seo", "url", "links"]
  },
  {
    id: "http-status-codes",
    name: "HTTP Status Code Reference",
    description: "Look up definitions, categories, and descriptions of all standard HTTP return codes.",
    category: "web",
    icon: "HelpCircle",
    tags: ["http", "status", "api", "reference"]
  },
  {
    id: "mime-types",
    name: "MIME Type Reference",
    description: "Search file extensions to match their proper Web Standard MIME Type headers.",
    category: "web",
    icon: "FileCode",
    tags: ["mime", "type", "extension", "headers"]
  },
  {
    id: "url-parser",
    name: "URL Parser",
    description: "Break down URL strings into segments: protocol, hostname, search parameters, hash, and port.",
    category: "web",
    icon: "Link",
    tags: ["url", "parse", "params", "query"]
  },
  {
    id: "utm-builder",
    name: "UTM Builder",
    description: "Generate trackable marketing URLs adding Google Analytics UTM tags.",
    category: "web",
    icon: "Bullhorn",
    tags: ["utm", "marketing", "analytics", "campaign", "url"]
  },
  {
    id: "favicon-generator",
    name: "Favicon Generator",
    description: "Generate multi-size browser favicon ICO or PNG sets from text or image uploads.",
    category: "web",
    icon: "Sparkles",
    tags: ["favicon", "ico", "image", "icon", "generate"]
  },
  {
    id: "htaccess-redirect-generator",
    name: "htaccess Redirect Generator",
    description: "Write Apache web server redirect rules (.htaccess) with standard expressions.",
    category: "web",
    icon: "Server",
    tags: ["htaccess", "apache", "redirect", "server", "rules"]
  },
  {
    id: "ip-address-info",
    name: "IP Address Info",
    description: "Look up geographic geolocation, hosting providers, and registry details of any IP.",
    category: "web",
    icon: "Compass",
    tags: ["ip", "geo", "network", "client", "dns"]
  },
  {
    id: "temp-mail",
    name: "Temporary Email Generator",
    description: "Generate disposable temporary email addresses and read incoming messages client-side.",
    category: "web",
    icon: "Mail",
    tags: ["mail", "email", "temp", "disposable", "inbox"],
    isPopular: true
  },

  // === COLOR TOOLS ===
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Inspect colors interactively outputs HEX, RGB, HSL, and HSV systems.",
    category: "color",
    icon: "Sliders",
    tags: ["color", "picker", "hex", "rgb", "hsl"],
    isPopular: true
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Convert color formats back and forth: HEX ↔ RGB ↔ HSL ↔ CMYK.",
    category: "color",
    icon: "RefreshCw",
    tags: ["color", "convert", "hex", "cmyk", "rgb"]
  },
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious color schemes: monochromatic, analogous, triad, or complementary.",
    category: "color",
    icon: "Layout",
    tags: ["color", "palette", "harmonies", "scheme"],
    isPopular: true
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Create visual linear or radial CSS gradients, copy cross-browser code.",
    category: "color",
    icon: "Layers",
    tags: ["color", "gradient", "css", "background", "design"]
  },
  {
    id: "contrast-checker",
    name: "Contrast Checker",
    description: "Verify readability scores between foreground and background colors using WCAG standards.",
    category: "color",
    icon: "Eye",
    tags: ["color", "wcag", "contrast", "accessibility", "a11y"]
  },
  {
    id: "tint-shade-generator",
    name: "Tint & Shade Generator",
    description: "Produce lighter tint and darker shade steps from any primary color hex.",
    category: "color",
    icon: "Sun",
    tags: ["color", "tints", "shades", "lightness", "darkness"]
  },
  {
    id: "color-blindness-simulator",
    name: "Color Blindness Simulator",
    description: "Simulate how images look to individuals with deuteranopia, protanopia, or tritanopia.",
    category: "color",
    icon: "Sparkles",
    tags: ["color", "blindness", "simulate", "accessibility"]
  },
  {
    id: "css-box-shadow-generator",
    name: "CSS Box Shadow Generator",
    description: "Create modern CSS box shadows visually adjusting offsets, blur, and opacity.",
    category: "color",
    icon: "Copy",
    tags: ["css", "shadow", "box", "styles", "generator"]
  },
  {
    id: "css-border-radius-generator",
    name: "CSS Border Radius Generator",
    description: "Visually sculpt complex border-radius geometries, copy Tailwind/CSS code.",
    category: "color",
    icon: "Square",
    tags: ["css", "border", "radius", "styles", "shape"]
  },
  {
    id: "css-text-shadow-generator",
    name: "CSS Text Shadow Generator",
    description: "Create beautiful, crisp text shadows adjusting offsets, blur, and opacity.",
    category: "color",
    icon: "Type",
    tags: ["css", "shadow", "text", "styles", "font"]
  },

  // === DATA TOOLS ===
  {
    id: "json-viewer",
    name: "JSON Viewer",
    description: "View and traverse complex JSON data in a collapsible tree display.",
    category: "data",
    icon: "FileJson",
    tags: ["json", "viewer", "tree", "collapsible", "data"],
    isPopular: true
  },
  {
    id: "csv-viewer-editor",
    name: "CSV Viewer & Editor",
    description: "Open CSV files in an interactive, spreadsheet-like data grid to edit columns.",
    category: "data",
    icon: "Grid",
    tags: ["csv", "viewer", "editor", "excel", "sheet"]
  },
  {
    id: "table-generator",
    name: "Table Generator",
    description: "Interactively design tables, outputting markup HTML code tags.",
    category: "data",
    icon: "Table",
    tags: ["html", "table", "generator", "markup", "rows"]
  },
  {
    id: "chart-maker",
    name: "Chart Maker",
    description: "Produce responsive bar, line, and pie charts locally, download as image.",
    category: "data",
    icon: "BarChart3",
    tags: ["data", "chart", "graph", "visualize", "plot"]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions in real-time, displaying matches and group details.",
    category: "data",
    icon: "SearchCode",
    tags: ["regex", "test", "regexp", "match", "groups"],
    isPopular: true
  },
  {
    id: "cron-expression-builder",
    name: "Cron Expression Builder",
    description: "Interactively generate cron schedule timings and read human explanations.",
    category: "data",
    icon: "Clock",
    tags: ["cron", "schedule", "timer", "builder"]
  },
  {
    id: "html-color-names",
    name: "HTML Color Names",
    description: "Explore the full directory of standard named colors, their hex codes, and categories.",
    category: "data",
    icon: "Palette",
    tags: ["color", "names", "html", "css", "list"]
  },
  {
    id: "unicode-lookup",
    name: "Unicode Character Lookup",
    description: "Search and inspect symbols, characters, and escape strings by name.",
    category: "data",
    icon: "Type",
    tags: ["unicode", "char", "lookup", "symbols", "utf8"]
  },
  {
    id: "emoji-finder",
    name: "Emoji Finder & Copier",
    description: "Browse emojis by category or search term, copy with a single tap.",
    category: "data",
    icon: "Smile",
    tags: ["emoji", "finder", "copy", "search", "list"]
  },

  // === DEVELOPER TOOLS ===
  {
    id: "code-diff-viewer",
    name: "Code Diff Viewer",
    description: "Compare code listings side-by-side highlighting line additions and updates.",
    category: "developer",
    icon: "Diff",
    tags: ["code", "diff", "compare", "file", "github"],
    isPopular: true
  },
  {
    id: "syntax-highlighter",
    name: "Syntax Highlighter",
    description: "Paste raw code to highlight syntax, copy beautiful, formatted HTML files.",
    category: "developer",
    icon: "FileCode2",
    tags: ["code", "highlight", "syntax", "html", "theme"]
  },
  {
    id: "character-escape-tool",
    name: "Character Escape Tool",
    description: "Escape HTML, JavaScript, and JSON strings for raw variables.",
    category: "developer",
    icon: "Sparkles",
    tags: ["code", "escape", "unescape", "json", "javascript"]
  },
  {
    id: "http-header-analyzer",
    name: "HTTP Header Analyzer",
    description: "Parse and inspect raw key-value headers to identify security and cache configurations.",
    category: "developer",
    icon: "Menu",
    tags: ["http", "headers", "parse", "security", "cache"]
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Interconvert unix epoch integers and human date strings.",
    category: "developer",
    icon: "CalendarClock",
    tags: ["unix", "epoch", "time", "date", "timestamp"],
    isPopular: true
  },
  {
    id: "string-hash-visualizer",
    name: "String Hash Visualizer",
    description: "Convert a string to a unique visual identicon hash signature.",
    category: "developer",
    icon: "Hash",
    tags: ["visual", "hash", "identicon", "string", "avatar"]
  },
  {
    id: "css-specificity-calculator",
    name: "CSS Specificity Calculator",
    description: "Calculate specificity weights of CSS selectors, listing ids, classes, and elements.",
    category: "developer",
    icon: "Target",
    tags: ["css", "specificity", "weight", "selector"]
  },
  {
    id: "flexbox-playground",
    name: "Flexbox Visual Playground",
    description: "Experiment and generate CSS properties for flex direction, alignments, and gap spaces.",
    category: "developer",
    icon: "LayoutGrid",
    tags: ["css", "flex", "flexbox", "visual", "playground"]
  },
  {
    id: "grid-playground",
    name: "CSS Grid Visual Playground",
    description: "Experiment and generate code for column tracks, row alignments, and gap layouts.",
    category: "developer",
    icon: "Grid3X3",
    tags: ["css", "grid", "visual", "playground"]
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    description: "Compute dimension proportions, scaling width and height parameters.",
    category: "developer",
    icon: "AspectRatio",
    tags: ["dimension", "ratio", "image", "scale", "aspect"]
  },
  {
    id: "pixels-to-rem",
    name: "Pixels to REM Converter",
    description: "Convert pixels to rem and em sizes relative to standard font settings.",
    category: "developer",
    icon: "Activity",
    tags: ["css", "pixels", "rem", "em", "font", "size"]
  }
];
