import asyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';

// @desc    Fetching all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};
    const countProducts = await Product.countDocuments({
      ...keyword
    });
    const products = await Product.find({
      ...keyword
    }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
      products,
      page,
      pages: Math.ceil(countProducts / pageSize)
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
}); // @desc    Fetching products top rated
// @route   GET /api/products/top
// @access  Public

const getTopRatedProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({}).sort({
      rating: -1
    }).limit(5);

    if (product) {
      res.json(product);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
}); // @desc    Fetching specific product
// @route   GET /api/product/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(401);
    throw new Error('Product did not found');
  }
});

// @desc    updating Product
// @router  PUT /api/product/:id
// @access  private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Product name',
    price: 0,
    description: 'Product description',
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Product brand',
    countInStock: 0,
    category: 'Product category'
  });

  if (product) {
    const createdproduct = await product.save();
    res.json(createdproduct);
  } else {
    res.status(401);
    throw new Error('Product did not created');
  }
});

// @desc    creating Product Review
// @router  POST /api/product/:id/reviews
// @access  protected

const createProductReview = asyncHandler(async (req, res) => {
  const {
    rating,
    comment
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(404);
      throw new Error('Product already reviewed');
    }
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({
    message: 'Review added'
  });
});
export {
  getProducts,
  getProductById,
  createProduct,
  createProductReview,
  getTopRatedProducts
};
//# sourceMappingURL=productController.js.map