import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

const Book = props => (
            <tr>
                <td>{props.book.title}</td>
                <td>{props.book.subject}</td>
                <td>{props.book.author}</td>
                <td>{props.book.publishingDate}</td>
                <td>{props.book.publisher}</td>
                <td>{props.book.publisherPhone}</td>
                <td>{props.book.publisherEmail}</td>
            </tr>
)

export default class BookList extends Component {

    fields =[
        {
            id: 1,
            name: 'Title',
            param: 'title='
        },
        {
            id: 2,
            name: 'Subject',
            param: 'subject='
        },
        {
            id: 3,
            name: 'Author',
            param: 'author='
        },
        {
            id: 4,
            name: 'Publishing date',
            param: 'publishing_date='
        },
        {
            id: 5,
            name: 'Publisher',
            param: 'publisher='
        },
        {
            id: 6,
            name: 'Publisher phone',
            param: 'publisher_phone='
        },
        {
            id: 7,
            name: 'Publisher email',
            param: 'publisher_email='
        },
    ]

    constructor(props) {
        super(props)

        this.onChangeQuery = this.onChangeQuery.bind(this)
        this.filterBooks = this.filterBooks.bind(this)
        this.loadAllBooks = this.loadAllBooks.bind(this)

        this.state = {
            isLoading: true,
            query: '',
            books: []
        }
    }

    componentDidMount() {
        this.loadAllBooks()
    }

    loadAllBooks(){
        axios.get('http://localhost:5000/books')
            .then(res => {
                this.setState({
                    books: res.data,
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    onChangeQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    filterBooks(e) {
        e.preventDefault()

        this.setState({
            isLoading: true
        })
        let filter = this.menu.value;
        console.log(filter)
        if(filter===0){
            this.loadAllBooks()
        }else{
            axios.get('http://localhost:5000/books?'+this.fields[filter-1].param+this.state.query)
            .then(res => {
                console.log(res)
                this.setState({
                    books: res.data,
                    isLoading: false,
                    query:''
                })
                this.menu.value = 0
            })
            .catch(err => console.log(err))
        }
    }

    bookList() {
        return this.state.books.map(book => {
            return <Book
                    book={book}
                    key={book._id} />
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Books</h3>
                <form onSubmit={this.filterBooks}>
                        <div className="form-group">
                            <label >By: </label>
                            <select ref = {(input)=> this.menu = input}
                                required
                                className="form-control">
                                {
                                    this.fields.map(function (field) {
                                        return (
                                            <option key={field.id}
                                                value={field.id}>
                                                {field.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input
                                type="text"
                                name="title"
                                rows={5}
                                className="form-control"
                                value={this.state.query}
                                onChange={this.onChangeQuery} />
                            <input type="submit"
                                value="Search"
                                className="btn btn-primary" />
                        </div>
                    </form>
                <div className="card">
                    <div className="card-body">
                        <Table>
                            <thead>
                                <tr>
                                    <th>author</th>
                                    <th>title</th>
                                    <th>subject</th>
                                    <th>publishing date</th>
                                    <th>publisher</th>
                                    <th>publisher phone</th>
                                    <th>publisher email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.bookList()}
                            </tbody>
                                
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}