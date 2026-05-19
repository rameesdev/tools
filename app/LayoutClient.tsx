"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { tools } from "@/lib/tools.config";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import { Search, X, Command } from "lucide-react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keybind listener for CMD+K or CTRL+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when search modal is opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Filter tools
  const filteredTools = searchQuery
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSelectTool = (toolId: string) => {
    setIsSearchOpen(false);
    router.push(`/tools/${toolId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredTools.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelectTool(filteredTools[selectedIndex].id);
      }
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row relative">
      {/* Sidebar Navigation */}
      <Sidebar onSearchToggle={() => setIsSearchOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0a0a0a] min-h-screen pt-16 md:pt-0 overflow-y-auto">
        <div className="min-h-full pb-16">{children}</div>
      </main>

      {/* Search Overlay Dialog (Cmd+K Modal) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Box */}
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl w-full max-w-xl shadow-2xl relative z-10 overflow-hidden animate-fade-in">
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800/80">
              <Search className="text-neutral-500 w-5 h-5 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tools... (e.g. PDF merger, base64)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-neutral-500">
                <Command size={10} />
                <span>K</span>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 hover:bg-neutral-900 rounded text-neutral-400 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results Grid */}
            <div className="max-h-[360px] overflow-y-auto p-2">
              {searchQuery === "" ? (
                <div className="py-12 text-center text-xs text-neutral-500">
                  <p>Type a keyword or category to browse all 124 tools.</p>
                  <p className="mt-2 text-neutral-600">Press Esc to exit.</p>
                </div>
              ) : filteredTools.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-500">
                  <p>No tools matched your search parameters.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredTools.map((tool, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.id)}
                        className={`w-full flex items-center justify-between text-left p-3 rounded-lg text-sm transition-all ${
                          isSelected
                            ? "bg-neutral-900 text-white"
                            : "text-neutral-400 hover:bg-neutral-900/40 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded bg-neutral-800 text-neutral-300 ${
                              isSelected ? "bg-neutral-800 text-white" : ""
                            }`}
                          >
                            <LucideIcon name={tool.icon} size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{tool.name}</p>
                            <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-950 border border-neutral-900">
                          {tool.category}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2 bg-[#0a0a0a] border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-600">
              <div className="flex items-center gap-2">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <span>Total tools: {tools.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
