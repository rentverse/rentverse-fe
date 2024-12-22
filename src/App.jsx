import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { useRoutes } from "react-router";
import Userdetail from "./pages/Userdetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  {
    path: "/detail/:userId",
    element: (
      <ProtectedRoute>
        <Userdetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
