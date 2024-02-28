const Order = require("../models/Order");
const OrderSummary = require("../models/OrderSummary");
const Card = require("../models/Card");

const createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const orderData = req.body;

    // Create an order summary for the entire order
    const orderSummary = await OrderSummary.create({
      userId,
      status: "pending",
    });

    // Iterate through each order item in the orderData array
    for (const orderItem of orderData) {
      const { cardId, quantity, price } = orderItem;
      const totalPrice = quantity * price;

      // Create an order record for each order item and associate it with the order summary
      await Order.create({
        userId,
        cardId,
        quantity,
        totalPrice,
        orderSummaryId: orderSummary.id, // Associate this order with the order summary
      });
    }

    console.log("Order Summary:", orderSummary);

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      orderSumId: orderSummary.id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const completeOrder = async (req, res) => {
  try {
    const { orderSummaryId } = req.params;
    const orderSummary = await OrderSummary.findByPk(orderSummaryId);

    if (!orderSummary) {
      return res.status(404).json({ message: "Order summary not found" });
    }
    await orderSummary.update({ status: "completed" });

    res.status(200).json({ message: "Order summary marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete order summary" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req;

    const userOrders = await Order.findAll({
      where: { userId },
      include: [
        { model: OrderSummary },
        { model: Card, attributes: ["cardName"] },
      ],
    });

    if (!userOrders) {
      return res.json({ userOrders, status: false });
    }

    // Format the response data as needed
    const formattedOrders = userOrders.map((order) => ({
      orderId: order.id,
      cardId: order.cardId,
      cardName: order.Card.cardName,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.OrderSummary.status,
      createdAt: order.OrderSummary.createdAt,
      updatedAt: order.OrderSummary.updatedAt,
    }));

    res.status(200).json({ orders: formattedOrders, status: true });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};
const getAllOrdersWithStatus = async (req, res) => {
  try {
    // Fetch all orders including their associated OrderSummary records
    const orders = await Order.findAll({
      include: [OrderSummary],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  completeOrder,
  getUserOrders,
  getAllOrdersWithStatus,
};
