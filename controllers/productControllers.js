
const { Pizza,
    Burger,
    Chinese,
    Thalis,
    Beverages,
    WrapsAndRolls,
    BestSellers,
  } = require('../models/productModels')
  
const asyncWrapper = require('../middleware/async')

const {creatCustomError} = require('../errors/custom-errors')


const getAllProducts = asyncWrapper(async (req, res) => {
    try {
        // Assuming Pizza, Burger, Chinese, WrapsAndRolls, Beverages, Thalis, BestSellers are your models
        const pizzasPromise = Pizza.find({});
        const burgersPromise = Burger.find({});
        const chinesePromise = Chinese.find({});
        const wrapsAndRollsPromise = WrapsAndRolls.find({});
        const beveragesPromise = Beverages.find({});
        const thalisPromise = Thalis.find({});
        const bestSellersPromise = BestSellers.find({});

        // Use Promise.all to wait for all promises to resolve
        const [pizzas, burgers, chinese, wrapsAndRolls, beverages, thalis, bestSellers] = await Promise.all([
            pizzasPromise,
            burgersPromise,
            chinesePromise,
            wrapsAndRollsPromise,
            beveragesPromise,
            thalisPromise,
            bestSellersPromise,
        ]);

        // Combine the results from different collections into a single array
        const allProducts = [
            ...pizzas,
            ...burgers,
            ...chinese,
            ...wrapsAndRolls,
            ...beverages,
            ...thalis,
            ...bestSellers,
        ];
        console.log(allProducts);
        // res.status(200).json({ allProducts });
        res.status(200).json({ allProducts, nbHits: allProducts.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getProduct = asyncWrapper(async (req, res,next) => {
    try {
        const { id:productId } = req.params;

        // Assuming Pizza, Burger, Chinese, WrapsAndRolls, Beverages, Thalis, BestSellers are your models
        const collections = [Pizza, Burger, Chinese, WrapsAndRolls, Beverages, Thalis, BestSellers];

        // Use Promise.all to search for the product ID in all collections
        const products = await Promise.all(
            collections.map(async (model) => {
                return model.findById(productId);
            })
        );

        // Find the first non-null result (product) from the search
        const product = products.find((product) => product !== null);

        // Check if the product is found
        if (!product) {
            return next(creatCustomError(`No product with id ${productID}`,404))
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = {
    getAllProducts,
    getProduct
};
