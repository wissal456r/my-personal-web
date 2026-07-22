import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Play, Trash2 } from "lucide-react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const welcomeMessage: CommandHistory = {
  command: "welcome",
  output: (
    <div className="space-y-1 text-amber-100/90">
      <p className="text-primary-foreground font-semibold">Wissal Aboulkheri — Interactive Terminal v1.0.0</p>
      <p className="text-xs text-muted-foreground">Type <span className="text-primary-foreground font-bold">help</span> to see available commands.</p>
    </div>
  ),
};

export const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([welcomeMessage]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <div className="grid grid-cols-2 gap-2 text-xs text-amber-300 dark:text-amber-400 max-w-md">
        <div><span className="text-primary-foreground font-bold">about</span> - Who is Wissal?</div>
        <div><span className="text-primary-foreground font-bold">skills</span> - List technical stack</div>
        <div><span className="text-primary-foreground font-bold">projects</span> - View project catalog</div>
        <div><span className="text-primary-foreground font-bold">contact</span> - Get contact details</div>
        <div><span className="text-primary-foreground font-bold">clear</span> - Clear terminal screen</div>
        <div><span className="text-primary-foreground font-bold">secret</span> - ???</div>
      </div>
    ),
    about: () => (
      <p className="text-amber-100/90">
        Computer Science Engineering student at Université Internationale de Casablanca. 
        Building software in C, C++, and Python, with a growing focus on AI and cybersecurity.
      </p>
    ),
    skills: () => (
      <div className="space-y-1 text-amber-100/90">
        <p><span className="text-primary-foreground font-bold">Languages:</span> C, C++, Python, SQL, PHP, HTML, CSS, JS</p>
        <p><span className="text-primary-foreground font-bold">Systems:</span> UML Modeling, Information Systems, Linux basics</p>
        <p><span className="text-primary-foreground font-bold">Tools:</span> VS Code, Visual Studio, Code::Blocks</p>
      </div>
    ),
    projects: () => (
      <div className="space-y-2 text-amber-100/90">
        <p>1. <span className="text-primary-foreground font-bold">Smart ATM Simulation</span> (C) - Console-based banking system</p>
        <p>2. <span className="text-primary-foreground font-bold">Fighting Game Project</span> (C++) - OOP-based combat logic</p>
        <p>3. <span className="text-primary-foreground font-bold">Harvard Registration System</span> (UML) - System modeling & diagrams</p>
      </div>
    ),
    contact: () => (
      <div className="space-y-1 text-amber-100/90">
        <p>📧 Wissal.aboulkheri1010@gmail.com</p>
        <p>📞 +212 697 690 162</p>
        <p>📍 Casablanca, Morocco</p>
      </div>
    ),
    secret: () => (
      <div className="text-primary-foreground font-bold animate-pulse">
        🔓 ACCESS GRANTED: "The best way to predict the future is to invent it." - Alan Kay
      </div>
    ),
    tiko: () => (
      <div className="text-primary-foreground font-bold animate-pulse border-l-2 border-primary pl-3 py-1">
        💻 SYSTEM ARCHITECT PROTOCOL ENGAGED // TIKO2FIVE
      </div>
    ),
    tiko2five: () => (
      <div className="text-primary-foreground font-bold animate-pulse border-l-2 border-primary pl-3 py-1">
        💻 SYSTEM ARCHITECT PROTOCOL ENGAGED // TIKO2FIVE
      </div>
    ),
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    if (!trimmedInput) return;

    let output: React.ReactNode;

    if (trimmedInput === "clear") {
      setHistory([welcomeMessage]);
      setInput("");
      return;
    } else if (commands[trimmedInput]) {
      output = commands[trimmedInput]();
    } else {
      output = <span className="text-red-400">Command not found: "{trimmedInput}". Type "help" for options.</span>;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full bg-stone-900 text-stone-100 rounded-xl overflow-hidden shadow-2xl border border-stone-800 font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-stone-950 px-4 py-3 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
          </div>
          <span className="text-xs text-stone-400 ml-2 flex items-center gap-1">
            <TerminalIcon size={12} /> wissal@uic:~
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-stone-400">
          <button 
            onClick={() => setHistory([welcomeMessage])} 
            className="hover:text-stone-200 transition-colors flex items-center gap-1"
            title="Clear Terminal"
          >
            <Trash2 size={12} /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalBodyRef}
        className="p-5 h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-stone-800"
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command !== "welcome" && (
              <div className="flex items-center gap-2 text-stone-400">
                <span className="text-primary font-bold">wissal@uic</span>
                <span>~ %</span>
                <span className="text-stone-100">{item.command}</span>
              </div>
            )}
            <div className="pl-4 border-l border-stone-800/50 py-0.5">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleCommand} className="bg-stone-950/50 px-5 py-3 border-t border-stone-800/50 flex items-center gap-2">
        <span className="text-primary font-bold">wissal@uic</span>
        <span className="text-stone-400">~ %</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-stone-100 placeholder-stone-600 font-mono text-sm"
          autoFocus
        />
        <button type="submit" className="text-stone-500 hover:text-primary transition-colors">
          <Play size={14} />
        </button>
      </form>
    </div>
  );
};