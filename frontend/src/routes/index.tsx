import { AppLayout } from "@/components/Layouts/AppLayout";
import { AuthLayout } from "@/components/Layouts/AuthLayout";
import { Singup } from "@/pages/Auth/Singup";
import { Categories } from "@/pages/Categories";
import { Profile } from "@/pages/Profile";
import { RootPage } from "@/pages/RootPage";
import { Transaction } from "@/pages/Transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/singup" element={<Singup />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/transactions" element={<Transaction />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
