import styled  from 'styled-components';
import { useState } from 'react'
import ProductService from '../Services/ProductServ'
import { Card, Button, Modal } from 'react-bootstrap';

const StyledCard = styled(Card)`
background-color: #f7f1e1; 
  border: 1px solid #d1b38a;  
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
  text-align: center;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 80%;  
    max-width: 600px; 
    
    /* Responsiiviset tyylit */
  @media (max-width: 768px) {
    width: 95%; 
    padding: 15px; 
  }

  @media (max-width: 480px) {
    width: 100%; 
    padding: 10px;  
  }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center; 
  gap: 10px;  
`;

const CustomButton = styled.button`
  border-radius: 12px; 
  font-weight: bold;
  padding: 10px 20px; 
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  border: none; 
`;

// Erityiset tyylit kullakin napilla
const InfoButton = styled(CustomButton)`
  background-color: #2ecc71; 
  border: 1px solid #27ae60;  
  color: #fff;

  &:hover {
    background-color: #27ae60;
  }
`;


const DangerButton = styled(CustomButton)`
  background-color: #c0392b; 
  border: 1px solid #9e2a25;
  color: #fff; 

  &:hover {
    background-color: #e74c3c;
  }
`;

const PrimaryButton = styled(CustomButton)`
  background-color: #95a5a6; 
  border: 1px solid #7f8c8d;
  color: #fff; 

  &:hover {
    background-color: #7f8c8d; 
  }
`;

const Product = ({ productprops,setProducts, setMessage, setIsPositive, setShowMessage, editProduct }) => {  
    const [showModal, setShowModal] = useState(false); 

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Delete product window.confirm osio ${product.productName}?`)

        if (vastaus === true) {
            ProductService.remove(product.productId)
                .then(res => {
                    if (res.status === 200 || res.status === 204) {
                        setMessage(`Succesfully removed product ${product.productName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollTo({
                            top: 0,                     
                          });
                        setProducts(prevProducts => 
                            prevProducts.filter(p => p.productId !== productprops.productId)
                        ); 
                    }//if

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 5000)
                    
                })//then

            .catch(error => {                
                setMessage(`Error: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollTo({
                    top: 0,                     
                  });
                setTimeout(() => {
                setShowMessage(false)

                }, 5000)
            })
        }//if               
            else {
                setMessage('Poisto peruttu onnistuneesti.')
                    setIsPositive(true)
                    setShowMessage(true)                    
                     window.scrollBy(0, -10000) 
                    setTimeout(() => {
                    setShowMessage(false)},
                    3000
                    )
                }//else

    }//deleteProduct
    const handleShowModal = () => setShowModal(true);  // Avaa modal
    const handleCloseModal = () => setShowModal(false);  // Sulje modal


    return (
        <StyledCard className="mb-4">
            <Card.Body>
                <Card.Title>{productprops.productName}</Card.Title>
                <Card.Text>{productprops.quantityPerUnit}</Card.Text>
                <PrimaryButton
                
                 onClick={handleShowModal} style={{ marginBottom: '10px' }}>
                    Show Details
                </PrimaryButton>

                {/* Edit and Delete buttons */}
                <ButtonContainer>
                <InfoButton onClick={() => editProduct(productprops)}>
                        Edit
                    </InfoButton>
                    <DangerButton onClick={() => deleteProduct(productprops)}>
                        Delete
                    </DangerButton>
                </ButtonContainer>
            </Card.Body>

            {/* Modal: Details pop-up */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details: {productprops.productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity per Unit</th>                              
                                <th>Units In Stock</th>
                                <th>Units On Order</th>
                                <th>Image Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{productprops.productName}</td>
                                <td>{productprops.quantityPerUnit}</td>                                
                                <td>{productprops.unitPrice}</td>
                                <td>{productprops.unitsInStock}</td>
                                <td>{productprops.unitsOnOrder}</td>
                                <td>
                                    <img src={productprops.imagelink} alt="Product" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </StyledCard>
    );
};

export default Product;     


