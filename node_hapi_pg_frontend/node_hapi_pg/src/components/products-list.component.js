import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product.code}</td>
        <td>{props.product.name}</td>
        <td>{props.product.price}</td>
		<td>{props.product.status}</td>
        <td>
            <Link to={"/edit/"+props.product.id}>Edit</Link>
        </td>
    </tr>
)

export default class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    productList() {
        return this.state.products.map(function(currentProduct, i){
            return <Product product={currentProduct} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Products List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Model Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
							<th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
        )
    }
}