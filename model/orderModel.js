import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = Schema({

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  orderItems: [{
    name: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  }],

  dispute: {
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },

  shippingAddress: {
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: {
      type: String
    },
    status: {
      type: String
    },
    update_time: {
      type: String
    },
    email_address: {
      type: String
    }
  },
  taxPrice: {
    type: String,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: String,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: String,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});
const Order = mongoose.model('Order', orderSchema);
export default Order;
//# sourceMappingURL=orderModel.js.map