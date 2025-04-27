const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
    min: [0, "Price must be greater than 0"],
  },
  images: {
    type: [String],
    required: [true, "Please add at least one image"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please add a category"],
  },
  stock: {
    type: Number,
    required: [true, "Please add stock quantity"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot be more than 100%"],
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  ratings: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot be more than 5"],
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate discounted price
ProductSchema.virtual("discountedPrice").get(function () {
  return this.price - (this.price * this.discount) / 100;
});

// Ensure virtuals are included when converting to JSON
ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);
