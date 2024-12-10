import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthLayout } from "./layouts/AuthLayout";
import Todos from "./pages/Todos";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<AuthLayout />}>
            <Route index element={<Todos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
