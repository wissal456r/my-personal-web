import React, { useState } from "react";
import { Terminal } from "@/components/Terminal";
import { AtmSimulator } from "@/components/AtmSimulator";
import { FightingGame } from "@/components/FightingGame";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { Sun, Moon, Laptop, Mail, Phone, MapPin, GraduationCap, Award, Code, Sparkles } from "lucide-react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeWidget, setActiveWidget] = useState<"atm" | "fight">("atm");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const projects = [
    {
      index: "CARD NO. 001 — SYSTEMS SIMULATION",
      title: "Smart ATM Simulation",
      description: "Console-based ATM supporting withdrawals, deposits, authentication and balance inquiry — built with arrays, functions, loops and conditionals.",
      tag: "C",
      details: "A comprehensive console application simulating real-world ATM operations. It implements secure PIN verification, transaction logging, balance management, and input validation to prevent buffer overflows and invalid operations.",
      codeSnippet: `// ATM PIN Verification snippet
int verifyPIN(int inputPin, int correctPin) {
    int attempts = 3;
    while (attempts > 0) {
        if (inputPin == correctPin) return 1;
        attempts--;
        printf("Incorrect PIN. %d attempts left.\\n", attempts);
    }
    return 0;
}`
    },
    {
      index: "CARD NO. 002 — GAME LOGIC",
      title: "Fighting Game Project",
      description: "A basic fighting game built with object-oriented programming — character interactions and gameplay logic.",
      tag: "C++",
      details: "An object-oriented combat simulator showcasing inheritance, polymorphism, and encapsulation. Players can choose different character classes, each with unique attributes, special moves, and defense mechanisms.",
      codeSnippet: `// OOP Character Class
class Character {
protected:
    string name;
    int hp;
    int attackPower;
public:
    virtual void attack(Character& opponent) {
        opponent.takeDamage(attackPower);
    }
};`
    },
    {
      index: "CARD NO. 003 — SYSTEM MODELING",
      title: "Harvard Online Registration System",
      description: "Use case, class, and system interaction diagrams modeling an online university registration platform.",
      tag: "UML",
      details: "A complete system architecture design for a university course registration platform. Includes detailed Use Case diagrams, Class diagrams showing relationships (association, aggregation, composition), and Sequence diagrams for course enrollment workflows."
    },
    {
      index: "CARD NO. 004 — IN PROGRESS",
      title: "Ongoing Backend Projects",
      description: "In-progress Python and PHP projects strengthening backend development and software engineering fundamentals.",
      tag: "PY / PHP",
      details: "A collection of backend services and APIs built with Python (Flask/FastAPI) and PHP. Focuses on database integration, RESTful API design, session management, and secure user authentication."
    }
  ];

  return (
    <div className="min-h-screen pb-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header / Navigation */}
      <header className="pt-12 pb-8 relative">
        <div className="flex justify-between items-center font-mono text-xs text-muted-foreground mb-8">
          <span>REF // AB-1010</span>
          <div className="flex items-center gap-4">
            <span className="border border-primary text-primary px-2.5 py-0.5 rounded-md font-bold animate-pulse">
              STATUS: OPEN TO OPPORTUNITIES
            </span>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-none">
            Wissal <br />
            <span className="text-primary">Aboulkheri.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Computer Science Engineering student building things in C, C++, and Python — currently indexing new skills in AI and cybersecurity.
          </p>
        </div>

        {/* Interactive Terminal */}
        <div className="mt-8">
          <Terminal />
        </div>
      </header>

      {/* Perforation Strip */}
      <div className="flex items-center gap-2.5 my-12 opacity-60">
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
      </div>

      {/* Technical Stack */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
          <span className="w-4 h-[1px] bg-primary"></span> Index 01
        </div>
        <h2 className="font-display text-3xl font-bold">Technical Stack</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Programming</h3>
            <div className="flex flex-wrap gap-1.5">
              {["C", "C++", "Python", "OOP"].map((s) => (
                <span key={s} className="font-mono text-xs bg-background border border-border px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Web</h3>
            <div className="flex flex-wrap gap-1.5">
              {["HTML", "CSS", "JavaScript", "PHP"].map((s) => (
                <span key={s} className="font-mono text-xs bg-background border border-border px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Database & Systems</h3>
            <div className="flex flex-wrap gap-1.5">
              {["SQL", "UML Modeling", "Information Systems"].map((s) => (
                <span key={s} className="font-mono text-xs bg-background border border-border px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Tools</h3>
            <div className="flex flex-wrap gap-1.5">
              {["VS Code", "Visual Studio", "Code::Blocks", "Linux basics"].map((s) => (
                <span key={s} className="font-mono text-xs bg-background border border-border px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perforation Strip */}
      <div className="flex items-center gap-2.5 my-12 opacity-60">
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
      </div>

      {/* Project Catalog */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
          <span className="w-4 h-[1px] bg-primary"></span> Index 02
        </div>
        <h2 className="font-display text-3xl font-bold">Project Catalog</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Perforation Strip */}
      <div className="flex items-center gap-2.5 my-12 opacity-60">
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
      </div>

      {/* Interactive Widgets Showcase */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
          <span className="w-4 h-[1px] bg-primary"></span> Interactive Lab
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" size={24} /> Playable Prototypes
          </h2>
          <div className="flex bg-card border border-border p-1 rounded-lg font-mono text-xs">
            <button
              onClick={() => setActiveWidget("atm")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeWidget === "atm" ? "bg-primary text-primary-foreground font-bold" : "hover:text-primary"}`}
            >
              ATM Simulator
            </button>
            <button
              onClick={() => setActiveWidget("fight")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeWidget === "fight" ? "bg-primary text-primary-foreground font-bold" : "hover:text-primary"}`}
            >
              Fighting Game
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[350px]">
          {activeWidget === "atm" ? <AtmSimulator /> : <FightingGame />}
        </div>
      </section>

      {/* Perforation Strip */}
      <div className="flex items-center gap-2.5 my-12 opacity-60">
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
      </div>

      {/* Education & Languages */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
            <span className="w-4 h-[1px] bg-primary"></span> Index 03
          </div>
          <h2 className="font-display text-3xl font-bold">Education</h2>
          
          <div className="space-y-6 border-l-2 border-primary/20 pl-4 ml-2">
            <div className="relative space-y-1">
              <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-mono text-xs text-primary font-bold">2024 — Present</span>
              <h4 className="font-display font-bold text-lg">B.S. Computer Science Engineering</h4>
              <p className="text-sm text-muted-foreground">Université Internationale de Casablanca</p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-mono text-xs text-primary font-bold">2024</span>
              <h4 className="font-display font-bold text-lg">Baccalaureate, Physics & Chemistry Science</h4>
              <p className="text-sm text-muted-foreground">Val d'Or School, Casablanca, Morocco</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
            <span className="w-4 h-[1px] bg-primary"></span> Index 04
          </div>
          <h2 className="font-display text-3xl font-bold">Languages</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "English", level: "B2" },
              { name: "French", level: "Fluent" },
              { name: "Arabic", level: "Native" },
              { name: "Spanish", level: "Intermediate" }
            ].map((l) => (
              <div key={l.name} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold text-sm">{l.name}</span>
                <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perforation Strip */}
      <div className="flex items-center gap-2.5 my-12 opacity-60">
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
        <div className="flex-1 h-[1px] bg-border border-dashed"></div>
        <span className="w-2 h-2 rounded-full bg-background border border-border"></span>
      </div>

      {/* Contact / Footer */}
      <footer className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 text-center space-y-8 shadow-xl">
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Let's build something.</h2>
          <p className="text-sm text-stone-400">
            Open to internships, collaborations, and anything AI, cybersecurity, or software-shaped.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-stone-950/50 p-6 rounded-xl border border-stone-800">
          <ContactForm />
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-stone-400 pt-4 border-t border-stone-800">
          <a href="mailto:Wissal.aboulkheri1010@gmail.com" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Mail size={12} /> Wissal.aboulkheri1010@gmail.com
          </a>
          <a href="tel:+212697690162" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Phone size={12} /> +212 697 690 162
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> Casablanca, Morocco
          </span>
        </div>

        <div className="pt-4 mt-4 border-t border-stone-800/50 flex flex-col items-center gap-3">
          <p className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
            FILED UNDER: STUDENT ENGINEER · CASABLANCA, MA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;