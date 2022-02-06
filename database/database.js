const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  const DATABASE = "productDB";
  const PASSWORD = process.env.PASSWORD;
  const CONNECTION_URL = `mongodb+srv://adim:${PASSWORD}@coded.j2ddu.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
  console.log(CONNECTION_URL);
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
