import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { SectionCard, fieldSx } from "./contactShared";

const PLATFORMS = [
    { name: "facebook", label: "Facebook", Icon: Facebook, color: "#1877F2" },
    { name: "twitter", label: "Twitter", Icon: Twitter, color: "#1D9BF0" },
    { name: "linkedin", label: "LinkedIn", Icon: LinkedIn, color: "#0A66C2" },
    { name: "instagram", label: "Instagram", Icon: Instagram, color: "#D6249F" },
];

const SocialLinksForm = ({ socialLinks, onChange }) => (
    <SectionCard title="Social Links" hint="Full profile URLs, e.g. https://facebook.com/yourpage">
        <Box sx={{ display: "grid", gap: 2.2 }}>
            {PLATFORMS.map(({ name, label, Icon, color }) => (
                <TextField
                    key={name}
                    label={label}
                    name={name}
                    fullWidth
                    placeholder="https://"
                    value={socialLinks[name]}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon sx={{ fontSize: 20, color }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={fieldSx}
                />
            ))}
        </Box>
    </SectionCard>
);

export default SocialLinksForm;