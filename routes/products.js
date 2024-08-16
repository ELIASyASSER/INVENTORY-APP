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
const auth = require("../middleware/auth")

//showing all products
router.get('/show',showProducts)

//adding products
router.route('/add/product').post(addProduct).get(showAddProduct)
router.route('/update/product/:id').post(updateProduct).get(showUpdateProduct)

//deleting products
router.get("/delete/product/:id",deleteProduct)

//see product details
router.get("/see/product/:id",productDetails)


module.exports = router;