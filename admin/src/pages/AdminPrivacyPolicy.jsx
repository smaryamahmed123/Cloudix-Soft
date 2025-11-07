import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Divider,
} from '@mui/material';

const backendURL = import.meta.env.VITE_BACKEND_URL;
const PrivacyPolicyAdmin = () => {
  const [sections, setSections] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
        setSections(data.sections || []);
      } catch (error) {
        console.error('Error fetching policy:', error);
      }
    };

    fetchPolicy();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.post(`${backendURL}/api/privacy-policy/update`, { sections });
      setSuccess('Privacy Policy Updated Successfully!');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Privacy Policy
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <TextField
            label={`Heading ${index + 1}`}
            value={section.title}
            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            multiline
            minRows={4}
            value={section.content}
            onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Divider sx={{ mt: 3 }} />
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={addSection}>
          Add Section
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyAdmin;
