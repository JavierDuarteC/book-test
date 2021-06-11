const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        subject:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        publishingDate:{
            type: Date,
            required: true
        },
        publisher:{
            type: String,
            required: true
        },
        publisherPhone:{
            type: String,
            required: true
        },
        publisherEmail:{
            type: String,
            required: false
        },
    },{
        timestamps: false
    }
)

const Book = mongoose.model('Books',bookSchema)

module.exports = Book