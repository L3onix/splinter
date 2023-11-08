const express = require("express");
const router = express.Router();
const jwtValidate = require("../middlewares/jwt");
const { signInUser, signUpUser } = require("../controllers/AuthController");

router.get("/status", jwtValidate, (req, res) => {
    res.status(200).json(req.userInfo);
});

router.post("/register", signUpUser);
router.post("/login", signInUser);

module.exports = router;
