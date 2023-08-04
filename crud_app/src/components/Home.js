// Filename - Home.js
import React, { useEffect, useState } from 'react'
import { Button, Table, Pagination } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    const token = localStorage.getItem('token')
    const [array, setarray] = useState([]);
    const [deletedState, setdeleted] = useState([]);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    const [page, setpage] = useState(0);

    // You may skip this part if you're
    // using react-context api or redux
    function setID(id, name, description, page) {
        localStorage.setItem('id', id);
        localStorage.setItem('description', description);
        localStorage.setItem('name', name);
        localStorage.setItem('page', page);
    }

    // Deleted function - functionality 
    // for deleting the entry
    function deleted(id) {

        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };


        axios.delete(`http://localhost:8000/resources/remove-resource/${id}`, axiosConfig)
            .then(res => {
                setdeleted(res.data ? true : false)
            })

    }

    const getResources = () => {
        // Prevent reload
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };


        axios.get(`http://localhost:8000/resources/get-resource?page=${page}`, axiosConfig)
            .then(res => {
                setarray(res.data.resources)
                setTotal(res.data.totalPages)
                setCurrent(res.data.currentPage)
            })
    }
    useEffect(() => {
        getResources()
    }, [deletedState, page]);
    let items = [];
    for (let number = 1; number <= total; number++) {
        items.push(
            <Pagination.Item key={number} active={number === current} onClick={() => setpage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div style={{ margin: '10rem' }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>

                    {/* Mapping though every element 
                        in the array and showing the 
                        data in the form of table */}
                    {array.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.description}</td>

                                {/* getting theid,name, and 
                                    age for storing these
                                    value in the jsx with 
                                    onclick event */}
                                <td><Link to={`/edit`}>
                                    <Button onClick={(e) =>
                                        setID(item._id, item.name, item.description, page)}
                                        variant="info">
                                        Update</Button></Link>
                                </td>

                                {/* Using thr deleted function passing
                                    the id of an entry */}
                                <td><Button onClick={e => deleted(item._id)}
                                    variant="danger">Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Pagination>{items}</Pagination>

            {/* Button for redirecting to create page for
                insertion of values */}
            <Link className="d-grid gap-2" to='/create'>
                <Button variant="warning" size="lg">Create</Button>
            </Link>
        </div>
    )
}

export default Home