import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    
    fetch("https://formsubmit.co/ajax/Wissal.aboulkheri1010@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "Sender Name": name,
        "Email Address": email,
        "Message": message,
        _subject: `New Portfolio Contact from ${name}`,
        _template: "box"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success === "true" || data.success === true) {
        showSuccess("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else if (data.message && data.message.includes("Activation")) {
        showSuccess("Check your inbox (Wissal.aboulkheri1010@gmail.com) for an activation link!");
      } else {
        showError(data.message || "Failed to send message. Please try again.");
      }
    })
    .catch(error => {
      console.error(error);
      showError("An error occurred. Please try again later.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Let's collaborate on a project..."
          rows={4}
          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>Sending...</>
        ) : (
          <>
            <Send size={14} /> Send Message
          </>
        )}
      </button>
    </form>
  );
};