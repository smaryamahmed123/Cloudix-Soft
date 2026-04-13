import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/newsletter`);
      setSubscribers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (email) => {
  await axios.post(`${backendURL}/api/newsletter/unsubscribe`, { email });
  fetchSubscribers(); // refresh
};

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Subscribers List
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Subscribed Date</TableCell>
              <TableCell>Status</TableCell>
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
    </Container>
  );
};

export default Subscribers;
