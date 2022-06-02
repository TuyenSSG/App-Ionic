const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Coupon = new Schema({
    // _id: {
    //     type: ObjectId
    // },
    coupon_expiry: {
        type: String
    },
    coupon_title: {
        type: String
    },
    coupon_details: {
        type: String
    },
    coupon_banner: {
        type: String
    },
    coupon_code: {
        type: String
    }
}, {
    collection: 'Coupon'
})

module.exports = mongoose.model('Coupon', Coupon)