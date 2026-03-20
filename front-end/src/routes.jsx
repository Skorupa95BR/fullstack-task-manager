import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
