import { AppLayout } from "@/components/Layouts/AppLayout";
import { AuthLayout } from "@/components/Layouts/AuthLayout";
import { Login } from "@/pages/Auth/Login";
import { Singup } from "@/pages/Auth/Singup";
import { Categories } from "@/pages/Categories";
import { Dashboards } from "@/pages/Dashboards";
import { Profile } from "@/pages/Profile";
import { Transaction } from "@/pages/Transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/singup" element={<Singup />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboards />} />

          <Route path="/transactions" element={<Transaction />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
