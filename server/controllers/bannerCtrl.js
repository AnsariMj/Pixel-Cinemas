const asyncHandler = require("express-async-handler");
const banner = require("../models/movieBanner")

//Create banner
const createBanner = asyncHandler(async (req, res) => {
    try {
        const { title, image } = req.body;
        if (!title || !image) {
            return res.status(400).json({
                message: "Please provide correct credentials",
            });
        }

        await banner.create({
            bannerTitle: title,
            bannerImage: image,
        });
        console.log(banner);
        res.status(200).json({
            message: "Banner Added Successfully",
            data: banner,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error Invalid Request" });
    }
});
//Update banner
const updateBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const Banner = await banner.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!Banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        res.json(Banner);
    } catch (error) {
        res.json(500).json({ message: "Server Error" });
    }

})
//Delete banner
const deleteBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const existingBanner = await banner.findByIdAndDelete(id);
        if (!existingBanner) {
            return res.status(404).json({ message: "Banner Not found" });
        }
        res.json({ message: "Banner deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
//Get All banner
const getAllBanner = asyncHandler(async (req, res) => {
    try {
        const Banner = await banner.find();
        res.json(Banner);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
//Get One banner
const getOneBanner = asyncHandler(async (req, res) => {
    try {
        const Banner = await banner.findById(req.params.id);
        if (!Banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        res.json(Banner);
    } catch (error) {
        res.status(404).json({ message: "Server error" });
    }
})

module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanner,
    getOneBanner

};
