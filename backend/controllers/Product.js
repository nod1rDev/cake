import Product from "../models/Product.js";
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log('Error in fething products:', error.message);
        res.status(500).json({ success: false, message: "Please provide all fields" })
    }
}

export const getBakerProducts = async (req, res) => {
    try {
        const bakerId = req.params.bakerId;

        const products = await Product.find({ createdBy: bakerId });

        res.status(200).json({ success: true, data: products })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// export const createProduct = async (req, res) => {
//     const product = req.body;

//     if (!product.name || !product.price || !product.image) {
//         return res.status(400).json({ success: false, message: "Please provide all fields" })
//     }

//     const newPRoduct = new Product(product)

//     try {
//         await newPRoduct.save()
//         res.status(201).json({ success: true, data: newPRoduct })
//     } catch (error) {
//         res.status(500).json({ success: false, message: "server Error" })
//     }
// }

export const createProduct = async (req, res) => {
    try {
        const user = req.user;

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Only admins can add products' });
        }

        const { name, price, image, description } = req.body;

        if (!name || !price || !image || !description) {
            return res.status(400).json({ msg: 'Please provide all product fields' });
        }

        const product = await Product.create({
            name,
            price,
            image,
            description,
            createdBy: user._id,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: true, message: "Invalid Product Id" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted" })
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" })
    }
}