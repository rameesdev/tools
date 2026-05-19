"use client";

import React, { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { tools } from "@/lib/tools.config";
import ToolLayout from "@/components/ToolLayout";
import dynamic from "next/dynamic";

// Map tool category to dynamic imports of category containers
const ToolDispatcher: Record<string, React.ComponentType<{ toolId: string }>> = {
  pdf: dynamic(() => import("@/tools/pdf-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading PDF tools bundle...</div>
  }),
  image: dynamic(() => import("@/tools/image-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Image tools bundle...</div>
  }),
  text: dynamic(() => import("@/tools/text-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Text tools bundle...</div>
  }),
  calculator: dynamic(() => import("@/tools/calculator-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Calculators bundle...</div>
  }),
  converter: dynamic(() => import("@/tools/converter-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Converters bundle...</div>
  }),
  security: dynamic(() => import("@/tools/security-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Security tools bundle...</div>
  }),
  web: dynamic(() => import("@/tools/web-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Web tools bundle...</div>
  }),
  color: dynamic(() => import("@/tools/color-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Color tools bundle...</div>
  }),
  data: dynamic(() => import("@/tools/data-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Data tools bundle...</div>
  }),
  developer: dynamic(() => import("@/tools/developer-tools").then(mod => mod.default), {
    ssr: false,
    loading: () => <div className="py-20 text-center text-neutral-500">Loading Developer tools bundle...</div>
  }),
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params?.toolId as string;
  const tool = tools.find((t) => t.id === toolId);

  // Track recently used tools in localStorage
  useEffect(() => {
    if (toolId && tool) {
      try {
        const stored = localStorage.getItem("recent-tools");
        let list: string[] = stored ? JSON.parse(stored) : [];
        // Remove existing to place on top
        list = list.filter((id) => id !== toolId);
        list.unshift(toolId);
        // Save top 8
        localStorage.setItem("recent-tools", JSON.stringify(list.slice(0, 8)));
      } catch (e) {
        console.error("Failed to update recent tools", e);
      }
    }
  }, [toolId, tool]);

  if (!tool) {
    notFound();
  }

  // Get dispatcher based on category
  const Dispatcher = ToolDispatcher[tool.category];

  return (
    <ToolLayout tool={tool}>
      {Dispatcher ? (
        <Dispatcher toolId={toolId} />
      ) : (
        <div className="py-20 text-center text-neutral-500">
          Component registry error.
        </div>
      )}
    </ToolLayout>
  );
}
