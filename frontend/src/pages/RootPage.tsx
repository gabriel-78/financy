import { useAuthStore } from "@/stores/auth";
import { Login } from "@/pages/Auth/Login";
import { Dashboards } from "@/pages/Dashboards";
import { AppLayout } from "@/components/Layouts/AppLayout";
import { AuthLayout } from "@/components/Layouts/AuthLayout";

export function RootPage() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return (
      <AppLayout>
        <Dashboards />
      </AppLayout>
    );
  }

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
