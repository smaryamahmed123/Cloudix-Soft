import { Box } from "@mui/material";

const WebsitePreview = ({ image, link }) => {
  return (
    <Box
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "block",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        backgroundColor: "#0b1220",
        boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
        height: 420,
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={image}
        alt="Website Preview"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default WebsitePreview;
