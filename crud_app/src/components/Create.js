// Filename - Create.js
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
    const token=localStorage.getItem('token')
    const page = localStorage.getItem('page')
    // Making usestate for setting and
    // fetching a value in jsx
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');

    // Using useNavigation for redirecting to pages
    let history = useNavigate();

    // Function for creating a post/entry
    const handelSubmit = async (e) => {
        e.preventDefault();  // Prevent reload
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };


        await axios.post(`http://localhost:8000/resources/add-resource?page=${page}`, {
            name: name,
            description: description
        }, axiosConfig)
            .then(res => {
                history('/home')
            })
            .catch(error => {
                alert(error.response.data)
                console.log(error.response.data.error)
             })

        // Redirecting to home page after creation done
    }

    return (
        <div >
                {!token && <Link to="/login">Login</Link>}
            <Form className="d-grid gap-2"
                style={{ margin: '15rem' }}>

                {/* Fetching a value from input textfirld 
                    in a setname using usestate*/}
                <Form.Group className="mb-3"
                    controlId="formBasicName">
                    <Form.Control onChange=
                        {e => setname(e.target.value)}
                        type="text"
                        placeholder="Enter Name" required />
                </Form.Group>

                {/* Fetching a value from input textfirld in
                    a setage using usestate*/}
                <Form.Group className="mb-3"
                    controlId="formBasicAge">
                    <Form.Control onChange=
                        {e => setdescription(e.target.value)}
                        type="text"
                        placeholder="Description" required />
                </Form.Group>

                {/* handing a onclick event in button for
                    firing a function */}
                <Button
                    onClick={e => handelSubmit(e)}
                    variant="primary" type="submit">
                    Submit
                </Button>

                {/* Redirecting back to home page */}
                <Link className="d-grid gap-2" to='/home'>
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default Create