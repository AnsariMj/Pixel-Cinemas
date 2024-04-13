const asyncHandler = require("express-async-handler");
const { axios } = require("axios");




const khaltiPayment = asyncHandler(async (req, res) => {
    const { seatId, amount } = req.body;
    if (!seatId || !amount) {
        return res.status(400).json({
            message: " Please Porvide amount and movie id"
        })
    }

    const payload = {
        "return_url": "https://localhost:3000",
        "website_url": "https://localhost:3000",
        "amount": amount,
        "purchase_order_id": "MovieId",
        "purchase_order_name": "Black Panther"
    }

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", payload, {
        headers: {
            'Authorization': 'key eb0e734c13ce40e69ff06dfd7fc188da'
        }
    })
    console.log(response);
})
module.exports = {
    khaltiPayment
};
