const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const faceRecognition = require('../controllers/faceRecognition')
const { registerFace, compareFaces } = require('../controllers/faceRecognition');
const User = require('../model/User')
const jwt = require('jsonwebtoken');


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

// router.route('/face/register')
//     .post(faceRecognition.registerFace)

router.route('/face/compare')
    .post(faceRecognition.compareFaces)
router.post('/face/register', registerFace);

// Route عام لتسجيل الدخول عبر الوجه (بدون حماية)
router.post('/face-login', async (req, res) => {
    try {
        const { descriptor } = req.body;
    
        if (!descriptor || descriptor.length !== 128) {
          return res.status(400).json({ message: 'Invalid face descriptor' });
        }
    
        const users = await User.find({ faceDescriptor: { $exists: true } });
    
        function euclideanDistance(desc1, desc2) {
          let sum = 0;
          for (let i = 0; i < desc1.length; i++) {
            sum += Math.pow(desc1[i] - desc2[i], 2);
          }
          return Math.sqrt(sum);
        }
    
        for (let user of users) {
          const distance = euclideanDistance(descriptor, user.faceDescriptor);
          if (distance < 0.5) {
            const accessToken = jwt.sign(
              {
                UserInfo: {
                  username: user.username,
                  roles: user.roles
                }
              },
              process.env.ACCESS_TOKEN_SECRET || 'fallback_secret',
              { expiresIn: '15m' }
            );
    
            return res.json({ accessToken });
          }
        }
    
        return res.status(401).json({ message: 'Face not recognized' });
      } catch (err) {
        console.error('🔥 SERVER ERROR:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }
    });



module.exports = router