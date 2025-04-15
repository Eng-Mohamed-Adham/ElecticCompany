// controllers/faceRecognition.js
const asyncHandler = require('express-async-handler');
const User = require('../model/User'); // إضافة استيراد نموذج المستخدم

// @desc    مقارنة أوصاف الوجه (يتم من الجانب العميل)
// @route   POST /users/face/compare
// @access  Private
exports.compareFaces = asyncHandler(async (req, res) => {
    const { storedDescriptor, incomingDescriptor } = req.body;
    console.log(storedDescriptor,incomingDescriptor)

    if (!storedDescriptor || !incomingDescriptor) {
        return res.status(400).json({ 
            message: 'كلتا الأوصاف مطلوبة للمقارنة' 
        });
    }

    // في الواقع، هذه الحسابات يجب أن تتم على العميل
    // هذا مثال للتوضيح فقط
    const calculateSimilarity = (desc1, desc2) => {
        if (desc1.length !== desc2.length) return 0;
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (let i = 0; i < desc1.length; i++) {
            dotProduct += desc1[i] * desc2[i];
            magnitude1 += desc1[i] ** 2;
            magnitude2 += desc2[i] ** 2;
        }
        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);
        return dotProduct / (magnitude1 * magnitude2);
    };

    const similarity = calculateSimilarity(storedDescriptor, incomingDescriptor);
    const isMatch = similarity > 0.6; // يمكن تعديل العتبة حسب الحاجة

    res.json({
        isMatch,
        similarity,
        message: isMatch ? 'تم التعرف على الوجه بنجاح' : 'عدم تطابق الوجوه'
    });
});

// @desc    تسجيل وصف الوجه للمستخدم
// @route   POST /users/face/register
// @access  Private
exports.registerFace = asyncHandler(async (req, res) => {
    const { username, faceDescriptor } = req.body;
  
    if (!username || !faceDescriptor?.length) {
      return res.status(400).json({ message: 'اسم المستخدم ووصف الوجه مطلوبان' });
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'المستخدم غير موجود' });
      }
  
      user.faceDescriptor = faceDescriptor;
      await user.save();
  
      res.json({
        success: true,
        message: 'تم تسجيل بصمة الوجه بنجاح',
        faceDescriptor: user.faceDescriptor
      });
    } catch (error) {
      console.error('خطأ في تسجيل الوجه:', error);
      res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الوجه' });
    }
  });
  