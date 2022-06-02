const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Noti = new Schema({
    // _id: {
    //     type: ObjectId
    // },
    news_title: {
        type: String
    },
    news_content: {
        type: String
    },
    datetime: {
        type: String
    }
}, {
    collection: 'Notifaction'
})

module.exports = mongoose.model('Notifaction', Noti)