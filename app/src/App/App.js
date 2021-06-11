import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "../components/layout/navbar";
import List from "../components/views/book_list";
import Create from "../components/views/create_book";


class App extends Component {

  componentDidMount() {
  }

  render() {
    return (<Router>
      <div className="container">
        <Navbar />
        <Route exact path="/" component={List} />
        <Route exact path="/create" component={Create} />
      </div>
    </Router>)
  }
}
export default App;