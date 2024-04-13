const express = require("express");
const router = express.Router();

const {
    registerUser,
    userLogin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    authRole,
    user,
    getUser,
    deleteUser,
    getUserId,
    khaltiPayment
} = require("./../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/authorization");

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.get("/role", isAuthenticated, authRole);
router.get("/me", isAuthenticated, user);
router.get("/all-user", isAuthenticated, getUser);
router.get("/user/:id", isAuthenticated, getUserId);
router.delete("/delete/:id", isAuthenticated, deleteUser);
router.post("/khalti", khaltiPayment);

module.exports = router;