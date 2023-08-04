import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function FormSign() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [username, setusername] = useState('');
    let history = useNavigate();

    const signup = () => {

        axios.post(`http://localhost:8000/user/signup`, {
            email,
            password,
            username

        })
            .then(res => {
                console.log(res.data)
                history('/login')
            })
        // // Redirecting to main page


    }
    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control type='email' placeholder='email' onChange={(e) => setemail(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Username
                </Form.Label>
                <Col sm="10">
                    <Form.Control type='username' placeholder='username' onChange={(e) => setusername(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                </Col>
            </Form.Group>
            <Button variant="primary" onClick={signup}>Signup</Button>{' '}
        </Form>
    );
}

export default FormSign;