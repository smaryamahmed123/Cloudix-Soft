import React from "react";
import {
    Box,
    Button,
    Fade,
    Modal,
    Stack,
    TextField,
    Typography,
    Backdrop,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "calc(100% - 32px)",
        sm: 520,
    },
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 3,
    outline: "none",
};

export default function LogoFormModal({
    open,
    form,
    setForm,
    editingLogo,
    onClose,
    onSave,
    loading,
}) {
    const imagePreview =
        form.imageFile
            ? URL.createObjectURL(form.imageFile)
            : form.currentImage;

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 300,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={800}
                                color="dash.navy"
                            >
                                {editingLogo
                                    ? "Edit Logo"
                                    : "Add New Logo"}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="dash.muted"
                                mt={0.5}
                            >
                                {editingLogo
                                    ? "Update your logo details."
                                    : "Upload a new brand logo."}
                            </Typography>
                        </Box>

                        <Button
                            onClick={onClose}
                            sx={{
                                minWidth: 40,
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                color: "dash.muted",
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </Stack>

                    <TextField
                        fullWidth
                        label="Logo Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        sx={{ mb: 3 }}
                    />

                    {/* Preview */}
                    {imagePreview && (
                        <Box
                            sx={{
                                height: 150,
                                border: "1px solid",
                                borderColor: "dash.border",
                                borderRadius: 3,
                                mb: 2,
                                display: "grid",
                                placeItems: "center",
                                bgcolor: "#fafafa",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Logo preview"
                                sx={{
                                    maxWidth: "85%",
                                    maxHeight: "85%",
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    )}

                    <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<ImageOutlinedIcon />}
                        sx={{
                            height: 50,
                            borderRadius: 2,
                            borderColor: "dash.border",
                            color: "dash.navy",
                            fontWeight: 700,
                        }}
                    >
                        {form.imageFile
                            ? form.imageFile.name
                            : editingLogo
                                ? "Replace Logo Image"
                                : "Choose Logo Image"}

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                setForm((prev) => ({
                                    ...prev,
                                    imageFile: file,
                                }));
                            }}
                        />
                    </Button>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1.5}
                        mt={3}
                    >
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            disabled={loading}
                            sx={{
                                borderColor: "dash.border",
                                color: "dash.navy",
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={onSave}
                            disabled={loading}
                            sx={{
                                bgcolor: "dash.green",
                                fontWeight: 700,
                                px: 3,
                                "&:hover": {
                                    bgcolor: "dash.greenDark",
                                },
                            }}
                        >
                            {editingLogo ? "Save Changes" : "Add Logo"}
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}