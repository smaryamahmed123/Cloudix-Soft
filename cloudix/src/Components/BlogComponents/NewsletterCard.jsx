import React, { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, InputBase, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage({ type: "warning", text: "Please enter a valid email address." });
      return;
    }
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      await axios.post(`${backendURL}/api/newsletter/subscribe`, {
        email: email.trim().toLowerCase(),
      });
      setEmail("");
      setMessage({ type: "success", text: "You're subscribed successfully!" });
    } catch (error) {
      const dup = error.response?.status === 409;
      setMessage({
        type: dup ? "info" : "error",
        text: dup ? "This email is already subscribed." : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: "16px", bgcolor: "primary.dark", color: "#fff", height: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
            border: "1.5px solid", borderColor: "primary.main", color: "secondary.main",
            display: "grid", placeItems: "center",
          }}
        >
          <EmailOutlinedIcon />
        </Box>
        <Box>
          <Typography sx={{ color: "secondary.main", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1 }}>
            STAY UPDATED
          </Typography>
          <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" }, lineHeight: 1.25 }}>
            Get Our Latest Articles Straight to Your Inbox
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.7 }}>
        Join the newsletter and never miss a new post. Marketing tips, resources and updates delivered to your email.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2.5, display: "flex", bgcolor: "#fff", borderRadius: "10px", overflow: "hidden" }}
      >
        <InputBase
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          inputProps={{ "aria-label": "Email address" }}
          sx={{ px: 2, fontSize: "0.85rem" }}
        />
        <Button
          type="submit"
          disabled={loading}
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 2.5, borderRadius: 0, bgcolor: "primary.main", color: "#fff",
            textTransform: "none", fontWeight: 700, whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#5f7d10" },
          }}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </Box>

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2.5, color: "rgba(255,255,255,0.75)", fontSize: "0.72rem" }}>
        {["No spam", "Unsubscribe anytime", "Free resources"].map((t) => (
          <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 15, color: "primary.main" }} />
            {t}
          </Box>
        ))}
      </Box>

      {message.text && <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>}
    </Box>
  );
};

export default NewsletterCard;