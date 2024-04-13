const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authorization");


const {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanner,
    getOneBanner
} = require("../controllers/bannerCtrl")

router.post('/add-banner',
    // isAuthenticated,
    // isAdmin,
    createBanner)
router.put('/update-banner', updateBanner)
router.delete('/delete-banner/:id', isAuthenticated, isAdmin, deleteBanner)
router.get('/get-all-banner', getAllBanner)
router.get('/get-banner/:id', getOneBanner)

module.exports = router; 