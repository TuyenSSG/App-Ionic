const express = require('express');
const app = express();
const CouponRoute = express.Router();
let CouponModdel = require('../model/Coupon');

//get list qr
CouponRoute.route('/get-coupon').get((req, res) => {
    CouponModdel.find((error, Coupon) => {
        if (error) {
            return next(error)
        } else {
            // res.send(user)
            res.json(Coupon)
            console.log('coupon retrieved!')
        }
    })
})

//add list qr
CouponRoute.route('/create-coupon').post((req, res, next) => {
    CouponModdel.create(req.body, (err, Coupon) => {
        if (err) {
            return next(err)
        } else {
            res.json(Coupon)
            console.log('coupon created!')
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

module.exports = CouponRoute;