import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = ({ onFaceDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [loading, setLoading] = useState(true);
  const [hasDetected, setHasDetected] = useState(false); // يمنع التكرار

  // تحميل النماذج
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        setLoading(false);
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    };
    loadModels();
  }, []);

  // تشغيل الكاميرا
  useEffect(() => {
    if (loading) return;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Camera access denied:', err);
      }
    };
    startVideo();
  }, [loading]);

  // الكشف التلقائي عن الوجه عند توفر الكاميرا
  useEffect(() => {
    if (loading || !videoRef.current) return;

    const detectFace = async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended || hasDetected) {
        requestAnimationFrame(detectFace);
        return;
      }

      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        // حفظ البصمة
        // console.log("Face detected:", detection);

        onFaceDetected(detection.descriptor);
        setHasDetected(true);
 
        // رسم الكشف على الكانفس
        if (!canvasRef.current || !videoRef.current) return;

        const dims = faceapi.matchDimensions(canvasRef.current, videoRef.current, true);
                const resizedDetections = faceapi.resizeResults(detection, dims);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, [resizedDetections]);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, [resizedDetections]);
      }

      requestAnimationFrame(detectFace);
    };

    detectFace();
            // ✅ إيقاف الكاميرا
  const stream = videoRef.current?.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  }

  }, [loading, hasDetected]);

  return (
    <div className="face-recognition" style={{ position: 'relative', width: 400, height: 300 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <canvas
        ref={canvasRef}
        width="400"
        height="300"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      {loading && <p>Loading face recognition models...</p>}
    </div>
  );
};

export default FaceRecognition;
