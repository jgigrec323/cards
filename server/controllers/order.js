const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const orderData = req.body;

    // Iterate over each item in the order data array
    for (const item of orderData) {
      const { cardId, price, quantity } = item;

      // Calculate the total price for this card
      const totalPrice = price * quantity;

      // Create an order for this card
      await Order.create({
        userId,
        cardId,
        quantity,
        totalPrice,
        status: "pending",
      });
    }

    res
      .status(201)
      .json({ message: "Orders created successfully", success: true });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

module.exports = { createOrder };
