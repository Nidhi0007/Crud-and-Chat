// Filename - Edit.js
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
function Edit() {

    const token=localStorage.getItem('token')
    const page=localStorage.getItem('page')
    // Here usestate has been used in order
    // to set and get values from the jsx
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [id, setid] = useState('');

    // Used for navigation with logic in javascript
    let history = useNavigate()

    // Getting an index of an entry with an
    // Function for handling the edit and 
    // pushing changes of editing/updating
    const handelSubmit = (id) => {

        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZGhpenNhYW1AZy5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRjeWVDbi55Ym9aaC5KSFVwOXlHM3hlS21QUUYybEovWFU3UHJTdUtjc1BuZWdCSG43TXAuMiIsImlhdCI6MTY5MTA2Mzg5OH0.aEkWqDnkQROCvORHETVQ3zYNaUAHzCZ23rkyd9IzpJ8"
        // Prevent reload
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.put(`http://localhost:8000/resources/update-resource/${id}?page=${page}`, {
            name,
            description

        }, axiosConfig)
            .then(res => {
                console.log(res.data)
            })
        // // Redirecting to main page
        history('/')
    }


    // Useeffect take care that page will
    // be rendered only once
    useEffect(() => {
        setname(localStorage.getItem('name'))
        setdescription(localStorage.getItem('description'))
        setid(localStorage.getItem('id'))
    }, [])

    return (
        <div>
            <Form className="d-grid gap-2"
                style={{ margin: '15rem' }}>

                {/* setting a name from the 
                    input textfiled */}
                <Form.Group className="mb-3"
                    controlId="formBasicEmail">
                    <Form.Control value={name}
                        onChange={e => setname(e.target.value)}
                        type="text" placeholder="Enter Name" />
                </Form.Group>

                {/* setting a age from the input textfiled */}
                <Form.Group className="mb-3"
                    controlId="formBasicPassword">
                    <Form.Control value={description}
                        onChange={e => setdescription(e.target.value)}
                        type="text" placeholder="Age" />
                </Form.Group>

                {/* Hadinling an onclick event 
                    running an edit logic */}
                <Button
                    onClick={e => handelSubmit(id)}
                    variant="primary" type="submit" size="lg">
                    Update
                </Button>

                {/* Redirecting to main page after editing */}
                <Link className="d-grid gap-2" to='/'>
                    <Button variant="warning"
                        size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default Edit