import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';
const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  isSeller: {
    type: Boolean,
    required: true,
    default: false
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=userModel.js.map