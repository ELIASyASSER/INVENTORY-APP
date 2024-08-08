const express = require("express")
const router = express.Router()

const {
    showProducts,
    addProduct,
    showAddProduct,
    showUpdateProduct,
    updateProduct,
    deleteProduct,
    productDetails,
    category
} = require('../controllers/products')

//showing all products
router.get('/',showProducts)

//adding products
router.route('/add/product').post(addProduct).get(showAddProduct)
router.route('/update/product/:id').post(updateProduct).get(showUpdateProduct)

//deleting products
router.get("/delete/product/:id",deleteProduct)

//see product details
router.get("/see/product/:id",productDetails)

//show categories
router.get('/categories',category)

module.exports = router;