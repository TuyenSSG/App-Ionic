const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./db/database');

// MongoDB connection 
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Database connected ')
    },
    error => {
        console.log('Database not connected : ' + error)
    }
)

const userRoute = require('./routes/user.route');
const couponRoute = require('./routes/coupon.route');
const NotiRoute = require('./routes/noti.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/api', userRoute);
app.use('/api', couponRoute);
app.use('/api', NotiRoute);
const ip = process.env.IP || '164.70.95.147';
// const ip = process.env.IP || '192.168.96.72';
const port = process.env.PORT || 39395;
console.log(process.env);

app.listen(port, ip, () => {
    console.log('PORT connected: ' + ip + ":" + port)
})
app.use(function(error, res, ) {
    console.error("lỗi" + error.message);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send(error.message);
});