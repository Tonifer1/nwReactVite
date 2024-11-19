import '../App.css';
import { useState, useEffect } from 'react';
import ProductService from '../Services/ProductServ';
import Product from './product';  // Tuo Product-komponentti
import ProductAdd from './productAdd';
import ProductEdit from './productEdit';
import { Row, Col, Button, Form } from 'react-bootstrap';


const ProductList = ({ setMessage, setIsPositive, setShowMessage }) => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [lisäystila, setLisäystila] = useState(false);
    const [muokkaustila, setMuokkaustila] = useState(false);
    const [muokattavaProduct, setMuokattavaProduct] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            ProductService.setToken(token);
            ProductService.getAll()
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        alert("Session expired. Please log in again.");
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                });
        } else {
            window.location.href = '/login';
        }

    }, [lisäystila, muokkaustila]);



    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase());
        setShow(true);
    };

    const editProduct = (productprops) => {        
        setMuokattavaProduct(productprops)
        setMuokkaustila(true)
    }

    

    return (
        <div className="productList" >
            <div className="content">
                <h1>Products</h1>
                <Form.Control
                    type="text"
                    className="inputsearch"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearchInputChange}
                    style={{ marginBottom: '20px' }}
                />

                <Row>
                    <Col md={12} style={{ marginBottom: '20px' }}>
                        <Button
                            variant="info"
                            onClick={() => setShow(!show)}
                            style={{
                                marginRight: '10px',
                                backgroundColor: '#3cb386',  // Asetetaan oma taustaväri
                                borderRadius: '10px',        // Pyöristetään kulmat
                                padding: '12px 20px',        // Lisää tilaa buttonin sisälle
                                color: 'white',              // Tekstin väri valkoinen
                                boxShadow: '0 4px 8px rgba(0, 123, 0, 0.4)',  // Varjo
                                fontWeight: 'bold',          // Paksumpi teksti
                                border: 'none'               // Poistetaan reunus
                            }}
                        >
                            {show ? 'Hide Products' : 'Show Products'}
                        </Button>

                        <Button
                            variant="light"
                            onClick={() => setLisäystila(!lisäystila)}
                            style={{
                                backgroundColor: '#f8f9fa', // Vaaleampi taustaväri
                                borderRadius: '10px',        // Pyöristetyt kulmat
                                padding: '12px 20px',        // Lisää tilaa
                                fontWeight: 'bold',          // Paksumpi teksti
                                border: '1px solid #ccc',    // Lisää ohut reunus
                                color: '#495057',            // Tekstin väri tumman harmaa
                            }}
                        >
                            {lisäystila ? 'Hide Add Product ' : 'Show Add Product'}
                        </Button>
                    </Col>
                </Row>

                {/* Renderöidään ProductAdd-komponentti */}
                {lisäystila && (
                    <ProductAdd
                        setLisäystila={setLisäystila}
                        setProducts={setProducts}
                        setIsPositive={setIsPositive}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage}
                    />
                )}

                {/* Renderöidään ProductEdit-komponentti */}
                {muokkaustila && (
                    <ProductEdit
                        setMuokkaustila={setMuokkaustila}
                        setIsPositive={setIsPositive}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage}
                        muokattavaProduct={muokattavaProduct}                        
                    />
                )}

                {/* Näytetään tuotteet */}
                {!lisäystila && !muokkaustila && show  && (
                    <Row>
                        {products
                            .filter(product =>
                                product.productName.toLowerCase().includes(search)
                            )
                            .map(prod => (
                                <Col key={prod.productId} sm={12} md={6} lg={4} xl={3} className="mb-4">
                                    {/* Siirretään kortti renderöintiin Product-komponenttiin */}
                                    <Product
                                        productprops={prod}
                                        setProducts={setProducts}
                                        setIsPositive={setIsPositive}
                                        setMessage={setMessage}
                                        setShowMessage={setShowMessage}
                                        editProduct={editProduct}
                                    />
                                </Col>
                            ))}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default ProductList;
