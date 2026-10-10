import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";
import { SectionCard, fieldSx } from "./contactShared";

const icon = (Icon) => (
    <InputAdornment position="start">
        <Icon sx={{ fontSize: 20, color: dash.muted }} />
    </InputAdornment>
);

const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ContactDetailsForm = ({ info, onChange }) => {
    const emailInvalid = Boolean(info.email) && !looksLikeEmail(info.email);

    return (
        <SectionCard title="Contact Details" hint="Shown on your Contact page and in the website footer.">
            <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 2.5 }}>
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={info.email}
                    onChange={onChange}
                    error={emailInvalid}
                    helperText={emailInvalid ? "This doesn't look like a valid email address" : " "}
                    InputProps={{ startAdornment: icon(EmailOutlined) }}
                    sx={fieldSx}
                />
                <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    value={info.phone}
                    onChange={onChange}
                    helperText=" "
                    InputProps={{ startAdornment: icon(PhoneOutlined) }}
                    sx={fieldSx}
                />
            </Box>

            <TextField
                label="Address"
                name="address"
                fullWidth
                value={info.address}
                onChange={onChange}
                InputProps={{ startAdornment: icon(LocationOnOutlined) }}
                sx={{ mb: 2.5, ...fieldSx }}
            />

            <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                minRows={4}
                value={info.description}
                onChange={onChange}
                sx={fieldSx}
            />
        </SectionCard>
    );
};

export default ContactDetailsForm;