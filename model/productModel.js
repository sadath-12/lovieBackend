import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const reviewSchema = Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const productSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const Product = mongoose.model('Product', productSchema);
export default Product;
//# sourceMappingURL=productModel.js.map