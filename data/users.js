import bcrypt from 'bcryptjs';
const users = [{
  name: 'Admin',
  email: 'admin@lovieaurora.com',
  password: bcrypt.hashSync('admin', 10),
  isAdmin: true
}, {
  name: 'NoumanShop',
  email: 'nouman@lovieaurora.com',
  password: bcrypt.hashSync('nouman', 10)
}];
export default users;
//# sourceMappingURL=users.js.map