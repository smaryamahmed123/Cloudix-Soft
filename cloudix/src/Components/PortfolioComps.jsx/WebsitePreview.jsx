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
      }}
    >
      <Box
        component="img"
        src={image}
        alt="Website Preview"
        sx={{
          width: "100%",
          minHeight: "800px",
          animation: "scrollImage 14s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes scrollImage {
            0% { transform: translateY(0); }
            100% { transform: translateY(-380px); }
          }
        `}
      </style>
    </Box>
  );
};

export default WebsitePreview;
