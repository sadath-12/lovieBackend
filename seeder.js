import dotenv from 'dotenv'
import 'colors'
import connectDB from './config/connectDB.js'
import products from './data/products.js'
import users from './data/users.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import User from './model/userModel.js'

dotenv.config()

await connectDB()

const importData = async () => {
    try {

        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleData = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleData)

        console.log('Data imported! 😍😍😍'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error!: ${error.message}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {

        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        console.log('Data destroyed! 😍😍😍'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error!: ${error.message}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}