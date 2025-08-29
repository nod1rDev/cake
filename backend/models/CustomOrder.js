import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sponge: { type: String, required: true },
    cream: { type: String, required: true },
    decoration: { type: String, required: true },
    deliveryInfo: {
      name: String,
      phone: String,
      address: String,
    },
    orderNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending", // ✅ default
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomOrder", customOrderSchema);
