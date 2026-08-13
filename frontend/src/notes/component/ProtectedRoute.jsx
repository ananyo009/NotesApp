// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";


const ProtectedRoute = () => {

    const token = document.cookie;

  // 1. Still verifying cookie with backend -> show loading spinner/message

  // 2. Cookie invalid or missing -> Show unauthorized UI OR redirect to login
  if (!token) {
    // --- Option A: Show Unauthorized Message ---
    return (
      <div style={{ padding: "40px", textAlign: "center" ,color:"white"}}>
        <h2>401 - Unauthorized</h2>
        <p>You need to log in to access this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );

    // --- Option B: Redirect straight to login page ---
    // return <Navigate to="/login" replace />;
  }

  // 3. User is valid -> render protected page
  return <Outlet />;
};

export default ProtectedRoute;
