import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb+srv://sadath:123123123@cluster0.cdhfw.mongodb.net/Lovie?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`mongoDB connected: ${con.connection.host}`.white.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
//# sourceMappingURL=connectDB.js.map