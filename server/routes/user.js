const router = require("express").Router();
const {
  getUserById,
  getUserInfosByUserId,
  saveUserInfos,
  authenticateUserRoutes,
} = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", authenticateUser, getUserById);
router.get("/user-infos", authenticateUser, getUserInfosByUserId);
router.post("/saveInfos", authenticateUser, saveUserInfos);
router.get("/:username", authenticateUser, authenticateUserRoutes);

module.exports = router;
