const router = require('express').Router()
let Book = require('../models/book.model')

router.route('/').get((req, res) => {
    const title = req.query.title
    const subject = req.query.subject
    const author = req.query.author
    const publishingDate = req.query.publishing_date
    const publisher = req.query.publisher
    const publisherPhone = req.query.publisher_phone
    const publisherEmail = req.query.publisher_email

    var query = {
    };

    if (title) {
        query.title = title
    }

    if (subject) {
        query.subject = subject
    }

    if (author) {
        query.author = author
    }

    if (publishingDate) {
        query.publishingDate = publishingDate
    }

    if (publisher) {
        query.publisher = publisher
    }

    if (publisherPhone) {
        query.publisherPhone = publisherPhone
    }

    if (publisherEmail) {
        query.publisherEmail = publisherEmail
    }

    Book.find(query)
        .then((books) => {
            res.json(books)
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }))
})

router.route('/').post((req, res) => {
    const title = req.body.title
    const subject = req.body.subject
    const author = req.body.author
    const publishingDate = Date.parse(req.body.publishing_date)
    const publisher = req.body.publisher
    const publisherPhone = req.body.publisher_phone
    const publisherEmail = req.body.publisher_email

    const newBook = new Book({
        title,
        subject,
        author,
        publishingDate,
        publisher,
        publisherPhone,
        publisherEmail
    })

    newBook.save()
        .then(() => {
            return res.send({
                success: true,
                message: 'Book saved.'
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }))
})
module.exports = router