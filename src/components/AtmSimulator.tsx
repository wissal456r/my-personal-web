import React, { useState } from "react";
import { CreditCard, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

export const AtmSimulator = () => {
  const [balance, setBalance] = useState(1500);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [amount, setAmount] = useState("");
  const [screen, setScreen] = useState<"welcome" | "menu" | "withdraw" | "deposit" | "balance">("welcome");
  const [logs, setLogs] = useState<string[]>(["ATM Initialized.", "Ready for card insertion."]);

  const handleInsertCard = () => {
    setScreen("menu");
    setIsAuthenticated(true);
    addLog("Card inserted. Session authenticated.");
    showSuccess("Card Authenticated Successfully!");
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      showError("Please enter a valid amount.");
      return;
    }
    if (val > balance) {
      showError("Insufficient funds!");
      addLog(`Failed withdrawal: Insufficient funds for $${val}`);
      return;
    }
    setBalance((prev) => prev - val);
    addLog(`Withdrew $${val}. New balance: $${balance - val}`);
    showSuccess(`Successfully withdrew $${val}!`);
    setAmount("");
    setScreen("menu");
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      showError("Please enter a valid amount.");
      return;
    }
    setBalance((prev) => prev + val);
    addLog(`Deposited $${val}. New balance: $${balance + val}`);
    showSuccess(`Successfully deposited $${val}!`);
    setAmount("");
    setScreen("menu");
  };

  const handleExit = () => {
    setIsAuthenticated(false);
    setScreen("welcome");
    addLog("Card ejected. Session ended.");
    showSuccess("Card ejected. Thank you!");
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800 shadow-xl font-mono max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <CreditCard className="text-primary" size={20} />
          <span className="text-xs font-bold tracking-wider text-stone-400">SMART ATM SIMULATOR v1.2</span>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
      </div>

      {/* ATM Screen */}
      <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-5 min-h-[200px] flex flex-col justify-between text-emerald-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
        
        {screen === "welcome" && (
          <div className="text-center my-auto space-y-4">
            <p className="text-lg font-bold tracking-wide animate-pulse">INSERT CARD TO BEGIN</p>
            <button
              onClick={handleInsertCard}
              className="mx-auto flex items-center gap-2 bg-emerald-500 text-stone-950 px-4 py-2 rounded font-bold hover:bg-emerald-400 transition-colors text-xs"
            >
              <CreditCard size={14} /> INSERT DEMO CARD
            </button>
          </div>
        )}

        {screen === "menu" && (
          <div className="space-y-3">
            <p className="text-xs text-emerald-500/70 border-b border-emerald-500/20 pb-1">SELECT TRANSACTION</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setScreen("balance")} className="text-left p-2 border border-emerald-500/30 rounded hover:bg-emerald-500/10 transition-colors">
                [1] CHECK BALANCE
              </button>
              <button onClick={() => setScreen("withdraw")} className="text-left p-2 border border-emerald-500/30 rounded hover:bg-emerald-500/10 transition-colors">
                [2] WITHDRAW CASH
              </button>
              <button onClick={() => setScreen("deposit")} className="text-left p-2 border border-emerald-500/30 rounded hover:bg-emerald-500/10 transition-colors">
                [3] DEPOSIT FUNDS
              </button>
              <button onClick={handleExit} className="text-left p-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors">
                [4] EXIT / EJECT
              </button>
            </div>
          </div>
        )}

        {screen === "balance" && (
          <div className="text-center my-auto space-y-3">
            <p className="text-xs text-emerald-500/70">CURRENT BALANCE</p>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            <button onClick={() => setScreen("menu")} className="text-xs border border-emerald-500/30 px-3 py-1 rounded hover:bg-emerald-500/10">
              BACK TO MENU
            </button>
          </div>
        )}

        {screen === "withdraw" && (
          <form onSubmit={handleWithdraw} className="space-y-3 my-auto">
            <p className="text-xs text-emerald-500/70">ENTER WITHDRAWAL AMOUNT</p>
            <div className="flex gap-2">
              <span className="text-lg font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent border-b border-emerald-500 outline-none text-emerald-400 w-full font-bold"
                autoFocus
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-emerald-500 text-stone-950 py-1 rounded text-xs font-bold hover:bg-emerald-400">
                CONFIRM
              </button>
              <button type="button" onClick={() => setScreen("menu")} className="flex-1 border border-emerald-500/30 py-1 rounded text-xs hover:bg-emerald-500/10">
                CANCEL
              </button>
            </div>
          </form>
        )}

        {screen === "deposit" && (
          <form onSubmit={handleDeposit} className="space-y-3 my-auto">
            <p className="text-xs text-emerald-500/70">ENTER DEPOSIT AMOUNT</p>
            <div className="flex gap-2">
              <span className="text-lg font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent border-b border-emerald-500 outline-none text-emerald-400 w-full font-bold"
                autoFocus
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-emerald-500 text-stone-950 py-1 rounded text-xs font-bold hover:bg-emerald-400">
                CONFIRM
              </button>
              <button type="button" onClick={() => setScreen("menu")} className="flex-1 border border-emerald-500/30 py-1 rounded text-xs hover:bg-emerald-500/10">
                CANCEL
              </button>
            </div>
          </form>
        )}
      </div>

      {/* System Logs */}
      <div className="mt-4">
        <p className="text-[10px] text-stone-500 uppercase tracking-wider mb-1.5">System Logs (C Console Output)</p>
        <div className="bg-stone-950 rounded p-3 h-24 overflow-y-auto text-[11px] text-stone-400 space-y-1 scrollbar-thin">
          {logs.map((log, i) => (
            <div key={i} className="truncate">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};