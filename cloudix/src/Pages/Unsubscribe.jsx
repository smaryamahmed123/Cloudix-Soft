import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, CircularProgress, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Unsubscribe = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    // "loading" | "success" | "error"
    const [status, setStatus] = useState("loading");
    const [resultMessage, setResultMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setResultMessage("This unsubscribe link is missing its token.");
            return;
        }

        axios
            .post(`${backendURL}/api/newsletter/unsubscribe-token`, { token })
            .then((res) => {
                setStatus("success");
                setResultMessage(res.data?.message || "You have been unsubscribed.");
            })
            .catch((err) => {
                setStatus("error");
                setResultMessage(
                    err.response?.data?.message ||
                    "This unsubscribe link is invalid or has expired."
                );
            });
    }, [token]);

    return (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 45%, #F7F9FB 100%)",
            }}
        >
            <Helmet>
                <title>Unsubscribe | Cloudix Soft</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
                {status === "loading" && (
                    <>
                        <CircularProgress sx={{ color: "primary.main", mb: 3 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Processing your request…
                        </Typography>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircleOutlineIcon sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                            You're unsubscribed
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {resultMessage} You won't receive blog notification emails from
                            us anymore.
                        </Typography>
                        <Button component={Link} to="/" variant="contained" sx={{ textTransform: "none" }}>
                            Back to homepage
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <ErrorOutlineIcon sx={{ fontSize: 56, color: "#c62828", mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                            Something went wrong
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {resultMessage}
                        </Typography>
                        <Button component={Link} to="/contact" variant="outlined" sx={{ textTransform: "none" }}>
                            Contact us instead
                        </Button>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Unsubscribe;