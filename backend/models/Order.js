import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    deliveryInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered"],
        default: "pending",
    },
    orderNumber: {
        type: String,
        unique: true,
        default: () => uuidv4(), // ✅ unique order number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Order", orderSchema);
