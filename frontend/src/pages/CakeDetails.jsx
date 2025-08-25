import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/Product.js";
import { useCartStore } from "../store/Cart";
import { useUserStore } from "../store/User";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./CakeDetails.scss";
import CakeAccordion from "../components/CakeAccordion.jsx";

const CakeDetails = () => {
    const { productId } = useParams();
    const { products, fetchProducts } = useProductStore();
    const { addToCart } = useCartStore();
    const { addFavorite } = useUserStore(); // assuming you have this
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                if (!products || products.length === 0) await fetchProducts();
                setLoading(false);
            } catch (err) {
                setError("Failed to load product");
                setLoading(false);
                console.log(err);
            }
        };
        loadData();
    }, [fetchProducts, products]);

    const product = products?.find((p) => p._id === productId);

    if (loading) return <div>Loading product...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        addToCart({
            product,
            quantity,
            selectedSize,
        });
        navigate("/cart");
    };

    const handleAddFavorite = () => {
        addFavorite(product);
    };

    const price = selectedSize ? selectedSize.price : product.price;

    return (
        <main className="cake-details">
            <div className="cake-details__container">
                <div className="cake-details__images">
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                </div>

                <div className="cake-details__info">
                    <h2>{product.name}</h2>
                    <span className="rating">
                        <FaStar /> {product.rating?.average ?? 5} ({product.rating?.count ?? 0} reviews)
                    </span>

                    <Link to={`/bakers/${product.createdBy?._id}`}>
                        by {product.createdBy?.name || "Unknown Bakery"}
                    </Link>

                    <div className="cake-details__sizes">
                        <h4>Select Size:</h4>
                        {product.sizes?.map((size) => (
                            <button
                                key={size.label}
                                className={selectedSize?.label === size.label ? "active" : ""}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.label} (${size.price})
                            </button>
                        ))}
                    </div>

                    <div className="cake-details__quantity">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <div className="cake-details__price">Price: ${price}</div>

                    <div className="cake-details__actions">
                        <button className="btn-primary" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button className="btn-favorite" onClick={handleAddFavorite}>
                            <FaHeart /> Add to Favorites
                        </button>
                    </div>

                    {product.description && (
                        <CakeAccordion title="Description">
                            <p>{product.description}</p>
                        </CakeAccordion>
                    )}
                    {product.ingredients && (
                        <CakeAccordion title="Ingredients">
                            <ul>
                                {product.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                            </ul>
                        </CakeAccordion>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CakeDetails;
