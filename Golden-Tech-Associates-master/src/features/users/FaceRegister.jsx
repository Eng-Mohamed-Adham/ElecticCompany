import React from 'react';
import { useSelector } from 'react-redux';
import FaceRecognition from '../../components/FaceRecognition';
import { Typography, Box } from '@mui/material';
import { useRegisterFaceMutation } from './usersApiSlice';
import useAuth from '../../hooks/useAuth';

const FaceRegister = () => {
      const {username,} = useAuth()
  

  const [registerFace, { isLoading, isError, error }] = useRegisterFaceMutation();
  console.log(username, registerFace)

  const handleRegisterFace = async (descriptor) => {
    try {
      const result = await registerFace({
        username,
        faceDescriptor: Array.from(descriptor)
      }).unwrap();

      alert('Face registered successfully');
    } catch (err) {
      console.error('Face registration failed:', err);
      alert(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2
      }}
    >
      <Typography variant="h4" gutterBottom>Register Your Face</Typography>
      <FaceRecognition onFaceDetected={handleRegisterFace} />
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: 'red' }}>{error?.data?.message || 'An error occurred'}</p>}
    </Box>
  );
};

export default FaceRegister;
