import { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.scss";
import toast from "react-hot-toast";
import { useProductStore } from "../../store/Product.js";

const AddProduct = () => {
  const { createProduct } = useProductStore();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "", // For preview
    imageFile: null, // For upload
    ingredients: [],
    sizes: [],
  });

  const [categories, setCategories] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !form.ingredients.includes(newIngredient)) {
      setForm((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }));
      setNewIngredient("");
    }
  };

  const removeIngredient = (ing) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== ing),
    }));
  };

  const addSize = () => {
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { label: "", price: "" }],
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...form.sizes];
    newSizes[index][field] = value;
    setForm((prev) => ({ ...prev, sizes: newSizes }));
  };

  const removeSize = (index) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  // Handle file selection for image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL and store the file
      setForm(prev => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (Number(form.price) <= 0) {
      return toast.error('❌ Price must be greater than 0');
    }

    if (!form.imageFile) {
      return toast.error('❌ Please select an image');
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('image', form.imageFile); // Append the file

      // Append ingredients
      form.ingredients.forEach((ing, idx) => {
        formData.append(`ingredients[${idx}]`, ing);
      });

      // Append sizes
      form.sizes.forEach((s, idx) => {
        formData.append(`sizes[${idx}][label]`, s.label);
        formData.append(`sizes[${idx}][price]`, s.price);
      });

      const token = localStorage.getItem('token');
      const { success, message } = await createProduct(formData, token);

      if (success) {
        toast.success('✅ Product added successfully!');
        // Reset form
        setForm({
          name: '',
          price: '',
          description: '',
          category: '',
          image: '',
          imageFile: null,
          ingredients: [],
          sizes: [],
        });
        // Clear file input
        document.querySelector('input[type="file"]').value = "";
      } else {
        toast.error(`❌ ${message}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('❌ Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2 className="add-product__title">Add New Cake</h2>

      <form className="add-product__form" onSubmit={handleSubmit}>
        {/* Cake Name */}
        <div className="form-group">
          <label>Cake Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Base Price */}
        <div className="form-group">
          <label>Base Price ($)</label>
          <input
            type="number"
            name="price"
            min="1"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category Select */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label>Ingredients</label>
          <div className="ingredients">
            {form.ingredients.map((ing, idx) => (
              <span key={idx} className="ingredient-chip">
                {ing}
                <button
                  type="button"
                  onClick={() => removeIngredient(ing)}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
          <div className="ingredient-input">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Add ingredient"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="btn-secondary"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Sizes */}
        <div className="form-group">
          <label>Sizes</label>
          {form.sizes.map((size, idx) => (
            <div key={idx} className="size-inputs">
              <input
                type="text"
                placeholder="Label (e.g. Small)"
                value={size.label}
                onChange={(e) => handleSizeChange(idx, "label", e.target.value)}
                required={form.sizes.length > 0}
              />
              <input
                type="number"
                placeholder="Price"
                min="1"
                value={size.price}
                onChange={(e) => handleSizeChange(idx, "price", e.target.value)}
                required={form.sizes.length > 0}
              />
              <button
                type="button"
                onClick={() => removeSize(idx)}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={addSize}
          >
            + Add Size
          </button>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {form.image && (
            <div className="image-preview">
              <img src={form.image} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Cake"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;