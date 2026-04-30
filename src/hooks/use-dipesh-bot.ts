import { createContext, useContext, useState, ReactNode } from "react";

interface DipeshBotContextType {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    openBot: () => void;
    closeBot: () => void;
}

const DipeshBotContext = createContext<DipeshBotContextType | undefined>(
    undefined
);

export function DipeshBotProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DipeshBotContext.Provider
      value= {{
        isOpen,
            setIsOpen,
            openBot: () => setIsOpen(true),
                closeBot: () => setIsOpen(false),
      }
}
    >
    { children }
    </DipeshBotContext.Provider>
  );
}

export function useDipeshBot() {
    const context = useContext(DipeshBotContext);
    if (!context) {
        throw new Error("useDipeshBot must be used within DipeshBotProvider");
    }
    return context;
}

