const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  createOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
} = require("../controllers/orders");

// All routes require authentication
router.use(protect);

// @route   POST /api/orders
router.post("/", createOrder);

// @route   GET /api/orders/myorders
router.get("/myorders", getUserOrders);

// @route   GET /api/orders/:id
router.get("/:id", getOrderById);

// @route   PUT /api/orders/:id/pay
router.put("/:id/pay", updateOrderToPaid);

// Admin routes
router.use(authorize("admin"));

// @route   GET /api/orders
router.get("/", getOrders);

// @route   PUT /api/orders/:id/deliver
router.put("/:id/deliver", updateOrderToDelivered);

// @route   PUT /api/orders/:id/status
router.put("/:id/status", updateOrderStatus);

module.exports = router;
