"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/lib/modal-context";
import { ContactModal } from "@/components/ContactModal";
import { ChatWidget } from "@/components/ChatWidget";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ModalProvider>
          {children}
          <ContactModal />
          <ChatWidget />
          <Toaster />
        </ModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
