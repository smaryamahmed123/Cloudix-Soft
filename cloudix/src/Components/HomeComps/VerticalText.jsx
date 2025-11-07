import { Typography, Box } from "@mui/material";

export default function VerticalText() {
  return (
    // <Box
    //   sx={{
    //     position: "absolute",
    //     top: "50%",
    //     left: "20px",
    //     transform: "translateY(-50%) rotate(-90deg)",
    //     transformOrigin: "left top",
    //     display: "flex",
    //     flexDirection: "row",
    //     gap: 1
    //   }}
    // >
    //   <Typography
    //     sx={{
    //       fontSize: "0.75rem",
    //       letterSpacing: 2,
    //       color: "#FFFFFF",
    //       fontWeight: 300,
    //     }}
    //   >
    //     Creative Design
    //   </Typography>
    //   <Typography
    //     sx={{
    //       fontSize: "0.75rem",
    //       letterSpacing: 2,
    //       color: "#FFFFFF",
    //       fontWeight: 300,
    //     }}
    //   >
    //      UI/UX
    //   </Typography>
    //   <Typography
    //     sx={{
    //       fontSize: "0.75rem",
    //       letterSpacing: 2,
    //       color: "#FFFFFF",
    //       fontWeight: 300,
    //     }}
    //   >
    //     Marketing
    //   </Typography>
    // </Box>
    <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "20px",
    transform: "translateY(-50%) rotate(-90deg)",
    transformOrigin: "left top",
    display: "flex",
    flexDirection: "row",
    gap: 4, // more spacing
    justifyContent: "center",
    alignItems: "center"

  }}
>
  {["Creative Design", "UI/UX", "Marketing"].map((text) => (
    <Typography
      key={text}
      sx={{
        fontSize: "0.75rem",
        letterSpacing: 2,
        color: "#FFFFFF",
        fontWeight: 400,
      }}
    >
      {text}
    </Typography>
  ))}
</Box>

  );
}
