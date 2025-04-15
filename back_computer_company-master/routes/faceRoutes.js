const User = require('./model/User');
const jwt = require('jsonwebtoken');


app.post('/api/face-login', async (req, res) => {
  const { descriptor } = req.body;

  if (!descriptor || descriptor.length !== 128) {
    return res.status(400).json({ message: 'Invalid face descriptor' });
  }

  const users = await User.find({ faceDescriptor: { $exists: true } });

  for (let user of users) {
    const storedDescriptor = user.faceDescriptor;
    const distance = euclideanDistance(descriptor, storedDescriptor);

    if (distance < 0.5) {
      // إنشاء توكن JWT
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            roles: user.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      return res.json({ success: true, accessToken });
    }
  }

  return res.status(401).json({ message: 'Face not recognized' });
});
