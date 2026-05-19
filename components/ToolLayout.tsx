"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tool, categories } from "@/lib/tools.config";
import { LucideIcon } from "@/components/LucideIcon";
import { ChevronRight, ArrowLeft, Info, Shield } from "lucide-react";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const router = useRouter();
  const categoryInfo = categories.find((c) => c.id === tool.category);
  const colorClass = categoryInfo?.colorClass || "text-blue-500";
  const bgClass = categoryInfo?.bgClass || "bg-blue-500/10";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 overflow-x-auto whitespace-nowrap py-1">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        {categoryInfo && (
          <>
            <Link
              href={`/category/${categoryInfo.id}`}
              className="hover:text-white transition-colors capitalize"
            >
              {categoryInfo.name}
            </Link>
            <ChevronRight size={12} />
          </>
        )}
        <span className="text-neutral-300 font-medium truncate">{tool.name}</span>
      </nav>

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${bgClass} ${colorClass} hidden sm:block`}>
            <LucideIcon name={tool.icon} size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {tool.name}
              </h1>
              {tool.isNew && (
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  New
                </span>
              )}
            </div>
            <p className="text-neutral-400 text-sm mt-1.5 leading-relaxed max-w-2xl">
              {tool.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors self-start md:self-center"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Work Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 md:p-6 shadow-xl relative overflow-hidden min-h-[350px]">
            {children}
          </div>
        </div>

        {/* Guide and Utility Panel */}
        <div className="space-y-6 lg:col-span-1">
          {/* Security & Speed Banner */}
          <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/10 flex gap-3 text-xs leading-relaxed text-emerald-400">
            <Shield className="w-5 h-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="font-semibold text-white">Privacy Assured</p>
              <p className="text-neutral-400 mt-0.5">
                All conversions and file operations occur directly inside your browser cache. No file uploads, no logs, complete local security.
              </p>
            </div>
          </div>

          {/* Quick FAQ / Guide Accordion */}
          <div className="border border-neutral-800 rounded-xl bg-[#121212] p-5 space-y-4">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <Info size={16} className={colorClass} />
              About {tool.name}
            </h3>
            
            <div className="text-xs text-neutral-400 space-y-3 leading-relaxed">
              <div>
                <p className="font-medium text-neutral-200 mb-0.5">How does it work?</p>
                <p>
                  This utility runs using compiled browser WebAssembly and HTML5 processing engines to handle parsing directly on your computer CPU.
                </p>
              </div>
              
              <div>
                <p className="font-medium text-neutral-200 mb-0.5">Supported formats & limits</p>
                <p>
                  Processes standard file formats. Maximum recommended file size is 50MB to ensure smooth local operation without browser lockups.
                </p>
              </div>

              <div>
                <p className="font-medium text-neutral-200 mb-0.5">Offline Availability</p>
                <p>
                  Because code runs client-side, the tool is fully available for offline operations once the assets are loaded from the cloud edge.
                </p>
              </div>
            </div>
          </div>

          {/* Featured tags */}
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
