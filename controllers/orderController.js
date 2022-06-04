import asyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey('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'); // @desc    creating new order 
// @route   POST /api/orders
// @access  Public

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    itemsPrice,
    shippingPrice,
    shippingAddress,
    taxPrice,
    totalPrice,
    paymentMethod,
    orderItems
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order found');
  }

  const order = new Order({
    itemsPrice,
    user: req.user._id,
    shippingPrice,
    shippingAddress,
    taxPrice,
    totalPrice,
    paymentMethod,
    orderItems
  });
  const createdOrder = await order.save();
  res.status(201).json({
    createdOrder: createdOrder
  });
  const msg = {
    to: req.user.email,
    from: 'awais501.pk@gmail.com',
    // Use the email address or domain you verified
    subject: 'Good News, your order Confirmed! 😍',
    html: `<p>Order Delivery & Payment Verification can be checked here, Best Regards Shopping Outlet</p>
        <a href="https://lovieaurora.vercel.com/order/${createdOrder._id}">Track Order</a>
        <p>In case of issues, contact us</p>
        <a href="https://wa.me/+923394727835">Contact us on WhatsApp</a>`
  };
  const sendMail = await sgMail.send(msg);

  if (sendMail) {
    res.status(201).send('Order Details sent, Check your mail');
  }
}); // @desc    getting order by id
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({
      error: 'Order not found'
    });
  }
});

// @desc    getting order by id
// @route   GET /api/orders/:id
// @access  Private

const myOrdersList = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({
    user: req.user._id
  });

  if (myOrders) {
    res.json(myOrders);
  } else {
    res.status(404).json({
      error: 'Order not found'
    });
  }
}); // @desc    getting orderslist
// @route   GET /api/orders
// @access  Private/admin

const ordersList = asyncHandler(async (req, res) => {
  const Orders = await Order.find({}).populate('user', 'id name');

  if (Orders) {
    res.json(Orders);
  } else {
    res.status(404).json({
      error: 'Order not found'
    });
  }
});
export {
  addOrderItems,
  getOrderById,
  myOrdersList,
  ordersList
};
//# sourceMappingURL=orderController.js.map