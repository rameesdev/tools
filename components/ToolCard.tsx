import React from "react";
import Link from "next/link";
import { Tool, categories } from "@/lib/tools.config";
import { LucideIcon } from "@/components/LucideIcon";
import { ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryInfo = categories.find((c) => c.id === tool.category);
  
  // Dynamic color matching
  const colorClass = categoryInfo?.colorClass || "text-blue-500";
  const bgClass = categoryInfo?.bgClass || "bg-blue-500/10";
  
  // hover border animations based on category accent
  const hoverRingMap: Record<string, string> = {
    pdf: "hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.08)]",
    image: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]",
    text: "hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]",
    calculator: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]",
    converter: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]",
    security: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)]",
    web: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]",
    color: "hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.08)]",
    data: "hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]",
    developer: "hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.08)]",
  };

  const hoverClass = hoverRingMap[tool.category] || "hover:border-blue-500/50";

  return (
    <Link
      href={`/tools/${tool.id}`}
      className={`group block p-5 rounded-xl bg-[#121212] border border-neutral-800/80 transition-all duration-300 transform hover:-translate-y-1 ${hoverClass}`}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className={`p-2.5 rounded-lg ${bgClass} ${colorClass} transition-colors duration-300 group-hover:bg-opacity-20`}>
          <LucideIcon name={tool.icon} size={22} className="transform transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex items-center gap-1.5">
          {tool.isPopular && (
            <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Popular
            </span>
          )}
          {tool.isNew && (
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              New
            </span>
          )}
          <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <h3 className="font-semibold text-[15px] text-white group-hover:text-white transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed line-clamp-2">
        {tool.description}
      </p>

      {tool.tags && tool.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
