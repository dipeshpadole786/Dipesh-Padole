import { useEffect, useRef, useState } from "react";
import { Loader, MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const API_BASE_URL = import.meta.env.VITE_DIPESHBOT_API || "https://dipesh-padole.onrender.com";

interface DipeshBotChatPanelProps {
  className?: string;
  headerRight?: React.ReactNode;
  onClose?: () => void;
}

export function DipeshBotChatPanel({ className, headerRight, onClose }: DipeshBotChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hey, I'm Dipesh! 👋 Ask me anything about Dipesh's portfolio, skills, projects, or achievements.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Dipesh API:", error);
      toast.error("Failed to get response. Make sure Dipesh API is running on port 8002.");

      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        content:
          "Sorry, I'm having trouble connecting. Please make sure the API server is running:\n\n" +
          "```\ncd DipeshBot\npython main.py --server --warmup\n```\n\n" +
          "Once running, I'll be back online! 🚀",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col rounded-3xl border border-border bg-card shadow-2xl", className)}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-primary-foreground">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">Dipesh</h2>
            <p className="text-xs text-ink-soft">Portfolio AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary/60 transition"
              aria-label="Close chat"
            >
              <X className="h-5 w-5 text-ink-soft hover:text-ink" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.type === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed",
                msg.type === "user"
                  ? "bg-ink text-primary-foreground rounded-br-none"
                  : "bg-secondary/60 text-ink rounded-bl-none border border-border",
              )}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary/60 text-ink px-4 py-2 rounded-2xl rounded-bl-none border border-border flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="border-t border-border p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
          className="flex-1 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-ink outline-none focus:border-ink/40 focus:bg-card transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-primary-foreground hover:bg-ink/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
