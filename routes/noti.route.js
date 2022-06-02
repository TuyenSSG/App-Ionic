const express = require('express');
const app = express();
const NotiRoute = express.Router();
let NotiModdel = require('../model/Noti');

//get list qr
NotiRoute.route('/get-noti').get((req, res) => {
    NotiModdel.find((error, Noti) => {
        if (error) {
            return next(error)
        } else {
            // res.send(user)
            res.json(Noti)
            console.log('Noti retrieved!')
        }
    })
})

//add list qr
NotiRoute.route('/create-noti').post((req, res, next) => {
    NotiModdel.create(req.body, (err, Noti) => {
        if (err) {
            return next(err)
        } else {
            res.json(Noti)
            console.log('Noti created!')
        }
    })
});


// CouponRoute.route('/fetch-coupon/:user').get((req, res) => {
//     CouponModdel.find({
//             user: req.params.user
//         },
//         (err, QRcode) => {
//             if (err) {
//                 return next(err)
//             } else {
//                 res.json(QRcode)
//                 console.log('qr retrieved1!')
//             }
//         })
// })


// QRRoute.route('/update-qr/:id').put((req, res, next) => {
//     QRcodeModdel.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (err, QRcode) => {
//         if (err) {
//             return next(err);
//         } else {
//             res.json(QRcode)
//             console.log('qr updated!')
//         }
//     })
// })

// QRRoute.route('/delete-qr/:id').delete((req, res, next) => {
//     QRcodeModdel.findByIdAndRemove(req.params.id, (error, QRcode) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: QRcode
//             })
//             console.log('qr deleted!')
//         }
//     })
// })

module.exports = NotiRoute;