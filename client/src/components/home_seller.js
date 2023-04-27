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
            setProfile(res.data.user);
            setProducts(res.data.products);
            setLoading(false);
        }).catch(err => console.error(err));
    }, []);

    const removeProduct = (product_id) => {
        axios.post("http://localhost:8080/home/remove", {product_id : product_id}).then((response) => {
            console.log(response);
            if (response.data.notlog) {
                window.location.href = '/login';
            } else {
                setProducts(products.filter(product => product.product_id !== product_id));
            }
        });
    };

    const modifyProduct = (product_id, quantityAvailable, photo_addr, addr, name, detail, price) => {
        if(quantityAvailable === '' || photo_addr === '' || addr === '' || name === '' || detail === '' || price === ''){
            alert('Wrong or incomplete inputs!');
        }
        else{
            axios.post("http://localhost:8080/home/add", {product_id:product_id, quantityAvailable : quantityAvailable, photo_addr : photo_addr, addr : addr, name : name, detail : detail, price : price}).then((response) => {
                if (response.data.notlog) {
                    window.location.href = '/login';
                } else {
                    setProducts(response.data.products);
                }
            });
        }
    };

    const addProduct = (product_id, quantityAvailable, photo_addr, addr, name, detail, price) => {
        if(quantityAvailable === '' || photo_addr === '' || addr === '' || name === '' || detail === '' || price === ''){
            alert('Wrong or incomplete inputs!');
        }
        else{
            axios.post("http://localhost:8080/home/add", {product_id:product_id, quantityAvailable : quantityAvailable, photo_addr : photo_addr, addr : addr, name : name, detail : detail, price : price}).then((response) => {
                if (response.data.notlog) {
                    window.location.href = '/login';
                } else {
                    console.log(response.data.products);
                    setProducts(response.data.products);
                }
            });
        }
    };

    // For adding product
    const [newProduct, setnewProduct] = useState({
        quantityAvailable : '',
        photo_addr : '',
        addr : '',
        name : '',
        detail : '',
        price : ''
    });

    const [modProduct, setmodProduct] = useState({
        product_id : '',
        quantityAvailable : '',
        photo_addr : '',
        addr : '',
        name : '',
        detail : '',
        price : ''
    });

    const resetnewProduct = () => {
        setnewProduct(() => ({
            quantityAvailable : '',
            photo_addr : '',
            addr : '',
            name : '',
            detail : '',
            price : ''
        }));
    }

    const resetmodProduct = () => {
        setmodProduct(() => ({
            product_id : '',
            quantityAvailable : '',
            photo_addr : '',
            addr : '',
            name : '',
            detail : '',
            price : ''
        }));
    }

    const handleInputChange_AP = (event) => {
        const { name, value } = event.target;
        setnewProduct((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

    const handleInputChange_MP = (event) => {
        const { name, value } = event.target;
        setmodProduct((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

    const handleSubmit_AP = (event) => {
        event.preventDefault();
        addProduct('', newProduct.quantityAvailable, newProduct.photo_addr, newProduct.addr, newProduct.name, newProduct.detail, newProduct.price);
        resetnewProduct();
    };
    const handleSubmit_MP = (event) => {
        event.preventDefault();
        modifyProduct(modProduct.product_id, modProduct.quantityAvailable, modProduct.photo_addr, modProduct.addr, modProduct.name, modProduct.detail, modProduct.price);
        resetmodProduct();
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
                            <td><img src = {product.photo_addr} alt = "product" style={{ width: 200, height: 200 }}/></td>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{product.detail}</td>
                            <td>{product.quantityavailable}</td>
                            <td>{product.addr}</td>
                            <td>{product.rating}</td>
                            <td>{product.price}</td>
                            <td><Button variant="outline-danger" onClick={() => removeProduct(product.product_id)}>Remove Product</Button>{' '}</td>
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

                            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Add Product</h3>
                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='name' label='Product Name' size='lg' id='form2' type='text' value={newProduct.name} onChange={handleInputChange_AP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='detail' label='Detail' size='lg' id='form3' rows={4} type='text' value={newProduct.detail} onChange={handleInputChange_AP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='addr' label='Address' size='lg' id='form4' rows={4} type='text' value={newProduct.addr} onChange={handleInputChange_AP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='photo_addr' label='Photo Address' size='lg' id='form5' rows={2} type='text' value={newProduct.photo_addr} onChange={handleInputChange_AP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='quantityAvailable' label='Quantity Available' size='lg' id='form6' type='text' value={newProduct.quantityAvailable} onChange={handleInputChange_AP}/>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='price' label='Price' size='lg' id='form7' type='text' value={newProduct.price} onChange={handleInputChange_AP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit_AP}>Submit</MDBBtn>

                        </MDBCardBody>
                        </MDBCard>

                    </MDBRow>
                </MDBContainer>
                
                <br></br>
                <br></br>

                <MDBContainer fluid>

                    <MDBRow className='justify-content-center align-items-center m-5'>

                        <MDBCard>
                        <MDBCardBody className='px-4'>

                            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Modify Product</h3>
                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='product_id' label='Product Id' size='lg' id='form1' type='text' value={modProduct.product_id} onChange={handleInputChange_MP}/>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='name' label='Product Name' size='lg' id='form2' type='text' value={modProduct.name} onChange={handleInputChange_MP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='detail' label='Detail' size='lg' id='form3' rows={4} type='text' value={modProduct.detail} onChange={handleInputChange_MP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='addr' label='Address' size='lg' id='form4' rows={4} type='text' value={modProduct.addr} onChange={handleInputChange_MP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput wrapperClass='mb-4' name='photo_addr' label='Photo Address' size='lg' id='form5' rows={2} type='text' value={modProduct.photo_addr} onChange={handleInputChange_MP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='quantityAvailable' label='Quantity Available' size='lg' id='form6' type='text' value={modProduct.quantityAvailable} onChange={handleInputChange_MP}/>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <MDBInput wrapperClass='mb-4' name='price' label='Price' size='lg' id='form7' type='text' value={modProduct.price} onChange={handleInputChange_MP}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit_MP}>Submit</MDBBtn>

                        </MDBCardBody>
                        </MDBCard>

                    </MDBRow>
                </MDBContainer>

                {/* <form onSubmit={handleSubmit_MP}>
                    <div className="form-control">
                    <label>Product Id</label>
                    <input
                        type="text"
                        name="product_id"
                        value={modProduct.product_id}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={modProduct.name}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Detail</label>
                    <input
                        type="text"
                        name="detail"
                        value={modProduct.detail}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Quantity Available</label>
                    <input
                        type="text"
                        name="quantityAvailable"
                        value={modProduct.quantityAvailable}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Address</label>
                    <input
                        type="text"
                        name="addr"
                        value={modProduct.addr}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Photo Address</label>
                    <input
                        type="text"
                        name="photo_addr"
                        value={modProduct.photo_addr}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={modProduct.price}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-control">
                    <label></label>
                    <button type="submit">Add Product</button>
                    </div>
                </form> */}

            </div>

        );
    }

} ;
export default Home ;