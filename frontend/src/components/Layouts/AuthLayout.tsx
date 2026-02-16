import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <main className="flex size-full overflow-hidden">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}
