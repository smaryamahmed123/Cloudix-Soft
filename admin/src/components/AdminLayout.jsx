// src/components/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { dash } from "./Dashboard/dashboardPalette";

// The pages render their own padding and top bar, so the layout adds neither.
// (Login protection is handled by <PrivateRoute /> around this layout.)
const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: dash.page }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0, // lets wide tables scroll inside the page instead of stretching it
          pt: isMobile ? "62px" : 0, // room for the fixed mobile app bar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;