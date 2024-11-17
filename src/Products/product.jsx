//import '../App.css'
import styled,{keyframes} from 'styled-components';
import { useState } from 'react'
import ProductService from '../Services/ProductServ'
import { Card, Button, Modal } from 'react-bootstrap';

// Styled components
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)`
//   background-color: #f8f9fa;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   position: auto;
background-color: #f7f1e1;  /* Vaaleanbeige */
  border: 1px solid #d1b38a;  /* Vaaleanruskea reuna */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
  text-align: center;

  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 80%;  /* Käyttää 80% leveyttä pienemmillä näytöillä */
    max-width: 600px; /* Maksimileveys */
    
    /* Responsiiviset tyylit */
  @media (max-width: 768px) {
    width: 95%;  /* Vähentää leveyttä pienemmillä näytöillä */
    padding: 15px;  /* Vähemmän paddingia pienemmillä näytöillä */
  }

  @media (max-width: 480px) {
    width: 100%;  /* Täyttää koko leveys mobiilinäytöillä */
    padding: 10px;  /* Vähemmän paddingia mobiilinäytöillä */
  }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;  /* Keskittää painikkeet */
  gap: 10px;  /* Lisää tilaa painikkeiden väliin */
`;

const CustomButton = styled.button`
  border-radius: 12px; /* Pyöristetyt kulmat */
  font-weight: bold;
  padding: 10px 20px; /* Lisää tilaa nappiin */
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer; /* Kursori muuttuu osoittimeksi */
  border: none; /* Poistetaan nappien reunat */
`;

// Erityiset tyylit kullakin napilla
const InfoButton = styled(CustomButton)`
  background-color: #f1c40f; /* Kultainen sävy */
  border: 1px solid #d1b38a; /* Vaaleanruskea reuna */
  color: #fff; /* Valkoinen teksti */

  &:hover {
    background-color: #e1b007; /* Tummempi kultainen hover-tilassa */
  }
`;

const DangerButton = styled(CustomButton)`
  background-color: #c0392b; /* Tumma punainen */
  border: 1px solid #9e2a25; /* Tumma punainen reuna */
  color: #fff; /* Valkoinen teksti */

  &:hover {
    background-color: #e74c3c; /* Vaaleampi punainen hover-tilassa */
  }
`;

const PrimaryButton = styled(CustomButton)`
  background-color: #3498db; /* Raikas sininen */
  border: 1px solid #2980b9; /* Tummansininen reuna */
  color: #fff; /* Valkoinen teksti */

  &:hover {
    background-color: #2980b9; /* Tummempi sininen hover-tilassa */
  }
`;

// Täällä käsitellään yksittäisen productin tiedot. Siksi nimi product.jsx yksikkömuodossa.
// Jokaisen productin yksittäiset tiedot renderöidään tässä komponentissa.
// Props on nimeltään productprops, jonka se saa ProductList-komponentilta.
// Tämä tarkoittaa, että Product-komponentti odottaa saavansa productprops-nimisen propsin, joka sisältää productin tiedot.
// Tässä Product-komponentti ottaa vastaan propsit, jotka on määritelty { productprops }-parametrina.
// prod on yksittäinen asiakasobjekti, joka on peräisin ProductList products-taulukosta ja sisältää yhden productin tiedot.
// Parametri on määritelty ProductList tiedostossa näin: productprops={prod}. Kuitenkin tässä tiedostossa se on {productprops}.Eli hakasuluissa.

                  //Ikäänkuin import. Tulee ProductList  tiedostosta.
const Product = ({ productprops,setProducts, setMessage, setIsPositive, setShowMessage, editProduct }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)
    const [showModal, setShowModal] = useState(false); 

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Delete product window.confirm osio ${product.productName}?`)

        if (vastaus === true) {
            ProductService.remove(product.productId)
                .then(res => {
                    if (res.status === 200 || res.status === 204) {
                        console.log("Poisto tehty: viesti näkyy? If lohko");
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
                console.log("Poisto ei onnistunut. Error viesti näkyy? Catch lohko");
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
                
                console.log("Poisto peruttu konsolissa. Näkyykö? Else haara ");
                setMessage('Poisto peruttu onnistuneesti.')
                    setIsPositive(true)
                    setShowMessage(true)
                    
                     window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
            
                    // Ilmoituksen piilotus
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
                                {/* <th>SupplierId</th> */}
                                {/* <th>CategoryId</th> */}
                                <th>Unit Price</th>
                                <th>Units In Stock</th>
                                <th>Units On Order</th>
                                {/* <th>Reorder Level</th> */}
                                {/* <th>Discontinued</th> */}
                                <th>Image Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{productprops.productName}</td>
                                <td>{productprops.quantityPerUnit}</td>
                                {/* <td>{productprops.supplierId}</td> */}
                                {/* <td>{productprops.categoryId}</td> */}
                                <td>{productprops.unitPrice}</td>
                                <td>{productprops.unitsInStock}</td>
                                <td>{productprops.unitsOnOrder}</td>
                                {/* <td>{productprops.reorderLevel}</td> */}
                                {/* <td>{productprops.discontinued ? 'Yes' : 'No'}</td> */}
                                {/* Näytetään kuva suoraan img-tagilla */}
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


