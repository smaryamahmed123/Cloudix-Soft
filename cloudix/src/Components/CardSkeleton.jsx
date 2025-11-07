import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CardSkeleton = () => {
  return (
    <Box
      sx={{
        width: 260,
        height: 200,
        m: 2,
        borderRadius: 4,
        boxShadow: 6,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton width="80%" height={30} sx={{ mt: 2 }} />
      <Skeleton width="60%" height={20} />
    </Box>
  );
};

export default CardSkeleton;
