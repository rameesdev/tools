"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { tools, categories } from "@/lib/tools.config";
import ToolCard from "@/components/ToolCard";
import { LucideIcon } from "@/components/LucideIcon";
import { ChevronRight, ArrowLeft, Search, Sparkles } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.categoryId as string;
  const [searchQuery, setSearchQuery] = useState("");

  const category = categories.find((c) => c.id === categoryId);
  const categoryTools = tools.filter((t) => t.category === categoryId);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold text-white">Category Not Found</h1>
        <p className="text-neutral-400">The category you are looking for does not exist.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white hover:border-neutral-700">
          Return Home
        </Link>
      </div>
    );
  }

  // Filter tools within the category
  const filteredTools = categoryTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-2 py-1">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-neutral-300 font-medium capitalize">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          <div className={`p-3.5 rounded-xl ${category.bgClass} ${category.colorClass}`}>
            <LucideIcon name={category.icon} size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-neutral-400 text-sm mt-1.5 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#121212] border border-neutral-800 rounded-xl px-3.5 py-2.5 focus-within:border-neutral-700 transition-colors w-full md:w-64">
            <Search className="text-neutral-500 w-4 h-4 flex-shrink-0 mr-2" />
            <input
              type="text"
              placeholder={`Search ${category.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-2.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors shrink-0"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 flex items-center gap-3 text-xs text-neutral-400">
        <Sparkles size={14} className={category.colorClass} />
        <span>
          All {category.name} run in-browser. Your files and data never touch a remote backend server.
        </span>
      </div>

      {/* Grid listing */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950">
          <p className="text-sm text-neutral-500">No tools found matching your keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
