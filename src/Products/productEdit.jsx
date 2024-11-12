import '../App.css'
import React, { useState } from 'react'
import ProductService from '../Services/ProductServ'

//Funktion nimi. Huom! On oltava isolla alkukirjaimella
// setMuokkaustila ym. on propseja, jotka tulee ProductList-komponentilta, jotta täältä päästään pois.

//Ikäänkuin import toiminto. Tulee ProductList  tiedostosta.
const ProductEdit= ({ setMuokkaustila, setMessage, setIsPositive, setShowMessage, muokattavaProduct }) => {

    //! ********************Tilan eli Staten määritys*************************************
    // Statet pitävät kirjaa sen hetken tilasta ja päivittävät sitä, joka kerta kun käyttäjä kirjoittaa jotain kenttään.
    
    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)

    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)

    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
    const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imagelink)

    
    // 2.  Syötetyt tiedot kerätään ja luodaan uusi asiakasobjekti(newCustomer), johon tiedot tallennetaan.
    //! ********************onSubmit tapahtumankäsittelijä funktio*****************************************************
    // event.preventDefault() estää lomakkeen lähettämisen yhteydessä kokokonaisen sivun uudelleen lataamisen.

    const handleSubmit = (event) => {
         alert('Product edited')
        event.preventDefault()

        // Luodaan uusi asiakasobjekti lomakkeen tiedoista. newProduct on itse keksitty nimi.
        // Alla olevat kentät täytyy olla nimeltään samat kuin back-endissä olevat kentät. Huom! camelCase.
        var newProduct = {
            productId: newProductId, 
            productName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued,
            imagelink: newImageLink,
        }//newProduct

        ProductService.update(newProduct)
            .then(() => {
                setMessage(`Edited product:${newProduct.productName}`)
                setIsPositive(true)
                setShowMessage(true);
                window.scrollBy(0, -10000)
                //setProducts(prevProducts => [...prevProducts, newProduct])

                setTimeout(() => {
                    console.log('setTimeout Osio')
                    setShowMessage(false);
                }, 3000);

                setMuokkaustila(false);
                
            })//then

            .catch(error => {
                console.error("Error to Update New product:", error);
            });
    }//handleSubmit


    //! ****************************return*************************************
    return (
        <div id="edit">
            <h2>Product Edit</h2>

            <form onSubmit={handleSubmit} className="customer-edit-form">
                <div>
                    <label htmlFor="productId">Product ID</label>
                    <input type="text" id="productId" value={newProductId} disabled />
                </div>
                <div>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={newProductName}
                        onChange={({ target }) => setNewProductName(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="supplierId">Supplier Id</label>
                    <input
                        type="text"
                        id="supplierId"
                        value={newSupplierId}
                        onChange={({ target }) => setNewSupplierId(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoryId">Category Id</label>
                    <input
                        type="text"
                        id="categoryId"
                        value={newCategoryId}
                        onChange={({ target }) => setNewCategoryId(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantityPerUnit">Quantity per Unit</label>
                    <input
                        type="text"
                        id="quantityPerUnit"
                        value={newQuantityPerUnit}                        
                        onChange={({ target }) => setNewQuantityPerUnit(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input
                        type="text"
                        id="unitPrice"
                        value={newUnitPrice}
                        onChange={({ target }) => setNewUnitPrice(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="unitsInStock">Units in Stock</label>
                    <input
                        type="text"
                        id="unitsInStock"
                        value={newUnitsInStock}
                        onChange={({ target }) => setNewUnitsInStock(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="unitsOnOrder">Units on Order</label>
                    <input
                        type="text"
                        id="unitsOnOrder"
                        value={newUnitsOnOrder}
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="reorderLevel">Reorder Level</label>
                    <input
                        type="text"
                        id="reorderLevel"
                        value={newReorderLevel}
                        onChange={({ target }) => setNewReorderLevel(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="discontinued">Discontinued </label>
                    <input
                        type="text"
                        id="discontinued"
                        value={newDiscontinued}
                        onChange={({ target }) => setNewDiscontinued(target.value)}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="imagelink">ImageLink</label>
                    <input
                        type="text"
                        id="imagelink"
                        value={newImageLink}
                        onChange={({ target }) => setNewImageLink(target.value)}
                    />
                </div>


               
                    {/* 1. */}
                    {/* Tämä on submit-tyyppinen input-elementti, joka lähettää lomakkeen, kun sitä(save) klikataan */}

                    {/* Ohjelman suoritus siirtyy tästä ylhäällä olevaan handleSubmit-funktioon */}

                    <input type='submit' value='save' style={{ marginRight: '10px' }} />

                    {/* Tämä on tavallinen button-tyyppinen input-elementti, joka ei lähetä lomaketta */}
                    <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
                
            </form>

        </div>

    )//return

}//ProductEdit

export default ProductEdit