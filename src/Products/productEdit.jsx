import '../App.css'
import React, { useState, useEffect } from 'react';
import ProductService from '../Services/ProductServ'

const ProductEdit= ({ setMuokkaustila, setMessage, setIsPositive, setShowMessage, muokattavaProduct, }) => {
    
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

    const handleSubmit = (event) => {
        event.preventDefault()
        
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
                setMessage(`Edited product: ${newProduct.productName}`)
                setIsPositive(true)
                setShowMessage(true);
                // window.scrollBy(0, -10000)
                window.scrollTo({
                    top: 0,                     
                  });
                                

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


    return (
        <div id="edit">
            <h2>Product Edit</h2>
            <div className="form-container">
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
                            type="number"
                            id="supplierId"
                            value={newSupplierId}
                            onChange={({ target }) => setNewSupplierId(Number(target.value) || '')}
                            required
                            min="1"
                            max="29"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryId">Category Id</label>
                        <input
                            type="number"
                            id="categoryId"
                            value={newCategoryId}
                            onChange={({ target }) => setNewCategoryId(Number(target.value) || '')}
                            required
                            min="1"
                            max="8"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantityPerUnit">Quantity per Unit</label>
                        <input
                            type="text"
                            id="quantityPerUnit"
                            value={newQuantityPerUnit}
                            onChange={({ target }) => setNewQuantityPerUnit(target.value) || ''}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="unitPrice">Unit Price</label>
                        <input
                            type="number"
                            id="unitPrice"
                            value={newUnitPrice}
                            onChange={({ target }) => setNewUnitPrice(Number(target.value) || '')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="unitsInStock">Units in Stock</label>
                        <input
                            type="number"
                            id="unitsInStock"
                            value={newUnitsInStock}
                            onChange={({ target }) => setNewUnitsInStock(Number(target.value) || '')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="unitsOnOrder">Units on Order</label>
                        <input
                            type="number"
                            id="unitsOnOrder"
                            value={newUnitsOnOrder}
                            onChange={({ target }) => setNewUnitsOnOrder(Number(target.value) || '')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reorderLevel">Reorder Level</label>
                        <input
                            type="number"
                            id="reorderLevel"
                            value={newReorderLevel}
                            onChange={({ target }) => setNewReorderLevel(Number(target.value) || '')}
                            required
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

                    <input type='submit' value='save' className="nappi" style={{ marginRight: '10px', marginBottom:'10px' }} />
                    <input type='button' value='back' className="nappi" onClick={() => setMuokkaustila(false)} />

                </form>
            </div>
        </div>

    )//return

}//ProductEdit

export default ProductEdit