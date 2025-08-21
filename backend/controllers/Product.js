import Product from "../models/Product.js";
import mongoose from 'mongoose';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: "Server error while fetching products" });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product Id" });
        }

        const product = await Product.findById(id)
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ success: false, message: "Server error while fetching product" });
    }
};

// Get products by baker
export const getBakerProducts = async (req, res) => {
    try {
        const bakerId = req.params.bakerId;

        if (!mongoose.Types.ObjectId.isValid(bakerId)) {
            return res.status(400).json({ success: false, message: "Invalid baker ID" });
        }

        const products = await Product.find({ createdBy: bakerId })
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching baker products:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const user = req.user;
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admins can add products' });
        }

        const { name, price, description, category, ingredients, sizes } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ success: false, message: 'Please provide all product fields' });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Product image is required' });
        }

        const product = await Product.create({
            name,
            price,
            image: `/uploads/${req.file.filename}`,
            description,
            category,
            createdBy: user._id,
            ingredients: ingredients || [],
            sizes: sizes || [],
            orderCount: 0,
            rating: { average: 0, count: 0 } // ✅ default rating
        });

        const populatedProduct = await Product.findById(product._id)
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');

        res.status(201).json({ success: true, product: populatedProduct });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    let productData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        if (productData.category && !mongoose.Types.ObjectId.isValid(productData.category)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...productData,
                ingredients: productData.ingredients || [],
                sizes: productData.sizes || [],
                orderCount: productData.orderCount ?? 0,
                rating: productData.rating || { average: 0, count: 0 }
            },
            { new: true }
        )
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        const products = await Product.find({ category: categoryId })
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products by category:', error.message);
        res.status(500).json({ success: false, message: "Server error while fetching products by category" });
    }
};
