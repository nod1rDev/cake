import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // references the baker (user)
    required: true,
  },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productScheme)

export default Product