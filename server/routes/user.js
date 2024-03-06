const router = require("express").Router();
const {
  getUserById,
  getUserInfosByUserId,
  getUserInfosByUsername,
  saveUserInfos,
  authenticateUserRoutes,
} = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", authenticateUser, getUserById);
router.get("/user-infos", authenticateUser, getUserInfosByUserId);
router.post("/saveInfos", authenticateUser, saveUserInfos);
router.get("/:username", authenticateUser, authenticateUserRoutes);
router.get("/user-infos-by-username/:username", getUserInfosByUsername);

module.exports = router;
