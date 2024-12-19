import '../App.css'
import React, { useState } from 'react'
import ProductService from '../Services/ProductServ'

const ProductAdd = ({ setLisäystila, setProducts, setMessage, setIsPositive, setShowMessage, }) => {

    const [newProductId, setNewProductId] = useState(0)
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
  
    const handleSubmit = (event) => {
        event.preventDefault()

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
                }, 5000);

                setLisäystila(false);
                
            })//then

            .catch(error => {
                console.error("Error to Add New Product:", error);
            });
    
    }//handleSubmit

    return (
        <div>
            <h2>From Product add</h2>
            <div className="form-container">
                <form id="add-product-form" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="number"
                            value={newProductId}
                            placeholder="ID"
                            onChange={({ target }) => setNewProductId(Number(target.value) || '')}
                            disabled
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={newProductName}
                            placeholder="Product name"
                            onChange={({ target }) => setNewProductName(target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newSupplierId}
                            placeholder="Supplier ID"
                            onChange={({ target }) => setNewSupplierId(Number(target.value) || '')}
                            required
                         min="1"
                         max="29"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newCategoryId}
                            placeholder="Category ID"
                            onChange={({ target }) => setNewCategoryId(Number(target.value) || '')}
                            required
                            min="1"
                            max="8"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={newQuantityPerUnit}
                            placeholder="Quantity per unit"
                            onChange={({ target }) => setNewQuantityPerUnit(target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newUnitPrice}
                            placeholder="Unit price"
                            onChange={({ target }) => setNewUnitPrice(Number(target.value) || '')}
                            pattern="\d*"
                            title="Please enter a valid price"
                            required
                            min="1"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newUnitsInStock}
                            placeholder="Units in stock"
                            onChange={({ target }) => setNewUnitsInStock(Number(target.value) || '')}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newUnitsOnOrder}
                            placeholder="Units on order"
                            onChange={({ target }) => setNewUnitsOnOrder(Number(target.value) || '')}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={newReorderLevel}
                            placeholder="Reorder level"
                            onChange={({ target }) => setNewReorderLevel(Number(target.value) || '')}
                            required
                        />
                    </div>

                    <div>
                        <input type="text" value={newDiscontinued} placeholder="Discontinued"
                            onChange={({ target }) => setNewDiscontinued(target.value)} disabled />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={newImageLink}
                            placeholder="Image link"
                            onChange={({ target }) => setNewImageLink(target.value)}
                        />
                    </div>
                    <div className='nowrap' style={{ marginTop: '20px', marginBottom:'10px' }}>
                        <input type='submit' value='Save' className='nappi' style={{ marginRight: '10px' }} />
                        <input type='button' value='Back' className='nappi' onClick={() => setLisäystila(false)} />
                    </div>
                </form>

            </div>
        </div>

    )//return

}//ProductAdd

export default ProductAdd