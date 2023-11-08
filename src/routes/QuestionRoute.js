const express = require("express");
const router = express.Router();
const jwtValidate = require("../middlewares/jwt");
const { show, create, update } = require("../controllers/QuestionController");

router.get("/:id", show);
router.post("/", jwtValidate, create);
router.put("/:id", jwtValidate, update);

module.exports = router;
