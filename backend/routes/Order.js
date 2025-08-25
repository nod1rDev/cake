import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { auth } from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { items, deliveryInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 1️⃣ Fetch product prices
    const products = await Product.find({ _id: { $in: items.map(i => i.product) } });
    const priceMap = {};
    products.forEach(p => { priceMap[p._id] = p.price; });

    // 2️⃣ Prepare order items
    const orderItems = items.map(i => ({
      product: i.product,
      quantity: i.quantity,
    }));

    // 3️⃣ Calculate totalPrice
    const totalPrice = items.reduce((sum, i) => {
      const price = priceMap[i.product];
      if (price === undefined) throw new Error(`Product price not found for ${i.product}`);
      return sum + price * i.quantity;
    }, 0);

    // 4️⃣ ✅ Create the order with a unique orderNumber
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
      deliveryInfo,
      orderNumber: uuidv4(), // must call the function here
    });

    res.status(201).json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/baker-orders", auth, async (req, res) => {
  try {
    // Find orders where any item belongs to this baker
    const orders = await Order.find({ "items.product.createdBy": req.user.id })
      .populate("items.product")
      .populate("user", "name email"); // optional: customer info

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


export default router;
