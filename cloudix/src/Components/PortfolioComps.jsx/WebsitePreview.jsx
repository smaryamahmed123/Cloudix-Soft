import { Box } from "@mui/material";

const WebsitePreview = ({ image, link }) => {
  return (
    <Box
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: "320px",
        height: "420px",
        overflow: "hidden",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer",
        position: "relative",
        display: "block",
        mx: "auto",
        "& img": {
          width: "100%",
          transform: "translateY(0)",
          transition: "transform 6s linear",
        },
        "&:hover img": {
          transform: "translateY(calc(-100% + 420px))",
        },
      }}
    >
      <img src={image} alt="Website Preview" />
    </Box>
  );
};

export default WebsitePreview;
