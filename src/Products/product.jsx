import '../App.css'
import { useState } from 'react'
import ProductService from '../Services/ProductServ'
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

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Delete product window.confirm osio ${product.productName}?`)

        if (vastaus === true) {
            ProductService.remove(product.productId)
                .then(res => {
                    if (res.status === 200) {
                        console.log("Poisto tehty: viesti näkyy? If lohko");
                        setMessage(`Succesfully removed product ${product.productName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
                        setProducts(prevProducts => 
                            prevProducts.filter(p => p.productId !== productprops.productId)
                        ); 
                    }//if

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 3000)
                    
                })//then

            .catch(error => {
                setMessage(`Error: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => {
                setShowMessage(false)
                window.scrollBy(0, -10000)
                }, 5000)
            })
        }//if               
            else {
                
                console.log("Poisto peruttu konsolissa. Näkyykö? Else haara ");
                setMessage('Poisto peruttu onnistuneesti.')
                    setIsPositive(true)
                    setShowMessage(true)
                    
                     window.scrollBy(0, -5000) // Scrollataan ylös jotta nähdään alert :)
            
                    // Ilmoituksen piilotus
                    setTimeout(() => {
                    setShowMessage(false)},
                    3000
                    )
                }//else

    }//deleteProduct

    return (
        <div className='customerDiv'>
            {/* Näytetään yksittäisen productin nimi */}
            <h4>
                {productprops.productName} 
            </h4>

            {/* Nappi, joka vaihtaa showDetails-tilan arvoa true/false. !showDetails vaihtaa käänteisesti järjestystä */}
            <button className="nappi" onClick={() => setShowDetails(!showDetails)}>
                
            {/* tämä ternäärinen operaattori tarkistaa showDetails-tilan arvon ja palauttaa 
            joko "Hide Details" tai "Show Details"
             sen mukaan, onko showDetails tosi vai epätosi.     */}
                {showDetails ? "Hide Details prod" : "Show Details prod"}
            </button>

            {/* Jos showDetails on true, näytetään productin tiedot */}
            {showDetails && (
                <div className="customerDetails">
                    <h3>{productprops.productName}</h3>
                    
                    <button onClick={() =>editProduct(productprops)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() =>deleteProduct(productprops)}>Delete</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Quantity per Unit</th>
                                <th>Unit Price</th>
                                <th>Units In Stock</th>
                                <th>Units On Order</th>
                                <th>ReorderLevel</th>
                                <th>Discontinued</th>
                                <th>imagelink</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{productprops.productName}</td>
                                <td>{productprops.quantityPerUnit}</td>
                                <td>{productprops.unitPrice}</td>
                                <td>{productprops.unitsInStock}</td>
                                <td>{productprops.unitsOnOrder}</td>
                                <td>{productprops.recorderLevel}</td>
                                <td>{productprops.discontinued}</td>
                                <td>{productprops.imagelink}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Product


