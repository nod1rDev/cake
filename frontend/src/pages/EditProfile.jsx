import { useState } from "react";
import axios from "axios";
import "./AddProduct.scss";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: "",
    sizes: [{ label: "", price: "" }],
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...form.sizes];
    newSizes[index][field] = value;
    setForm((prev) => ({ ...prev, sizes: newSizes }));
  };

  const addSize = () => {
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { label: "", price: "" }],
    }));
  };

  // Upload image to server
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, image: data.url })); // server should return image URL
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/products", {
        ...form,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
      });
      alert("✅ Product added!");
      setForm({
        name: "",
        price: "",
        description: "",
        ingredients: "",
        sizes: [{ label: "", price: "" }],
        category: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
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

        {/* Price */}
        <div className="form-group">
          <label>Base Price ($)</label>
          <input
            type="number"
            name="price"
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

        {/* Ingredients */}
        <div className="form-group">
          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Flour, Sugar, Eggs, Chocolate"
            required
          />
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
                onChange={(e) =>
                  handleSizeChange(idx, "label", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(idx, "price", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addSize}>
            + Add Size
          </button>
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {uploading && <p>Uploading...</p>}
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="preview-image"
            />
          )}
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Cake"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
