import { DipeshBotChatPanel } from "./DipeshBotChatPanel";

interface DipeshBotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DipeshBotChat({ isOpen, onClose }: DipeshBotChatProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:items-center md:justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl lg:max-w-3xl h-[min(680px,calc(100vh-2rem))]">
        <DipeshBotChatPanel onClose={onClose} className="h-full" />
      </div>
    </div>
  );
}
