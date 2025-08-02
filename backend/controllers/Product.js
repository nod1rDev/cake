import Product from "../models/Product.js";
import mongoose from 'mongoose';

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

export const createProduct = async (req, res) => {
    try {
        console.log('User in createProduct:', req.user);
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);

        const user = req.user;
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admins can add products' });
        }

        const { name, price, description, category } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ success: false, message: 'Please provide all product fields' });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Product image is required' });
        }

        // const imagePath = `/uploads/${req.file.filename}`;

                 const product = await Product.create({
            name,
            price,
            image: `/uploads/${req.file.filename}`,
            description,
            category,
            createdBy: user._id,
        });

        // Fetch the created product with populated fields
        const populatedProduct = await Product.findById(product._id)
            .populate('category', 'name')
            .populate('createdBy', 'name email bio image');

        console.log('Product created successfully:', populatedProduct);
        res.status(201).json({ success: true, product: populatedProduct });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        // If a new image was uploaded, update the image path
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        // Validate category if provided
        if (productData.category && !mongoose.Types.ObjectId.isValid(productData.category)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

                 const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true })
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
