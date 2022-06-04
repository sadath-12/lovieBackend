import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('====================================');
      console.log(token);
      console.log('====================================');
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(verifyUser.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Token not found');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('only admin users are allowed');
  }
};

export { protect, admin };
//# sourceMappingURL=authMiddleware.js.map