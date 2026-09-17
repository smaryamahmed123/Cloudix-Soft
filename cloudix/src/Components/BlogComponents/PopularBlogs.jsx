import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PopularBlogs = ({ blogs, onClick }) => {
  if (!blogs?.length) return null;

  return (
    <Box
      sx={{
        borderRadius: "18px",
        backgroundColor: "#f7f8f4",
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: "#111E2C",
          mb: 1,
        }}
      >
        Editor's Picks
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        Useful reads from the Cloudix Soft team.
      </Typography>

      <List disablePadding>
        {blogs.slice(0, 4).map((blog, index) => (
          <React.Fragment key={blog._id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onClick(blog)}
                sx={{
                  px: 0,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: 35,
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "#769914",
                  }}
                >
                  0{index + 1}
                </Box>

                <ListItemText
                  primary={blog.title}
                  secondary={blog.category || "General"}
                  primaryTypographyProps={{
                    fontWeight: 650,
                    fontSize: "0.9rem",
                    color: "#111E2C",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "0.72rem",
                    sx: { mt: 0.4 },
                  }}
                />

                <ArrowForwardIosIcon
                  sx={{
                    fontSize: 14,
                    color: "#769914",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {index < Math.min(blogs.length, 4) - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default PopularBlogs;