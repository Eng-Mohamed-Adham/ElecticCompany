const mongoose = require('mongoose');

// تأكد من تشفير الأحرف الخاصة بشكل صحيح
const password = encodeURIComponent('root**44'); // ستصبح root%2A%2A44
const uri = `mongodb+srv://hamza:${password}@cluster0.r45jwbh.mongodb.net/MongoTuts?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      
      // serverSelectionTimeoutMS: 5000,
      // connectTimeoutMS: 10000
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err);
    process.exit(1);
  }
};

module.exports = connectDB;