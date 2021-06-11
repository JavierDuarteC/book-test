import React, { Component } from 'react'

import axios from 'axios'

export default class CreateBook extends Component {
    constructor(props) {
        super(props)

        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangePublisher = this.onChangePublisher.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            isLoading: false,
            title: '',
            subject: '',
            author: '',
            publishingDate: new Date().toISOString(),
            publisher: '',
            publisherPhone: '',
            publisherEmail: '',
            sendError: ''
        }
    }

    componentDidMount() {
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        })
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        })
    }

    onChangeDate(e) {
        this.setState({
            publishingDate: e.target.value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
        });
    }

    onChangePublisher(e) {
        this.setState({
            publisher: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            publisherPhone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            publisherEmail: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const book = {
            title: this.state.title,
            subject: this.state.subject,
            author: this.state.author,
            publishing_date: this.state.publishingDate,
            publisher: this.state.publisher,
            publisher_phone: this.state.publisherPhone,
            publisher_email: this.state.publisherEmail
        }
        this.setState({
            isLoading: true
        })
        axios.post('http://localhost:5000/books/', book)
            .then(res => {
                this.setState({
                    sendError: res.data.message,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="container">Loading...</div>)
        } else {
            return (
                <div >
                    <br/>
                    <h3 >Save New Book</h3>
                    <br/>
                    {
                        (this.state.sendError) ? (<div className="text-danger"><p>{this.state.sendError}</p></div>) : (null)
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label >Title: </label>
                            <input
                                required
                                type="text"
                                name="title"
                                rows={5}
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle} />
                        </div>
                        <div className="form-group">
                            <label>Subject: </label>
                            <input
                                required
                                type="text"
                                name="subject"
                                rows={5}
                                className="form-control"
                                value={this.state.subject}
                                onChange={this.onChangeSubject} />
                        </div>
                        <div className="form-group">
                            <label>Author: </label>
                            <input
                                required
                                type="text"
                                name="author"
                                rows={5}
                                className="form-control"
                                value={this.state.author}
                                onChange={this.onChangeAuthor} />
                        </div>
                        <div className="form-group">
                            <label>Publishing date: </label>
                            <input
                                required
                                type="text"
                                name="publisher"
                                rows={5}
                                className="form-control"
                                value={this.state.publishingDate}
                                onChange={this.onChangeDate} />
                        </div>
                        <div className="form-group">
                            <label>publisher: </label>
                            <input
                                required
                                type="text"
                                name="publisher"
                                rows={5}
                                className="form-control"
                                value={this.state.publisher}
                                onChange={this.onChangePublisher} />
                        </div>
                        <div className="form-group">
                            <label>Publ. Phone: </label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                rows={5}
                                className="form-control"
                                pattern="?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4}"
                                value={this.state.publisherPhone}
                                onChange={this.onChangePhone} />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                rows={5}
                                className="form-control"
                                value={this.state.publisherEmail}
                                onChange={this.onChangeEmail} />
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                value="Send Book"
                                className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            )
        }
    }
}