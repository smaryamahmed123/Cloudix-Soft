import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Box,
  Pagination,
} from "@mui/material";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // 🔥 Debounced API call
  const debouncedFetch = useMemo(
    () =>
      debounce((page, search) => {
        fetchSubscribers(page, search);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(page, search);

    return () => debouncedFetch.cancel();
  }, [page, search]);

  const fetchSubscribers = async (page, search) => {
    try {
      const res = await axios.get(`${backendURL}/api/newsletter`, {
        params: { page, limit: 10, search },
      });

      setSubscribers(res.data.subscribers);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (email) => {
    // ✅ Confirmation
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await axios.post(`${backendURL}/api/newsletter/unsubscribe`, { email });
      fetchSubscribers(page, search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Subscribers List
      </Typography>

      {/* ✅ Total Count */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total Subscribers: {total}
      </Typography>

      {/* 🔍 Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search by email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Subscribed Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subscribers.map((sub) => (
              <TableRow key={sub._id}>
                <TableCell>{sub.email}</TableCell>
                <TableCell>
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {sub.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDelete(sub.email)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 📄 Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default Subscribers;
