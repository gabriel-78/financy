import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth";
import { Navigate, Outlet } from "react-router-dom";

export function AppLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <main className="flex size-full overflow-hidden">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}
