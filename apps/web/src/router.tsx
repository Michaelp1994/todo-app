import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthLayout } from "./layouts/AuthLayout";
import Todos from "./pages/Todos";
import ImportantTodos from "./pages/ImportantTodos";
import WeekTodos from "./pages/WeekTodos";
import ArchivedTodos from "./pages/ArchivedTodos";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<AuthLayout />}>
          <Route index element={<Todos />} />
          <Route path="important" element={<ImportantTodos />} />
          <Route path="week" element={<WeekTodos />} />
          <Route path="archived" element={<ArchivedTodos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
