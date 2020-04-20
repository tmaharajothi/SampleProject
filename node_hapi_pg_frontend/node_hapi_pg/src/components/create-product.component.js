import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCode = this.onChangeProductCode.bind(this);
		this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            code: '',
            price: '',
            name: '',
            product_completed: false
        }
    }

    onChangeProductCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    onChangeProductName(e) {
        this.setState({
            name: e.target.value
        });
    }
	
	onChangeProductPrice(e) {
        this.setState({
            price: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Product Code: ${this.state.code}`);
        console.log(`Product Price: ${this.state.price}`);
        console.log(`Product Code: ${this.state.name}`);
		
		
		const obj = {
            code: this.state.code,
            name: this.state.name,
            price: this.state.price,
            status: "Active"
        };
        console.log(obj);
        axios.post('http://localhost:3000/product', obj)
            .then(res =>

					
			console.log(res.data));
			
			
			        this.setState({
            code: '',
            price: '',
            name: '',
            product_completed: false
        })

        
        this.props.history.push('/products');

		
		
        
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Code: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.code}
                                onChange={this.onChangeProductCode}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeProductName}
                                />
                    </div>
					<div className="form-group">
                        <label>Price: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangeProductPrice}
                                />
                    </div>
                        
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}