import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EmailPasswordLogin from "./components/Login/EmailPasswordLogin";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import ProfileEdit from "./pages/Dashboard/Menu/ProfileEdit";
import Explanation from "./pages/Dashboard/Menu/Explanation";
import SendMessage from "./pages/Dashboard/Menu/SendMessage";

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
        <Route path="/login" element={<EmailPasswordLogin />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile-setup" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
        <Route path="/profile-edit" element={<PrivateRoute><ProfileEdit/></PrivateRoute>} />
        <Route path="/dashboard/skill-matching" element={<PrivateRoute><Explanation/></PrivateRoute>} />
        <Route path="/sendmessage" element={<PrivateRoute><SendMessage/></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App