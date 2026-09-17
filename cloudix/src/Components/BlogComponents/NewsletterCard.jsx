import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({
        type: "warning",
        text: "Please enter your email address.",
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({
        type: "warning",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      await axios.post(
        `${backendURL}/api/newsletter/subscribe`,
        { email: email.trim().toLowerCase() }
      );

      setEmail("");

      setMessage({
        type: "success",
        text: "You're subscribed successfully!",
      });
    } catch (error) {
      setMessage({
        type:
          error.response?.status === 409
            ? "info"
            : "error",
        text:
          error.response?.status === 409
            ? "This email is already subscribed."
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, #111E2C 0%, #1d3448 100%)",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(118,153,20,0.18)",
          color: "#BBBF19",
          mb: 2,
        }}
      >
        <EmailOutlinedIcon />
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 800 }}
      >
        Stay in the loop
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
        }}
      >
        Get practical digital marketing, technology, and
        business insights directly in your inbox.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2.5 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              borderRadius: "10px",
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            mt: 1.2,
            py: 1,
            borderRadius: "10px",
            backgroundColor: "#769914",
            color: "#fff",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#5f7d10",
            },
          }}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </Box>

      {message.text && (
        <Alert
          severity={message.type}
          sx={{ mt: 2 }}
        >
          {message.text}
        </Alert>
      )}
    </Box>
  );
};

export default NewsletterCard;