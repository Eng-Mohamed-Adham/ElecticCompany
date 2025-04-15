require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const User = require('./model/User')
const jwt = require('jsonwebtoken')
// const { loadModels } = require('./controllers/faceRecognition');

const mongoose = require('mongoose');

// إصلاح تحذيرات الـ Promise
mongoose.Promise = global.Promise;

// تعطيل التحذيرات القديمة
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5000




connectDB();


// // أضف هذا قبل تعريف ال routes
// loadModels().then(() => {
//     console.log('Face models loaded successfully');
//   }).catch(err => {
//     console.error('Error loading face models:', err);
//   });
  

app.use(logger)

app.use(cors(corsOptions))
function euclideanDistance(desc1, desc2) {
    let sum = 0;
    for (let i = 0; i < desc1.length; i++) {
      sum += Math.pow(desc1[i] - desc2[i], 2);
    }
    return Math.sqrt(sum);
  }
  

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))



app.use('/auth',require('./routes/authRoutes'))


app.use('/users', require('./routes/userRoutes'))

app.use('/notes', require('./routes/noteRoutes'))
app.use('/parts', require('./routes/partRoutes'))
app.use('/clients',require('./routes/clientRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})