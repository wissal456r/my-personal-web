import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, ExternalLink, BookOpen, Terminal } from "lucide-react";

interface ProjectCardProps {
  index: string;
  title: string;
  description: string;
  tag: string;
  details: string;
  codeSnippet?: string;
}

export const ProjectCard = ({ index, title, description, tag, details, codeSnippet }: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative bg-card border border-border rounded-xl p-6 pt-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group">
          {/* Perforation punch effect */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 h-4 bg-[radial-gradient(circle,hsl(var(--background))_4px,transparent_4.5px)] bg-[length:20px_16px] bg-center border-b border-dashed border-border"></div>

          <span className="absolute top-6 right-6 font-mono text-[10px] font-bold text-primary border border-primary/30 px-2 py-0.5 rounded rotate-3 group-hover:rotate-0 transition-transform">
            {tag}
          </span>

          <h3 className="font-display text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors max-w-[80%]">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <div className="font-mono text-[10px] text-muted-foreground/70 mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
            <span>{index}</span>
            <span className="text-primary group-hover:underline flex items-center gap-1">
              View Details <ExternalLink size={10} />
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] bg-card border border-border rounded-xl font-sans">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              {tag}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{index}</span>
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-foreground">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {details}
          </p>

          {codeSnippet && (
            <div className="space-y-1.5">
              <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Terminal size={12} /> Code Preview:
              </p>
              <pre className="bg-stone-950 text-stone-200 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-[200px] border border-stone-800">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};