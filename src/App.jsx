import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";

export default function App() {

  const { user } = useAuth();

  return (

    <BrowserRouter>

      {!user ? (

        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>

      ) : (

        <div className="layout">

          <Sidebar />

          <div className="content">

            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/modules" element={<Modules />} />

              <Route path="/analytics" element={<Analytics />} />

              <Route
                path="/admin"
                element={
                  user?.role === "admin"
                    ? <Admin />
                    : <Navigate to="/" />
                }
              />

              <Route path="*" element={<Navigate to="/" />} />

            </Routes>

          </div>

        </div>

      )}

    </BrowserRouter>

  );
}