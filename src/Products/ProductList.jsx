
import '../App.css'

//#***********************ProductList***********************/

// Tuodaan Reactin hookit useState ja useEffect
import { useState, useEffect } from 'react'

// Tuodaan ProductService, joka sisältää productien hakemiseen liittyvät funktiot
// Tässä on "ulkoistettu" productien hakeminen Services/ProductServ.js tiedostoon.
import ProductService from '../Services/ProductServ'

// Tuodaan Customer-komponentti (Funktion nimi), joka renderöi yhden asiakkaan tiedot
import Product from './product'

// Tuodaan ProductAdd-komponentti (Funktion nimi), joka mahdollistaa uuden asiakkaan lisäämisen
import ProductAdd from './productAdd';

import ProductEdit from './productEdit'


// ProductList-komponentti 
const ProductList = ({ setMessage, setIsPositive, setShowMessage,  }) => {


//!#*****************************************Tilan määritys Hooks****************************************************

    // Määritellään tila eli state products, joka sisältää productslistan. Alempana tarkistetaan onko dataa renderöitäväksi.
    const [products, setProducts] = useState([])

    // Määritellään tila eli state show, joka määrittää näytetäänkö products vai ei.
    const [show, setShow] = useState(false)

    // Määritellään tila eli state lisäystila, joka määrittää näytetäänkö ProductAdd vai ei.
    const [lisäystila, setLisäystila] = useState(false)

    const [muokkaustila, setMuokkaustila] = useState(false)

    const [muokattavaProduct, setMuokattavaProduct] = useState(false)

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            ProductService.setToken(token); // Asetetaan token jokaisessa latauksessa
            console.log("Token asetettu, haetaan productit");
    
            ProductService.getAll()
                .then(data => {
                    console.log("Products asettaa datan:", data);
                    if (JSON.stringify(data) !== JSON.stringify(products)) {
                        setProducts(data); // Asetetaan haetut productit products-tilaan vain, jos se ei ole jo tehty
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch products:", error);
                    if (error.response && error.response.status === 401) {
                        alert("Session expired. Please log in again.");
                        // Tässä tyhjennetään token ja ohjataan käyttäjä kirjautumaan uudelleen
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                });
        } else {
            console.log("Token puuttuu, käyttäjä ohjataan kirjautumaan");
            window.location.href = '/login'; // Ohjaa käyttäjä kirjautumaan
        }
    }, [lisäystila, muokkaustila]) // useEffect;
    

    

    //Hakukentän onChange tapahtumankäsittelijä. Parametrina event, joka edustaa input-kentän tapahtumaa. 
    const handleSearchInputChange = (event) => {
        setShow(true)
        setSearch(event.target.value.toLowerCase())
    }
    
    const editProduct = (productprops) => {
        setMuokattavaProduct(productprops)
        setMuokkaustila(true)
    }

return (
           <>                
                <div>
                    <h2>ProductList</h2>
                    {!lisäystila && !muokkaustila &&
                    <input placeholder="Search by product PList" value={search} className="inputsearch"  onChange={handleSearchInputChange} />
                    }
                </div>


                    <span className="nowrap">
                    {(!lisäystila && !muokkaustila) && (
                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setShow(!show)}>                        
                            {show ? "Hide ProdList" : "Show ProdList"}</button>)}
                    </span>

                    <span className="nowrap">
                        <button className="nappi" style={{ cursor: 'pointer' }} onClick={() => setLisäystila(!lisäystila)}>      
                            {lisäystila ? "Hide Add ProdList" : "Show Add ProdList"}
                        </button>
                    </span>

                                    {/* PROPSIT  kolmeen tiedostoon. --> productAdd,productEdit, product */}
                    {/* Renderöidään ProductAdd-komponentti, kun lisäystila on true. Mahdollistaa uuden productin lisäyksen */}

                    {lisäystila && ( <ProductAdd setLisäystila= {setLisäystila} setProducts={setProducts}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>                  
                    )}

                    {muokkaustila && ( <ProductEdit setMuokkaustila ={setMuokkaustila} 
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    muokattavaProduct={muokattavaProduct}  />                    
                    )}

            
                    {/* Tässä kaksi && merkkiä tarkoittaa (ja) viimeinen && että mitä tehdään jos molemmat ovat tosia. */}
                {
                    (!lisäystila && !muokkaustila && show) && (
                        products.map(prod => 
                        {
                            const lowerCaseName = prod.productName.toLowerCase()
                            if (lowerCaseName.indexOf(search) > -1) {
                                return (
                                    <Product key={prod.productId || prod.productName} productprops={prod} setProducts={setProducts}
                                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
                                         editProduct={editProduct} />
                                )//return

                            }//if

                            return null;

                        })//products.map

                )}  
            </>
        )//return
    
}//CustomerList

// Exportataan ProductList-komponentti. 
export default ProductList