import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
         <td>{props.user.userid}</td>
        <td>{JSON.parse(props.user.userfields).name}</td>
        <td>{JSON.parse(props.user.userfields).email}</td>
        <td>{JSON.parse(props.user.userfields).phone_number}</td>
		 <td>{props.user.status}</td>
        <td>
            <Link to={"/edit/"+props.user.email}>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users')
            .then(response => {
				//alert("response---"+JSON.stringify(response));
                this.setState({ users: response.data });
            })
            .catch(function (error){
				console.log(error);
            })
    }

    userList() {
        return this.state.users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Status</th>
							<th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}