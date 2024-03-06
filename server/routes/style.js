const router = require("express").Router();
const {
  updateBody,
  updateButton,
  updateFooter,
  updateHeader,
  updateTexts,
  uploadImage,
  getStyleToPopulate,
} = require("../controllers/style");
const { authenticateUser } = require("../middlewares/auth");

router.put("/header", authenticateUser, updateHeader);
router.put("/footer", authenticateUser, updateFooter);
router.put("/texts", authenticateUser, updateTexts);
router.put("/button", authenticateUser, updateButton);
router.put("/body", authenticateUser, updateBody);
router.post("/uploadImage", authenticateUser, uploadImage);
router.post("/populate", getStyleToPopulate);

module.exports = router;
