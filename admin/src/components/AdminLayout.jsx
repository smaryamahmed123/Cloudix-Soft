import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const AdminLayout = () => {
  const location = useLocation();
  if (location.pathname === "/login") return <Outlet />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
