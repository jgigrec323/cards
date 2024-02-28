const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");

const {
  createOrder,
  completeOrder,
  getUserOrders,
  getAllOrdersWithStatus,
} = require("../controllers/order");

// Define routes
router.get("/", authenticateUser, getUserOrders);
router.get("/get-all", authenticateUser, getAllOrdersWithStatus);
router.post("/", authenticateUser, createOrder);
router.put("/complete-order/:orderSummaryId", authenticateUser, completeOrder);

module.exports = router;
