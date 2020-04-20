import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
		this.onChangeUserPhoneNumber = this.onChangeUserPhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            phone_number: '',
            email: '',
            user_completed: false
        }
    }

    onChangeUserName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeUserEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
	
	onChangeUserPhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`User Description: ${this.state.name}`);
        console.log(`User Responsible: ${this.state.phone_number}`);
        console.log(`User Priority: ${this.state.email}`);
		
		
		const obj = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            status: "Active"
        };
        console.log(obj);
        axios.post('http://localhost:3000/user', obj)
            .then(res => console.log(res.data));
			
			
			        this.setState({
            name: '',
            phone_number: '',
            email: '',
            user_completed: false
        })

        
        this.props.history.push('/');

		
		
        
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeUserName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeUserEmail}
                                />
                    </div>
					<div className="form-group">
                        <label>Phone Number: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.phone_number}
                                onChange={this.onChangeUserPhoneNumber}
                                />
                    </div>
                        
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}