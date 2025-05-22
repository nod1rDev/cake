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
<<<<<<< HEAD
    description: {
=======
    desc: {
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
        type: String,
        required: true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // references the baker (user)
<<<<<<< HEAD
    required: true,
=======
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
  },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productScheme)

export default Product