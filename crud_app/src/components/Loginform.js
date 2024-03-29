import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Formlogin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history = useNavigate();

    const login = () => {

        axios.post(`http://localhost:8000/user/login`, {
            email,
            password

        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                history('/home')
            })
            .catch(error => {
                console.log(error)
                alert(error.response.data)
                console.log(error.response.data.error)
            })


    }
    return (
        <Form style={{ margin: "7rem" }}>
            <h1>Login</h1>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2" >
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control type='email' placeholder='email' onChange={(e) => setemail(e.target.value)} />
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

            <Button variant="primary" onClick={login}>Login</Button>{' '}
            <Link to="/">Signup</Link>
        </Form>
    );
}

export default Formlogin;