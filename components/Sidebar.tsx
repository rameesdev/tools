"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/tools.config";
import { LucideIcon } from "@/components/LucideIcon";
import { Menu, X, Search, ChevronLeft, ChevronRight, Home } from "lucide-react";

interface SidebarProps {
  onSearchToggle?: () => void;
}

export default function Sidebar({ onSearchToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCategoryColor = (catId: string, isActive: boolean) => {
    switch (catId) {
      case "pdf":
        return isActive 
          ? "text-rose-500 bg-rose-500/10 border-l-4 border-l-rose-500" 
          : "hover:text-rose-500 hover:bg-rose-500/10 text-neutral-400";
      case "image":
        return isActive 
          ? "text-emerald-500 bg-emerald-500/10 border-l-4 border-l-emerald-500" 
          : "hover:text-emerald-500 hover:bg-emerald-500/10 text-neutral-400";
      case "text":
        return isActive 
          ? "text-amber-500 bg-amber-500/10 border-l-4 border-l-amber-500" 
          : "hover:text-amber-500 hover:bg-amber-500/10 text-neutral-400";
      case "calculator":
        return isActive 
          ? "text-cyan-500 bg-cyan-500/10 border-l-4 border-l-cyan-500" 
          : "hover:text-cyan-500 hover:bg-cyan-500/10 text-neutral-400";
      case "converter":
        return isActive 
          ? "text-indigo-500 bg-indigo-500/10 border-l-4 border-l-indigo-500" 
          : "hover:text-indigo-500 hover:bg-indigo-500/10 text-neutral-400";
      case "security":
        return isActive 
          ? "text-red-500 bg-red-500/10 border-l-4 border-l-red-500" 
          : "hover:text-red-500 hover:bg-red-500/10 text-neutral-400";
      case "web":
        return isActive 
          ? "text-blue-500 bg-blue-500/10 border-l-4 border-l-blue-500" 
          : "hover:text-blue-500 hover:bg-blue-500/10 text-neutral-400";
      case "color":
        return isActive 
          ? "text-fuchsia-500 bg-fuchsia-500/10 border-l-4 border-l-fuchsia-500" 
          : "hover:text-fuchsia-500 hover:bg-fuchsia-500/10 text-neutral-400";
      case "data":
        return isActive 
          ? "text-violet-500 bg-violet-500/10 border-l-4 border-l-violet-500" 
          : "hover:text-violet-500 hover:bg-violet-500/10 text-neutral-400";
      case "developer":
        return isActive 
          ? "text-teal-500 bg-teal-500/10 border-l-4 border-l-teal-500" 
          : "hover:text-teal-500 hover:bg-teal-500/10 text-neutral-400";
      default:
        return "text-neutral-400 hover:text-white hover:bg-neutral-900";
    }
  };

  const isHomeActive = pathname === "/";

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neutral-800 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            TB
          </div>
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            ToolBox
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {onSearchToggle && (
            <button
              onClick={onSearchToggle}
              aria-label="Search tools"
              className="p-2 hover:bg-neutral-900 rounded-lg text-neutral-400 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 hover:bg-neutral-900 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-45"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-16 bottom-0 left-0 w-72 bg-[#0e0e0e] border-r border-neutral-800 z-50 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-between py-6 px-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-3">
                Main
              </span>
              <div className="mt-2 space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isHomeActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"
                  }`}
                >
                  <Home size={18} />
                  Home
                </Link>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-3">
                Categories
              </span>
              <nav className="mt-2 space-y-1">
                {categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.id}` || pathname.startsWith(`/category/${cat.id}`);
                  return (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${getCategoryColor(
                        cat.id,
                        isActive
                      )}`}
                    >
                      <LucideIcon name={cat.icon} size={18} />
                      {cat.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-4 mt-6">
            <div className="flex items-center gap-3 px-3 text-xs text-neutral-500">
              <span>All processing 100% local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-neutral-800 bg-[#070707] transition-all duration-300 sticky top-0 h-screen overflow-y-auto ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 flex-shrink-0">
              TB
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                ToolBox
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-neutral-900 rounded text-neutral-500 hover:text-white transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-6 px-4 space-y-7 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Main Section */}
            <div>
              {!isCollapsed && (
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3">
                  Main
                </span>
              )}
              <div className="mt-2 space-y-1">
                <Link
                  href="/"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isHomeActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title="Home"
                >
                  <Home size={18} />
                  {!isCollapsed && <span>Home</span>}
                </Link>
                {onSearchToggle && (
                  <button
                    onClick={onSearchToggle}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-900/50 hover:text-white transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                    title="Search Tools"
                  >
                    <Search size={18} />
                    {!isCollapsed && <span>Search</span>}
                  </button>
                )}
              </div>
            </div>

            {/* Categories Section */}
            <div>
              {!isCollapsed && (
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3">
                  Categories
                </span>
              )}
              <nav className="mt-2 space-y-1">
                {categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.id}` || pathname.startsWith(`/category/${cat.id}`);
                  return (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.id}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${getCategoryColor(
                        cat.id,
                        isActive
                      )} ${isCollapsed ? "justify-center" : ""}`}
                      title={cat.name}
                    >
                      <LucideIcon name={cat.icon} size={18} />
                      {!isCollapsed && <span className="truncate">{cat.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer Info */}
          <div className="border-t border-neutral-900 pt-4 mt-6">
            {!isCollapsed ? (
              <div className="px-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                  <span>Client-Side Only</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-neutral-600 leading-normal">
                  Your files never touch any server. Done in browser.
                </p>
              </div>
            ) : (
              <div className="flex justify-center" title="100% Client-Side Processing">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
