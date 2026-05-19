"use client";

import React, { useState, useEffect } from "react";
import { tools, categories, Tool, ToolCategory } from "@/lib/tools.config";
import ToolCard from "@/components/ToolCard";
import { LucideIcon } from "@/components/LucideIcon";
import { Search, Sparkles, Flame, History, Grid2X2 } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all");
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  // Load recently used tools from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("recent-tools");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const resolved = ids
          .map((id) => tools.find((t) => t.id === id))
          .filter((t): t is Tool => !!t)
          .slice(0, 4); // Limit to 4 recent
        setRecentTools(resolved);
      }
    } catch (e) {
      console.error("Failed to load recent tools", e);
    }
  }, []);

  // Filter logic
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const popularTools = tools.filter((t) => t.isPopular).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-[11px] font-medium text-neutral-400">
          <Sparkles size={12} className="text-indigo-400" />
          <span>100% Secure & Private. All processing done client-side.</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Every tool you need, <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            right in your browser.
          </span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          No file uploads, no account registration. Compress images, split PDFs, format XML, encrypt strings, parse cron patterns, and more completely offline.
        </p>

        {/* Big Search Bar */}
        <div className="max-w-lg mx-auto relative group mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-lg opacity-50 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-[#121212] border border-neutral-800 rounded-xl px-4 py-3.5 focus-within:border-neutral-700 transition-colors">
            <Search className="text-neutral-500 w-5 h-5 flex-shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search from 124 instant browser tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-neutral-500 hover:text-white transition-colors px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Recently Used Tools (if any) */}
      {recentTools.length > 0 && searchQuery === "" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
            <History size={16} className="text-blue-400" />
            <h2>Recently Used</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Featured / Popular Tools (only show when no search/filter is active) */}
      {searchQuery === "" && selectedCategory === "all" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
            <Flame size={16} className="text-amber-500" />
            <h2>Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Filter Tabs */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Grid2X2 size={16} className="text-indigo-500" />
            <h2>Explore Categories</h2>
          </div>
          <span className="text-xs text-neutral-500">
            Showing {filteredTools.length} of {tools.length} tools
          </span>
        </div>

        {/* Scrollable Category List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 whitespace-nowrap scrollbar-thin">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
              selectedCategory === "all"
                ? "bg-white text-black border-white"
                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
            }`}
          >
            All Tools ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-white text-black border-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <LucideIcon name={cat.icon} size={14} className={isSelected ? "text-black" : cat.colorClass} />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Tools Display Grid */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950">
            <p className="text-sm text-neutral-500">No tools match your active filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs font-medium text-white rounded-lg hover:border-neutral-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
