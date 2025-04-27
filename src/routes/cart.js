const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart");

// All routes are protected and require authentication
router.use(protect);

// @route   GET /api/cart
router.get("/", getCart);

// @route   POST /api/cart
router.post("/", addToCart);

// @route   PUT /api/cart/:itemId
router.put("/:itemId", updateCartItem);

// @route   DELETE /api/cart/:itemId
router.delete("/:itemId", removeFromCart);

// @route   DELETE /api/cart
router.delete("/", clearCart);

module.exports = router;
