import '../App.css'
import React, { useState } from 'react'
import ProductService from '../Services/ProductServ'

//Funktion nimi. Huom! On oltava isolla alkukirjaimella
// setLisäystila ym. on propseja, jotka tulee ProductList-komponentilta, jotta täältä päästään pois.

//Ikäänkuin import toiminto. Tulee CustomerList  tiedostosta.
const ProductAdd = ({ setLisäystila, setProducts, setMessage, setIsPositive, setShowMessage, }) => {

    //! ********************Tilan eli Staten määritys*************************************
    // Statet pitävät kirjaa sen hetken tilasta ja päivittävät sitä, joka kerta kun käyttäjä kirjoittaa jotain kenttään.
    // Esim Id kenttään kirjoitettaessa, kutsutaan setNewCustomerId funktiota(alla returnissa), joka päivittää tilan newCustomerId arvon.

    const [newProductId, setNewProductId] = useState('')
    const [newProductName, setNewProductName] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')

    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')

    const [newDiscontinued, setNewDiscontinued] = useState('')
    const [newImageLink, setNewImageLink] = useState('')
  

    
    // 2.  Syötetyt tiedot kerätään ja luodaan uusi asiakasobjekti(newCustomer), johon tiedot tallennetaan.
    //! ********************onSubmit tapahtumankäsittelijä funktio*****************************************************
    // event.preventDefault() estää lomakkeen lähettämisen yhteydessä kokokonaisen sivun uudelleen lataamisen.

    const handleSubmit = (event) => {
        // alert('Product added')
        event.preventDefault()

        // Luodaan uusi productobjekti lomakkeen tiedoista. new Product on itse keksitty nimi.
        // Alla olevat (vasemmat)kentät täytyy olla nimeltään samat kuin back-endissä olevat kentät. Huom! camelCase.
        var newProduct = {
            
            productName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued === false,
            imagelink: newImageLink,
        }//newProduct

        ProductService.addNew(newProduct)
            .then(() => {
                setMessage(`Lisätty new product:${newProduct.productName}`)
                setIsPositive(true);
                setShowMessage(true);
                window.scrollBy(0, -10000)
                setProducts(prevProducts => [...prevProducts, newProduct])

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

                setLisäystila(false);
                
            })//then

            .catch(error => {
                console.error("Error to Add New Product:", error);
            });
    
    }//handleSubmit


    //! ****************************return*************************************
    return (
        <div id="addNew">
            <h2>From Product add</h2>           
            {/* Tietokanta huolehtii id:n lisäämisestä juoksevalla numerolla */}
            {/* value viittaa tilaan, joka on määritelty yläpuolella.*/}
            {/*Eli alla {newCustomerId} = const [newCustomerId, setNewCustomerId] = useState('')  */}
            {/* onChange tapahtumankäsittelijä, joka päivittää tilaa, kun kenttään kirjoitetaan */}
          
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newProductId} placeholder="ID" 
                        onChange={({ target }) => setNewProductId(target.value)}disabled />
                </div>
                <div>
                    <input type="text" value={newProductName} placeholder="Product name"
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newSupplierId} placeholder="Supplier ID"
                        onChange={({ target }) => setNewSupplierId(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newCategoryId} placeholder="Category ID"
                        onChange={({ target }) => setNewCategoryId(target.value)} required />
                </div>

                <div>
                    <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
                        onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUnitPrice} placeholder="Unit price"
                        onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUnitsInStock} placeholder="Units in stock"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} />
                </div>
                <div>
                    <input type="text" value={newUnitsOnOrder} placeholder="Units on order"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
                </div>
                <div>
                    <input type="text" value={newReorderLevel} placeholder="Reorder level"
                        onChange={({ target }) => setNewReorderLevel(target.value)} />
                </div>
                <div>
                    <input type="text" value={newDiscontinued} placeholder="Discontinued"
                        onChange={({ target }) => setNewDiscontinued(target.value)}disabled />
                </div>
                <div>
                    <input type="text" value={newImageLink} placeholder="Image link"
                        onChange={({ target }) => setNewImageLink(target.value)} />
                </div>


                <div style={{ marginTop: '20px' }}>
                    {/* 1. */}
                    {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä(save) klikataan */}

                    {/* Ohjelman suoritus siirtyy tästä ylhäällä olevaan handleSubmit-funktioon */}

                    <input type='submit' value='save' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' onClick={() => setLisäystila(false)} />
                </div>
            </form>

        </div>

    )//return

}//ProductAdd

export default ProductAdd