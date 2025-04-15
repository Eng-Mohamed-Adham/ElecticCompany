import React from 'react';
import { useNavigate } from 'react-router-dom';
import FaceRecognition from '../components/FaceRecognition';
import { Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useCompareFacesMutation } from '../features/users/usersApiSlice';

const FaceLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [compareFaces, { isLoading }] = useCompareFacesMutation();

  const handleFaceMatch = async (descriptor) => {
    try {
      const data = await compareFaces({
        descriptor: Array.from(descriptor)
      }).unwrap();

      if (data?.accessToken) {
        dispatch(setCredentials({ accessToken: data.accessToken }));
        navigate('/dash');
      } else {
        alert(data?.message || 'Face not recognized');
      }
    } catch (error) {
      console.error('Face login failed:', error);
      alert(error?.data?.message || 'Login failed, try again');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Face Recognition Login
      </Typography>
      <FaceRecognition onFaceDetected={handleFaceMatch} />
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/login')}>
        Back to Traditional Login
      </Button>
      {isLoading && <Typography sx={{ mt: 2 }}>Matching face, please wait...</Typography>}
    </Box>
  );
};

export default FaceLogin;
