import React from 'react';
import {CircularProgress} from '@mui/material';

const AbsoluteLoader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}>
      <CircularProgress />
    </div>
  );
};

export default AbsoluteLoader;
