const router = require("express").Router();
const {
  getUserById,
  getUserInfosByUserId,
  getUserInfosByUsername,
  saveUserInfos,
  authenticateUserRoutes,
  updateUserInfos,
} = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

router.get("/", authenticateUser, getUserById);
router.get("/user-infos", authenticateUser, getUserInfosByUserId);
router.get("/protected", authenticateUser, (req, res) => {
  res.json({
    message: "You are authorized to access this route",
    status: true,
  });
});
router.post("/saveInfos", authenticateUser, saveUserInfos);
router.post("/editUserInfos", authenticateUser, updateUserInfos);
router.get("/:username", authenticateUser, authenticateUserRoutes);
router.get("/user-infos-by-username/:username", getUserInfosByUsername);

module.exports = router;
