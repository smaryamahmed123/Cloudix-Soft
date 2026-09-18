// src/Admin/AdminContactMessages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ADMIN_CONTACT_MSG_URL = `${import.meta.env.VITE_ADMIN_CONTACT_MSG_URL}`;
const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${ADMIN_CONTACT_MSG_URL}/${id}/status`,
        { status: "verified" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMessages();
    } catch (err) {
      console.error("❌ Status update error:", err);
    }
  };


  // ✅ Fetch all contact messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(ADMIN_CONTACT_MSG_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setMessages([]);
    }
  };

  // ✅ Open delete confirmation dialog
  const handleOpenDialog = (msg) => {
    setSelectedMsg(msg);
    setOpenDialog(true);
  };

  // ✅ Close dialog
  const handleCloseDialog = () => {
    setSelectedMsg(null);
    setOpenDialog(false);
  };

  // ✅ Delete message after confirmation
  const handleConfirmDelete = async () => {
    if (!selectedMsg) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${ADMIN_CONTACT_MSG_URL}/${selectedMsg._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
      handleCloseDialog();
    } catch (err) {
      console.error('❌ Delete error:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 2 },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          mx: 'auto',
          p: { xs: 2, md: 4 },
          backgroundColor: 'background.paper',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            mb: 3,
            textAlign: 'center',
          }}
        >
          📩 Contact Messages
        </Typography>

        {messages.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              textAlign: 'center',
              py: 4,
              fontStyle: 'italic',
            }}
          >
            No messages found.
          </Typography>
        ) : (
          <List>
            {messages.map((msg) => (
              <React.Fragment key={msg._id}>
                <ListItem
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(24, 188, 156, 0.1)',
                    },
                    borderRadius: 2,
                  }}
                  secondaryAction={
                    <>
                      {/* ✅ Mark as Verified Button */}
                      <Button
                        variant={msg.status === "verified" ? "contained" : "outlined"}
                        size="small"
                        sx={{ mr: 2 }}
                        onClick={() => handleVerify(msg._id)}
                        disabled={msg.status === "verified"}
                      >
                        {msg.status === "verified" ? "Verified" : "Mark as Verified"}
                      </Button>

                      {/* 🗑️ Delete Button */}
                      <IconButton
                        edge="end"
                        onClick={() => handleOpenDialog(msg)}
                        aria-label="delete"
                        sx={{
                          color: 'error.main',
                          '&:hover': { backgroundColor: 'rgba(231, 76, 60, 0.1)' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ fontWeight: 600, color: 'text.primary' }}
                      >
                        {msg.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ display: 'block', color: 'text.primary' }}
                        >
                          <strong>Email:</strong> {msg.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            display: "block",
                            color: "text.primary",
                          }}
                        >
                          <strong>Phone:</strong> {msg.phoneNo}
                        </Typography>

                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            display: "block",
                            color: "text.primary",
                          }}
                        >
                          <strong>Service:</strong>{" "}
                          {msg.service || "Not selected"}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ display: 'block', color: 'text.primary' }}
                        >
                          <strong>Message:</strong> {msg.message}
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ mt: 1 }}>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              color: msg.status === "verified" ? "green" : "orange",
                              fontWeight: 600,
                            }}
                          >
                            {msg.status}
                          </span>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} /> {/* ✅ Divider after ListItem */}
              </React.Fragment>

            ))}
          </List>
        )}
      </Paper>

      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
            Are you sure you want to delete the message from{' '}
            <strong>{selectedMsg?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminContactMessages;
