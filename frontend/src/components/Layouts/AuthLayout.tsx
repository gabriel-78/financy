import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth";
import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to={"/"} replace />;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <main className="flex size-full overflow-hidden">
        {children ?? <Outlet />}
      </main>

      <Toaster />
    </div>
  );
}
