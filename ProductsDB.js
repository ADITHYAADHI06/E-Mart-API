const connectDB = require("./db/conection");
const Product = require("./models/products");

require("dotenv").config();

const ProductJson = require("./Products.json");


const start = async () => {

    try {
        await connectDB(process.env.MONGODB_URL)
        await Product.deleteMany();
        await Product.create(ProductJson)
        console.log("success");
    } catch (error) {
        console.log(error);
    }

}


start();
