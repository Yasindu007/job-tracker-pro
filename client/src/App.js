// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import JobDetail from "./pages/JobDetail"; // ⬅️ Import this

// Inside your <Routes>:
<Route path="/job/:id" element={<JobDetail />} />


function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job/:id" element={<JobDetail />} />
            
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
