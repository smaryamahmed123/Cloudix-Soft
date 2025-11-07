import React from "react";
import { Paper, Typography, Stack, IconButton, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ServiceCard({ service, onEdit, onDelete, onToggle }) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        borderTop: `5px solid #18BC9C`,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
      }}
    >
      {service.iconImage && (
        <img
          src={service.iconImage}
          alt={service.title}
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            marginBottom: 12,
            objectFit: "cover",
          }}
        />
      )}

      <Typography variant="h6" sx={{ color: "#2C3E50", fontWeight: 700 }}>
        {service.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#2C3E50", mt: 1 }}>
        {service.description}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" mt={2} alignItems="center">
        <Switch
          checked={service.visible}
          onChange={() => onToggle(service)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#18BC9C" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#18BC9C" },
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#2C3E50" }}>
          {service.visible ? "Visible" : "Hidden"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} mt={2}>
        <IconButton onClick={() => onEdit(service)} sx={{ color: "#18BC9C" }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(service._id)} sx={{ color: "#E74C3C" }}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
