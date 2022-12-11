const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "i'm projects" })
}


const getAllProductsTesting = async (req, res) => {
    res.status(200).json({ msg: "i'm testing products" })
}

module.exports = { getAllProducts, getAllProductsTesting };