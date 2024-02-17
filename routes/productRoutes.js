const express = require("express")

const {getAllProducts,getProduct} = require('../controllers/productControllers')

const router = express.Router();

router.route('/').get(getAllProducts)
router.route('/:id').get(getProduct)

module.exports = router
