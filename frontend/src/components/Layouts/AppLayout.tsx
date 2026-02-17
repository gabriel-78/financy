import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/Logo.svg";
import type { PropsWithChildren } from "react";

export function AppLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, user } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();

  const currentTab =
    location.pathname === "/"
      ? "dashboard"
      : location.pathname.split("/").pop() || "home";

  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  return (
    <div className="flex h-screen flex-col w-screen overflow-hidden bg-gray-100">
      <header className="flex w-full min-h-fit shrink-0 bg-background items-center px-12 py-4 justify-between">
        <figure>
          <img className="w-[6.25rem] h-6" src={logo} alt="Logo" />
        </figure>

        <Tabs
          value={currentTab}
          onValueChange={(value) =>
            navigate(value === "dashboard" ? "/" : `/${value}`)
          }
        >
          <TabsList className="bg-transparent">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>

            <TabsTrigger value="transactions">Transações</TabsTrigger>

            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-[6.25rem] flex justify-end">
          <button
            className="flex items-center justify-center shrink-0 size-9 bg-gray-300 text-gray-800 text-sm rounded-full"
            onClick={() => navigate("/profile")}
          >
            <span>
              {user && user?.name.length > 0 ? user?.name[0].toUpperCase() : ""}
            </span>
          </button>
        </div>
      </header>

      <main className="flex size-full overflow-hidden">
        {children ?? <Outlet />}
      </main>

      <Toaster />
    </div>
  );
}
