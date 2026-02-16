import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <main className="flex size-full overflow-hidden">{children}</main>

      <Toaster />
    </div>
  );
}
