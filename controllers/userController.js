import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey('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');

// @desc    Auth User Login
// @router  POST /api/login
// @access  Protected
const authUser = asyncHandler(async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await User.findOne({
      email
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image || 'images/profile.jpg',

        isAdmin: user.isAdmin,
        isVerified: user.isVerified || false,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error("Email or Password is incorrect");
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
}); // @desc    Auth Google User Login
// @router  POST /api/google/redirect
// @access  Private

const socialLogin = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      image
    } = req.body;
    const user = await User.findOne({
      email
    });

    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image || '/images/profile.png',

        isAdmin: user.isAdmin,
        isVerified: true,
        token: generateToken(user._id)
      });
    } else {
      const createdUser = await User.create({
        name,
        email,
        password,
        image: image || '/images/profile.png'
      });

      if (createdUser) {
        res.json({
          createdUser,
          isVerified: true,
          token: generateToken(createdUser._id)
        });
      }
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
}); // @desc    get User Profile
// @router  POST /api/profile/:id
// @access  Protected

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      image: user.image || '/images/profile.png',
      email: user.email,

      isAdmin: user.isAdmin,
      isVerified: user.isVerified || false,
      token: generateToken(user._id)
    });
  }
}); // @desc    updating User Profile
// @router  PUT /api/profile
// @access  Protected

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (user.password) {
      user.password = req.body.password || user.password;
    }

    if (user.image) {
      user.image = req.body.image || user.image;
    }

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image || '/images/profile.png',

      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified || false,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(401);
    throw new Error('Profile did not updated');
  }
}); // @desc    register User Profile
// @router  POST /api/register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    const userExist = await User.findOne({
      email
    });

    if (userExist) {
      res.status(401);
      throw new Error(error);
    }

    const user = await User.create({
      name,
      email,
      password,
      image: '/images/profile.png'
    });

    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        image: user.image || '/images/profile.png',
        email: user.email,

        isAdmin: user.isAdmin,
        isVerified: user.isVerified || false,
        token: generateToken(user._id)
      });
    }

    const msg = {
      to: user.email,
      from: 'awais501.pk@gmail.com',
      // Use the email address or domain you verified
      subject: 'Verify Email',
      html: `<p>Activate your Account</p>
            <a href="https://shoppingoutlet.herokuapp.com/user/${user._id}/verify">Verify Account</a>`
    };
    const emailVerify = await sgMail.send(msg);

    if (emailVerify) {
      res.status(201).send('check your mail to verify email');
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
}); // @desc    getting all users
// @router  PUT /api/users
// @access  private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
}); // @desc    deleting  user
// @router  DELETE /api/user/:id
// @access  protected

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      message: 'user removed'
    });
  } else {
    res.status(404);
    throw new Error(error);
  }
}); // @desc    getting user id
// @router  GET /api/user/:id
// @access  private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('user not found');
  }
}); // @desc    updating User Profile
// @router  PUT /api/user/:id
// @access  private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    if (user.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image || '/images/profile.png',

      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('credentials did not updated');
  }
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  socialLogin
};
//# sourceMappingURL=userController.js.map