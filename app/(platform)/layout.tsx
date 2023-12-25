import ModalProvider from "@/components/provider/modal";
import QueryProvider from "@/components/provider/query";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
