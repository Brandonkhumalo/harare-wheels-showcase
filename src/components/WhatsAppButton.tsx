import { MessageCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const WhatsAppButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const message = "Hello! I'm interested in learning more about your vehicles.";

  const numbers = [
    { phone: "263778241261", display: "+263 77 824 1261" },
    { phone: "263772112881", display: "+263 77 211 2881" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showOptions && (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 mb-1 min-w-[220px]" data-testid="whatsapp-options">
          <p className="text-xs text-muted-foreground mb-2 px-1">Chat with us on WhatsApp</p>
          {numbers.map((n) => (
            <a
              key={n.phone}
              href={`https://wa.me/${n.phone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#25D366]/10 transition-colors"
              data-testid={`whatsapp-option-${n.phone}`}
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366] shrink-0" />
              <span className="text-sm text-foreground font-medium">{n.display}</span>
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp"
      >
        {showOptions ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
