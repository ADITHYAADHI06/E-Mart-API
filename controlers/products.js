const Product = require("../models/products")

const getAllProducts = async (req, res) => {

    const { company, name, featured, sort, select } = req.query;
    // console.log("🚀 ~ file: products.js ~ line 5 ~ getAllProducts ~ sort", sort);
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (featured) {
        queryObject.featured = featured;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        //     // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    // page = 2;
    // limit = 3;
    // skip =  1 * 3 = 3

    apiData = apiData.skip(skip).limit(limit);

    // console.log(queryObject);
    try {
        const Products = await apiData;
        res.status(200).json({ Products, nbHits: Products.length });
        // res.status(200).json({ Products })
    } catch (error) {
        res.status(404).json("Bad request");
        console.log(error)
    }
}


const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find({});
    res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting };