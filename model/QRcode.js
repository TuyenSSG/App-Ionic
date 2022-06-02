const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QRJgrab = new Schema({
    // _id: {
    //     type: ObjectId
    // },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    url: {
        type: String
    },
    date_time: {
        type: String
    },
    user: {
        type: String
    }
}, {
    collection: 'QRcode'
})

module.exports = mongoose.model('QRcode', QRJgrab)