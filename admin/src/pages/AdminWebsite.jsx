import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
    Box,
    Grid,
    Typography,
    Modal,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import imageCompression from "browser-image-compression";

import WebsiteCard from "../components/WebsiteCard";
import UploadWebsiteForm from "../components/UploadWebsiteForm";
import FloatingAddButton from "../components/FloatingAddButton";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

export default function AdminWebsitesManager() {
    const [websites, setWebsites] = useState([]);
    const [form, setForm] = useState({
        title: "",
        link: "",
        category: "",
        image: null,
    });

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // 📥 Fetch websites
    const fetchWebsites = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/websites");
            setWebsites(res.data);
        } catch {
            setSnackbar({
                open: true,
                message: "Failed to fetch websites ❌",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();
    }, []);

    // 🔀 Drag & Drop reorder
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reordered = Array.from(websites);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);

        setWebsites(reordered);

        try {
            await api.put("/api/websites/reorder",
                { ids: reordered.map((w) => w._id) },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch {
            setSnackbar({
                open: true,
                message: "Failed to save order ❌",
                severity: "error",
            });
        }
    };

    // 📤 Upload website
    // const handleUpload = async () => {
    //     if (!form.title || !form.link || !form.category || !form.image) {
    //       setSnackbar({
    //         open: true,
    //         message: "Please fill all fields ⚠️",
    //         severity: "warning",
    //       });
    //       return;
    //     }

    //     const formData = new FormData();
    //     Object.keys(form).forEach((key) => {
    //         formData.append(key, form[key]);
    //     });

    //     try {
    //         setLoading(true);
    //         await api.post("/api/websites", formData, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         setForm({ title: "", link: "", category: "", image: null });
    //         fetchWebsites();
    //         setOpenModal(false);

    //         setSnackbar({
    //             open: true,
    //             message: "Website added successfully ✅",
    //             severity: "success",
    //         });
    //     } catch {
    //         setSnackbar({
    //             open: true,
    //             message: "Failed to add website ❌",
    //             severity: "error",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleUpload = async () => {
        if (!form.title || !form.link || !form.category || !form.image) {
            setSnackbar({
                open: true,
                message: "Please fill all fields ⚠️",
                severity: "warning",
            });
            return;
        }

        try {
            setLoading(true);

            // ✅ Compress the image before upload
            const options = {
                maxSizeMB: 1,            // compress to ~1MB
                maxWidthOrHeight: 1920,  // resize if too large
                useWebWorker: true       // faster
            };
            const compressedImage = await imageCompression(form.image, options);

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("link", form.link);
            formData.append("category", form.category);
            formData.append("image", compressedImage); // use compressed image

            await api.post("/api/websites", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setForm({ title: "", link: "", category: "", image: null });
            fetchWebsites();
            setOpenModal(false);

            setSnackbar({
                open: true,
                message: "Website added successfully ✅",
                severity: "success",
            });
        } catch (error) {
            console.error(error);
            setSnackbar({
                open: true,
                message: "Failed to add website ❌",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    // 🗑️ Delete website
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await api.delete(`/api/websites/${id}`);
            await fetchWebsites();
            setSnackbar({
                open: true,
                message: "Website deleted 🗑️",
                severity: "success",
            });
        } catch {
            setSnackbar({
                open: true,
                message: "Failed to delete website ❌",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: isMobile ? 2 : 4, minHeight: "100vh" }}>
            <Typography variant="h4" textAlign="center" mb={1}>
                Manage Websites (Admin)
            </Typography>

            <Typography
                variant="caption"
                display="block"
                textAlign="center"
                sx={{ opacity: 0.6, mb: 3 }}
            >
                Drag cards to reorder websites
            </Typography>

            {/* Desktop Upload */}
            {!isMobile && (
                <UploadWebsiteForm
                    form={form}
                    setForm={setForm}
                    handleUpload={handleUpload}
                    loading={loading}
                />
            )}

            {/* 🔀 Drag & Drop Grid */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="websitesGrid">
                    {(provided) => (
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {websites.map((site, index) => (
                                <Draggable
                                    key={site._id}
                                    draggableId={site._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ cursor: "grab" }}
                                        >
                                            <WebsiteCard
                                                site={site}
                                                onDelete={handleDelete}
                                            />
                                        </Grid>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Mobile Modal */}
            {isMobile && (
                <>
                    <FloatingAddButton onClick={() => setOpenModal(true)} />
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <UploadWebsiteForm
                            form={form}
                            setForm={setForm}
                            handleUpload={handleUpload}
                            loading={loading}
                            isMobile
                        />
                    </Modal>
                </>
            )}

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
            <LoadingBackdrop open={loading} />
        </Box>
    );
}
