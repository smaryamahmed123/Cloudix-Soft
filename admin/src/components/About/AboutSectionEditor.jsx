import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { dash, cardSx } from "../Dashboard/dashboardPalette";
import AboutImageField from "./AboutImageField";
import { fieldSx } from "./AboutShared";

const AboutSectionEditor = ({ label, hint, data = {}, onChange }) => (
    <Box sx={{ ...cardSx, p: { xs: 2, md: 3 } }}>
        <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>{label}</Typography>
        <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4, mb: 3 }}>{hint}</Typography>

        <Box
            sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.5fr) minmax(0, 1fr)" },
                alignItems: "start",
            }}
        >
            {/* Text fields */}
            <Box>
                <TextField
                    label="Title"
                    fullWidth
                    value={data.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                    sx={{ mb: 2.5, ...fieldSx }}
                />

                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    minRows={7}
                    value={data.description || ""}
                    onChange={(e) => onChange("description", e.target.value)}
                    sx={{ mb: 2.5, ...fieldSx }}
                />

                <TextField
                    label="Highlight"
                    fullWidth
                    multiline
                    minRows={4}
                    value={data.highlight || ""}
                    onChange={(e) => onChange("highlight", e.target.value)}
                    sx={fieldSx}
                />
            </Box>

            {/* Image */}
            <AboutImageField value={data.image} onChange={(file) => onChange("image", file)} />
        </Box>
    </Box>
);

export default AboutSectionEditor;