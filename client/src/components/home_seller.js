import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard,  MDBCardBody,  MDBInput, MDBSelect, MDBRadio } from 'mdb-react-ui-kit';

const Home = () => {

    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/home').then(res => {
        if(res.data.notlog){
            window.location.href = '/login';
        } else {
            setProfile(res.data.user);
            setProducts(res.data.products);
            setLoading(false);
        }
        }).catch(err => console.error(err));
    }, []);

    const removeProduct = (product_id) => {
    axios.post("http://localhost:8080/home/remove", {product_id : product_id}).then((response) => {
        if (response.data.notlog) {
            window.location.href = '/login';
        } else {
            setProducts(products.filter(product => product.product_id !== product_id));
        }
        });
    };

    const addProduct = (product_id, quantityAvailable, photo_addr, addr, name, detail, price) => {
    axios.post("http://localhost:8080/home/add", {product_id : product_id, quantityAvailable : quantityAvailable, photo_addr : photo_addr, addr : addr, name : name, detail : detail, price : price}).then((response) => {
        if (response.data.notlog) {
            window.location.href = '/login';
        } else {
            setProducts(response.data.products);
        }
        });
    };

    // For adding product
    const [newProduct, setnewProduct] = useState({
        product_id : "",
        quantityAvailable : 0,
        photo_addr : "",
        addr : "",
        name : "",
        detail : "",
        price : 0
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setnewProduct((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(newProduct);
    };


    if(loading){
        return <></> ;
    }
    else{
        return (
            <div>

                <Table bordered style={{ margin: '1rem' , width: '50%'}} className="studenttable">
                    <tbody>
                        <tr>
                            <th style={{backgroundColor: 'rgb(170,170,170)' }}>Seller ID</th>
                            <td style={{backgroundColor: 'rgb(200,200,200)' }}>{profile.user_id}</td>
                            <th style={{backgroundColor: 'rgb(170,170,170)' }}>Name </th>
                            <td style={{backgroundColor: 'rgb(200,200,200)' }}>{profile.name}</td>
                        </tr>
                    </tbody>
                </Table>

                <br></br>
                <h1 style={{ fontSize: '1.5em' }}><b>Listed Products: </b></h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}></th>{/*Photo*/}
                            <th style={{ width: '5%' }}>Product ID</th>
                            <th style={{ width: '10%' }}>Name</th>
                            <th style={{ width: '20%' }}>Detail</th>
                            <th style={{ width: '5%' }}>Quantity Available</th>
                            <th style={{ width: '20%' }}>Address</th>
                            <th style={{ width: '5%' }}>Rating</th>
                            <th style={{ width: '5%' }}>Price</th>
                            <th style={{ width: '10%' }}>Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                        <tr key={product.product_id}>
                            <td><img src = {product.photo_addr} alt = "product"/></td>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{product.detail}</td>
                            <td>{product.quantityAvailable}</td>
                            <td>{product.addr}</td>
                            <td>{product.rating}</td>
                            <td>{product.price}</td>
                            <td><Button variant="outline-danger" onClick={() => removeProduct(product.product_id)}>Drop</Button>{' '}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>

                <br></br>
                <br></br>

                <MDBContainer fluid>

                    <MDBRow className='justify-content-center align-items-center m-5'>

                        <MDBCard>
                        <MDBCardBody className='px-4'>

                            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Add - Modify Product</h3>
                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Product Id' size='lg' id='form1' type='text' value={newProduct.product_id} onChange={handleInputChange}/>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Product Name' size='lg' id='form2' type='text' value={newProduct.name} onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' label='Detail' size='lg' id='form3' rows={4} type='text' value={newProduct.detail} onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' label='Address' size='lg' id='form4' rows={4} type='text' value={newProduct.addr} onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' label='Photo Address' size='lg' id='form5' rows={2} type='text' value={newProduct.photo_addr} onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Quantity Available' size='lg' id='form6' type='text' value={newProduct.quantityAvailable} onChange={handleInputChange}/>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' label='Price' size='lg' id='form7' type='text' value={newProduct.price} onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Submit</MDBBtn>

                        </MDBCardBody>
                        </MDBCard>

                    </MDBRow>
                </MDBContainer>


                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Product Id</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.product_id}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Name</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.name}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Detail</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.detail}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Quantity Available</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.quantityAvailable}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Address</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.addr}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Photo Address</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.photo_addr}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    ge={handleInputChange}
                    <label>Price</label>
                    <input
                        type="text"
                        name=""
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label></label>
                    <button type="submit">Add Product</button>
                    </div>
                </form>

            </div>

        );
    }

} ;
export default Home ;