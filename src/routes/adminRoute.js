import { Navigate } from "react-router-dom";

// AdminRoute component to check for admin access
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" />; // Redirect to home if not an admin
  }
  return children;
};

export default AdminRoute;
