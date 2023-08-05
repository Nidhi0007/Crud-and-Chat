// Filename - Edit.js
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Edit() {

    const token = localStorage.getItem('token')
    const page = localStorage.getItem('page')
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
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.put(`http://localhost:8000/resources/update-resource/${id}?page=${page}`, { name, description }, axiosConfig)
            .then(res => {
                history('/home')
            })
            .catch(error => {
                alert(error.response.data)

            })
        // // Redirecting to main page

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
            {!token && <Link to="/login">Login</Link>}
            
            <Form className="d-grid gap-2"
                >

                {/* setting a name from the 
                    input textfiled */}
                <Form.Group className="m-4"
                    controlId="formBasicEmail">
                    <Form.Control value={name}
                        onChange={e => setname(e.target.value)}
                        type="text" placeholder="Enter Name" />
                </Form.Group>

                {/* setting a Description from the input textfiled */}
                <Form.Group className="m-4"
                    controlId="formBasicPassword">
                    <Form.Control value={description}
                        onChange={e => setdescription(e.target.value)}
                        type="text" placeholder="Description" />
                </Form.Group>

                {/* Hadinling an onclick event 
                    running an edit logic */}
                <Button
                    onClick={(e) => handelSubmit(id)}
                    variant="primary" size="lg">
                    Update
                </Button>

                {/* Redirecting to main page after editing */}
                <Link className="d-grid gap-2" to='/home'>
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