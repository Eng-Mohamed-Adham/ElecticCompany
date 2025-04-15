import React, { useState } from 'react';
import FaceRecognition from '../components/FaceRecognition';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    faceDescriptor: null
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFaceDetected = (descriptor) => {
    setFormData({ ...formData, faceDescriptor: Array.from(descriptor) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // معالجة الاستجابة...
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="register-form">
      {step === 1 ? (
        <form onSubmit={() => setStep(2)}>
          <h2>Basic Information</h2>
          <input type="text" name="username" placeholder="Username" required onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
          <button type="submit">Next: Face Registration</button>
        </form>
      ) : (
        <div>
          <h2>Face Registration</h2>
          <p>Position your face in the center of the frame</p>
          <FaceRecognition onFaceDetected={handleFaceDetected} />
          {formData.faceDescriptor && (
            <button onClick={handleSubmit}>Complete Registration</button>
          )}
        </div>
      )}
    </div>
  );
}