// src/components/IconTextRow.jsx
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const IconTextRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export default IconTextRow;
