const express = require('express');
const app = express();
const QRRoute = express.Router();
let QRcodeModdel = require('../model/QRcode');

//get list qr
QRRoute.route('/get').get((req, res) => {
    QRcodeModdel.find((error, QRJgrab) => {
        if (error) {
            return next(error)
        } else {
            // res.send(user)
            res.json(QRJgrab)
            console.log('qr retrieved!')
        }
    })
})

//add list qr
QRRoute.route('/create-qr').post((req, res, next) => {
    QRcodeModdel.create(req.body, (err, QRJgrab) => {
        if (err) {
            return next(err)
        } else {
            res.json(QRJgrab)
            console.log('qr created!')
        }
    })
});


QRRoute.route('/fetch-qr/:user').get((req, res) => {
    QRcodeModdel.find({
            user: req.params.user
        },
        (err, QRcode) => {
            if (err) {
                return next(err)
            } else {
                res.json(QRcode)
                console.log('qr retrieved1!')
            }
        })
})


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

module.exports = QRRoute;