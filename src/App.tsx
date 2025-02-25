import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import ProfileEdit from "./pages/Dashboard/HeaderBar/ProfileEdit";
import About from "./pages/Dashboard/HeaderBar/About";
import News from "./pages/Dashboard/HeaderBar/News";
import Service from "./pages/Dashboard/HeaderBar/Service";
import Profilechange from "./pages/Dashboard/HeaderBar/Profilechange";
import LoginPage from "./pages/Login";
import SendMessage from "./pages/Dashboard/HeaderBar/SendMessage";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const PrivateRoute = ({ children }: {children: JSX.Element }) => {
    return user ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile-setup" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
        <Route path="/dashboard/profile-edit" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
        <Route path="/dashboard/About" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/dashboard/News" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/dashboard/Service" element={<PrivateRoute><Service/></PrivateRoute>} />
        <Route path="/profileEdit" element={<PrivateRoute><ProfileEdit/></PrivateRoute>} />
        <Route path="/profilechange" element={<PrivateRoute><Profilechange/></PrivateRoute>} />
        <Route path="/dashboard/SendMessage" element={<PrivateRoute><SendMessage/></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App