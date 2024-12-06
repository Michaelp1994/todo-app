import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import App from "./routes/App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
