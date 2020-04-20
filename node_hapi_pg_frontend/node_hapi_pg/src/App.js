import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/create-user.component";
import UsersList from "./components/users-list.component";
import CreateProduct from "./components/create-product.component";
import ProductsList from "./components/products-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Samsung App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create_user" className="nav-link">Create User</Link>
                </li>
				<li className="navbar-item">
                  <Link to="/products" className="nav-link">Products</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create_product" className="nav-link">Create Product</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={UsersList} />
          <Route path="/create_user" component={CreateUser} />
		  <Route path="/products" exact component={ProductsList} />
          <Route path="/create_product" component={CreateProduct} />
        </div>
      </Router>
    );
  }
}

export default App;