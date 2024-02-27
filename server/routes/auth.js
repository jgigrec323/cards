const router = require("express").Router();
const { login, register, getAll } = require("../controllers/auth");

router.get("/getAll", getAll);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
