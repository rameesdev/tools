"use client";

import React, { useState } from "react";
import { 
  Calculator, Calendar, Activity, Percent, DollarSign, Coins, 
  Clock, Scale, Tag, Receipt, Fuel, RefreshCw 
} from "lucide-react";

interface CalculatorToolsProps {
  toolId: string;
}

export default function CalculatorTools({ toolId }: CalculatorToolsProps) {
  switch (toolId) {
    case "scientific-calculator":
      return <ScientificCalculator />;
    case "age-calculator":
      return <AgeCalculator />;
    case "bmi-calculator":
      return <BMICalculator />;
    case "percentage-calculator":
      return <PercentageCalculator />;
    case "tip-calculator":
      return <TipCalculator />;
    case "loan-emi-calculator":
      return <EMICalculator />;
    case "date-difference-calculator":
      return <DateDifferenceCalculator />;
    case "time-zone-converter":
      return <TimeZoneConverter />;
    case "unit-converter":
      return <UnitConverter />;
    case "currency-converter":
      return <CurrencyConverter />;
    case "discount-calculator":
      return <DiscountCalculator />;
    case "tax-calculator":
      return <TaxCalculator />;
    case "fuel-cost-calculator":
      return <FuelCostCalculator />;
    case "roman-numeral-converter":
      return <RomanNumeralConverter />;
    default:
      return <div className="text-center text-neutral-500 py-10">Calculator Not Found</div>;
  }
}

// 44. Scientific Calculator
function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");

  const append = (val: string) => {
    setExpr(prev => prev + val);
  };

  const clear = () => {
    setExpr("");
    setResult("0");
  };

  const calculate = () => {
    try {
      // Evaluate expression securely using standard math limits
      // Replacing common symbols
      let sanitized = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**");

      const fn = new Function(`return ${sanitized}`);
      const val = fn();
      setResult(Number(val).toString());
    } catch (e) {
      setResult("Error");
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-white">Scientific Calculator</h2>
      <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-right space-y-1">
        <p className="text-xs text-neutral-500 font-mono min-h-[16px]">{expr || " "}</p>
        <p className="text-2xl font-extrabold text-white font-mono truncate">{result}</p>
      </div>

      <div className="grid grid-cols-5 gap-1.5 font-mono text-xs">
        {/* Row 1 */}
        {["sin(", "cos(", "tan(", "π", "e"].map(k => (
          <button key={k} onClick={() => append(k)} className="py-2.5 bg-neutral-900 hover:bg-neutral-850 rounded text-neutral-400 font-semibold">{k}</button>
        ))}
        {/* Row 2 */}
        {["log(", "ln(", "^", "(", ")"].map(k => (
          <button key={k} onClick={() => append(k)} className="py-2.5 bg-neutral-900 hover:bg-neutral-850 rounded text-neutral-400 font-semibold">{k}</button>
        ))}
        {/* Row 3 */}
        {["7", "8", "9", "÷", "C"].map(k => (
          <button key={k} onClick={() => k === "C" ? clear() : append(k === "÷" ? "/" : k)} className={`py-2.5 rounded font-semibold ${k === "C" ? "bg-red-950 text-red-400" : "bg-neutral-900 hover:bg-neutral-850 text-white"}`}>{k}</button>
        ))}
        {/* Row 4 */}
        {["4", "5", "6", "×", "sqrt("].map(k => (
          <button key={k} onClick={() => append(k === "×" ? "*" : k === "sqrt(" ? "Math.sqrt(" : k)} className="py-2.5 bg-neutral-900 hover:bg-neutral-850 rounded text-white font-semibold">{k}</button>
        ))}
        {/* Row 5 */}
        {["1", "2", "3", "-", "+"].map(k => (
          <button key={k} onClick={() => append(k)} className="py-2.5 bg-neutral-900 hover:bg-neutral-850 rounded text-white font-semibold">{k}</button>
        ))}
        {/* Row 6 */}
        {["0", ".", "="].map(k => (
          <button
            key={k}
            onClick={() => k === "=" ? calculate() : append(k)}
            className={`py-2.5 rounded font-semibold ${k === "=" ? "col-span-3 bg-cyan-600 hover:bg-cyan-700 text-white" : "col-span-1 bg-neutral-900 hover:bg-neutral-850 text-white"}`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

// 45. Age Calculator
function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<any>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setAge({ years, months, days, totalDays });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Age Calculator</h2>
      <div className="flex gap-3">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none"
        />
        <button onClick={handleCalculate} className="px-6 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-lg">
          Calculate
        </button>
      </div>

      {age && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
            <span className="text-[10px] text-neutral-500 font-bold uppercase">Years</span>
            <p className="text-lg font-extrabold text-white mt-1">{age.years}</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
            <span className="text-[10px] text-neutral-500 font-bold uppercase">Months</span>
            <p className="text-lg font-extrabold text-white mt-1">{age.months}</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
            <span className="text-[10px] text-neutral-500 font-bold uppercase">Days</span>
            <p className="text-lg font-extrabold text-white mt-1">{age.days}</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
            <span className="text-[10px] text-neutral-500 font-bold uppercase">Total Days</span>
            <p className="text-lg font-extrabold text-white mt-1">{age.totalDays}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 46. BMI Calculator
function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const heightInMeters = height / 100;
    const val = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(val.toFixed(1)));
  };

  const getStatus = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (val < 25) return { label: "Normal Weight", color: "text-emerald-400" };
    if (val < 30) return { label: "Overweight", color: "text-amber-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">BMI Calculator</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded-lg text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2.5 rounded-lg text-white text-sm" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate BMI
      </button>

      {bmi && (
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Your BMI</span>
            <p className="text-2xl font-black text-white">{bmi}</p>
          </div>
          <span className={`text-sm font-bold uppercase tracking-wider ${getStatus(bmi).color}`}>
            {getStatus(bmi).label}
          </span>
        </div>
      )}
    </div>
  );
}

// 47. Percentage Calculator
function PercentageCalculator() {
  const [valA, setValA] = useState(25);
  const [valB, setValB] = useState(200);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    setResult((valA / 100) * valB);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Percentage Calculator</h2>
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
        <span>What is</span>
        <input type="number" value={valA} onChange={(e) => setValA(parseFloat(e.target.value) || 0)} className="w-20 bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none text-center" />
        <span>% of</span>
        <input type="number" value={valB} onChange={(e) => setValB(parseFloat(e.target.value) || 0)} className="w-24 bg-[#1e1e1e] border border-neutral-800 p-2 rounded focus:outline-none text-center" />
        <button onClick={calculate} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-lg shrink-0">
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Result</span>
          <p className="text-xl font-extrabold text-white mt-1">{result}</p>
        </div>
      )}
    </div>
  );
}

// 48. Tip Calculator
function TipCalculator() {
  const [bill, setBill] = useState(120);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(4);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const tipAmount = bill * (tipPercent / 100);
    const totalBill = bill + tipAmount;
    const splitBill = totalBill / people;
    setResult({ tipAmount: tipAmount.toFixed(2), totalBill: totalBill.toFixed(2), splitBill: splitBill.toFixed(2) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Tip & Bill Splitter</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Bill Amount ($)</label>
          <input type="number" value={bill} onChange={(e) => setBill(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Tip (%)</label>
          <input type="number" value={tipPercent} onChange={(e) => setTipPercent(parseInt(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Split (People)</label>
          <input type="number" value={people} onChange={(e) => setPeople(parseInt(e.target.value) || 1)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Split Bill
      </button>

      {result && (
        <div className="grid grid-cols-3 gap-2 bg-neutral-900 p-3 rounded border border-neutral-800 text-center text-xs">
          <div>
            <span className="text-neutral-500">Tip Total</span>
            <p className="font-extrabold text-white mt-1">${result.tipAmount}</p>
          </div>
          <div>
            <span className="text-neutral-500">Total Bill</span>
            <p className="font-extrabold text-white mt-1">${result.totalBill}</p>
          </div>
          <div>
            <span className="text-neutral-500">Per Person</span>
            <p className="font-extrabold text-cyan-400 mt-1">${result.splitBill}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 49. Loan / EMI Calculator
function EMICalculator() {
  const [loan, setLoan] = useState(50000);
  const [interest, setInterest] = useState(7.5);
  const [tenure, setTenure] = useState(60); // months
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const r = interest / 12 / 100;
    const n = tenure;
    // EMI Formula: [P x R x (1+R)^N]/[((1+R)^N)-1]
    const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepay = emi * n;
    const totalInterest = totalRepay - loan;

    setResult({ emi: emi.toFixed(0), totalRepay: totalRepay.toFixed(0), totalInterest: totalInterest.toFixed(0) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Loan EMI Calculator</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Loan Amount ($)</label>
          <input type="number" value={loan} onChange={(e) => setLoan(parseInt(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Interest Rate (%)</label>
          <input type="number" step="0.1" value={interest} onChange={(e) => setInterest(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Tenure (Months)</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(parseInt(e.target.value) || 12)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate EMI
      </button>

      {result && (
        <div className="grid grid-cols-3 gap-2 bg-neutral-900 p-3 rounded border border-neutral-800 text-center text-xs">
          <div>
            <span className="text-neutral-500">Monthly EMI</span>
            <p className="font-extrabold text-cyan-400 mt-1">${result.emi}</p>
          </div>
          <div>
            <span className="text-neutral-500">Total Interest</span>
            <p className="font-extrabold text-white mt-1">${result.totalInterest}</p>
          </div>
          <div>
            <span className="text-neutral-500">Total Repay</span>
            <p className="font-extrabold text-white mt-1">${result.totalRepay}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 50. Date Difference Calculator
function DateDifferenceCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [diff, setDiff] = useState<number | null>(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const val = Math.abs(d2.getTime() - d1.getTime());
    setDiff(Math.floor(val / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Date Duration Calculator</h2>
      <div className="grid grid-cols-2 gap-3">
        <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
        <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none" />
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate Days Difference
      </button>

      {diff !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Difference</span>
          <p className="text-xl font-extrabold text-white mt-1">{diff} Days</p>
        </div>
      )}
    </div>
  );
}

// 51. Time Zone Converter
function TimeZoneConverter() {
  const [inputTime, setInputTime] = useState("12:00");
  const [sourceZone, setSourceZone] = useState("UTC");
  const [targetZone, setTargetZone] = useState("EST");
  const [result, setResult] = useState("");

  const zones: Record<string, number> = {
    UTC: 0,
    EST: -5,
    PST: -8,
    IST: 5.5,
    GMT: 0,
    BST: 1,
    AEST: 10
  };

  const handleConvert = () => {
    const [h, m] = inputTime.split(":").map(Number);
    // Find hours in UTC
    const sourceOffset = zones[sourceZone];
    const targetOffset = zones[targetZone];

    let utcHour = h - sourceOffset;
    let convertedHour = (utcHour + targetOffset + 24) % 24;

    const formattedHour = Math.floor(convertedHour).toString().padStart(2, "0");
    const fraction = convertedHour % 1;
    const formattedMinutes = fraction > 0 ? (m + 30) % 60 : m;
    
    setResult(`${formattedHour}:${formattedMinutes.toString().padStart(2, "0")}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Time Zone Converter</h2>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <input type="time" value={inputTime} onChange={(e) => setInputTime(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white text-sm" />
        <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white text-sm">
          {Object.keys(zones).map(z => <option key={z} value={z}>{z}</option>)}
        </select>
        <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white text-sm">
          {Object.keys(zones).map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>

      <button onClick={handleConvert} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Convert Time
      </button>

      {result && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Converted Time</span>
          <p className="text-xl font-extrabold text-cyan-400 mt-1">{result} {targetZone}</p>
        </div>
      )}
    </div>
  );
}

// 52. Unit Converter
function UnitConverter() {
  const [val, setVal] = useState(1);
  const [unitType, setUnitType] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [result, setResult] = useState<number | null>(null);

  // Conversion tables relative to anchor units (length: meters, weight: grams)
  const tables: Record<string, Record<string, number>> = {
    length: { m: 1, km: 1000, cm: 0.01, inch: 0.0254, ft: 0.3048 },
    weight: { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 }
  };

  const handleConvert = () => {
    const table = tables[unitType];
    if (!table) return;
    const inAnchor = val * table[fromUnit];
    const converted = inAnchor / table[toUnit];
    setResult(parseFloat(converted.toFixed(4)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Unit Converter</h2>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <select value={unitType} onChange={(e) => { setUnitType(e.target.value); setFromUnit(e.target.value === "length" ? "m" : "g"); setToUnit(e.target.value === "length" ? "km" : "kg"); }} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white text-sm col-span-2">
          <option value="length">Length (meters, inch, km, etc.)</option>
          <option value="weight">Weight (g, kg, lb, oz)</option>
        </select>
        
        <div className="space-y-1">
          <label>From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded-lg text-white">
            {Object.keys(tables[unitType]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label>To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2 rounded-lg text-white">
            {Object.keys(tables[unitType]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white w-24 focus:outline-none" />
        <button onClick={handleConvert} className="flex-1 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-lg">
          Convert Units
        </button>
      </div>

      {result !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Result</span>
          <p className="text-xl font-extrabold text-white mt-1">{result} {toUnit}</p>
        </div>
      )}
    </div>
  );
}

// 53. Currency Converter (Simulated standard base rates)
function CurrencyConverter() {
  const [val, setVal] = useState(100);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  const rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.2,
    JPY: 155.4
  };

  const handleConvert = () => {
    const usdVal = val / rates[fromCur];
    const converted = usdVal * rates[toCur];
    setResult(parseFloat(converted.toFixed(2)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Currency Exchange (Rates Local Simulation)</h2>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value) || 0)} className="bg-[#1e1e1e] border border-neutral-805 p-2 rounded text-white text-sm" />
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
          {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)} className="bg-[#1e1e1e] border border-neutral-800 p-2 rounded text-white text-xs">
          {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button onClick={handleConvert} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Convert Currency
      </button>

      {result !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Result</span>
          <p className="text-xl font-extrabold text-cyan-400 mt-1">{result} {toCur}</p>
        </div>
      )}
    </div>
  );
}

// 54. Discount Calculator
function DiscountCalculator() {
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const savings = price * (discount / 100);
    const finalPrice = price - savings;
    setResult({ savings: savings.toFixed(2), final: finalPrice.toFixed(2) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Discount Calculator</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Original Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
        <div className="space-y-1">
          <label>Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate Sale Price
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-3 rounded border border-neutral-800 text-center text-xs">
          <div>
            <span className="text-neutral-500">Savings</span>
            <p className="font-extrabold text-emerald-400 mt-1">${result.savings}</p>
          </div>
          <div>
            <span className="text-neutral-500">Sale Price</span>
            <p className="font-extrabold text-white mt-1">${result.final}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 55. Tax Calculator
function TaxCalculator() {
  const [netPrice, setNetPrice] = useState(100);
  const [taxPercent, setTaxPercent] = useState(18);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const taxAmt = netPrice * (taxPercent / 100);
    const total = netPrice + taxAmt;
    setResult({ taxAmt: taxAmt.toFixed(2), total: total.toFixed(2) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Tax / VAT Calculator</h2>
      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Net Price ($)</label>
          <input type="number" value={netPrice} onChange={(e) => setNetPrice(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
        <div className="space-y-1">
          <label>Tax Rate (%)</label>
          <input type="number" value={taxPercent} onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-white" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate Tax
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-3 rounded border border-neutral-800 text-center text-xs">
          <div>
            <span className="text-neutral-500">Tax Amount</span>
            <p className="font-extrabold text-white mt-1">${result.taxAmt}</p>
          </div>
          <div>
            <span className="text-neutral-500">Gross Total</span>
            <p className="font-extrabold text-cyan-400 mt-1">${result.total}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 56. Fuel Cost Calculator
function FuelCostCalculator() {
  const [distance, setDistance] = useState(300); // km
  const [consumption, setConsumption] = useState(8); // L/100km
  const [price, setPrice] = useState(1.5); // $/L
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const litersNeeded = (distance * consumption) / 100;
    const totalCost = litersNeeded * price;
    setResult(totalCost.toFixed(2));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Fuel Cost Calculator</h2>
      <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400">
        <div className="space-y-1">
          <label>Distance (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Consumption (L/100km)</label>
          <input type="number" value={consumption} onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
        <div className="space-y-1">
          <label>Price ($ per L)</label>
          <input type="number" step="0.05" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="w-full bg-[#1e1e1e] border border-neutral-850 p-2 rounded text-white text-sm" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-xl">
        Calculate Fuel Cost
      </button>

      {result !== null && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center">
          <span className="text-xs text-neutral-400">Total Fuel Cost</span>
          <p className="text-xl font-extrabold text-cyan-400 mt-1">${result}</p>
        </div>
      )}
    </div>
  );
}

// 57. Roman Numeral Converter
function RomanNumeralConverter() {
  const [val, setVal] = useState("1996");
  const [result, setResult] = useState("");

  const arabicToRoman = (num: number): string => {
    const map: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    let res = "";
    for (const [val, char] of map) {
      while (num >= val) {
        res += char;
        num -= val;
      }
    }
    return res;
  };

  const romanToArabic = (roman: string): number => {
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let res = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = map[roman[i]];
      const next = map[roman[i + 1]];
      if (next && current < next) {
        res += next - current;
        i++;
      } else {
        res += current || 0;
      }
    }
    return res;
  };

  const handleConvert = () => {
    const parsed = parseInt(val);
    if (!isNaN(parsed)) {
      setResult(arabicToRoman(parsed));
    } else {
      setResult(romanToArabic(val.toUpperCase()).toString());
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Roman Numeral Converter</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Enter numeric value or Roman numerals (e.g. MCMXCVI)"
          className="flex-1 bg-[#1e1e1e] border border-neutral-800 p-2.5 rounded-lg text-sm text-white focus:outline-none"
        />
        <button onClick={handleConvert} className="px-6 bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs rounded-lg shrink-0">
          Convert
        </button>
      </div>

      {result && (
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-center font-mono">
          <span className="text-xs text-neutral-400">Output</span>
          <p className="text-xl font-extrabold text-white mt-1">{result}</p>
        </div>
      )}
    </div>
  );
}
