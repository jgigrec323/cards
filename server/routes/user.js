const router = require("express").Router();
const {
  getUserById,
  getUserInfosByUserId,
  saveUserInfos,
} = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", authenticateUser, getUserById);
router.get("/user-infos", authenticateUser, getUserInfosByUserId);
router.post("/saveInfos", authenticateUser, saveUserInfos);

module.exports = router;
