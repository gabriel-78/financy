import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100">
      <main className="">{children}</main>
      <Toaster />
    </div>
  );
}
