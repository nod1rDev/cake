import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useProductStore } from "../store/Product.js"
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa"
import "./CakeDetails.scss"
import CakeAccordion from "../components/CakeAccordion.jsx" // <-- Use Accordion component

const CakeDetails = () => {
    const { productId } = useParams()
    const { products, fetchProducts } = useProductStore()
    const navigate = useNavigate()

    const [selectedSize, setSelectedSize] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                if (!products || products.length === 0) {
                    await fetchProducts()
                }
                setLoading(false)
            } catch (err) {
                setError("Failed to load product")
                setLoading(false)
                console.error("Error loading product:", err)
            }
        }

        loadData()
    }, [fetchProducts, products])

    const product = products?.find((p) => p._id === productId)

    const getRatingValue = () => {
        if (!product || !product.rating) return 5
        if (typeof product.rating === 'number') return product.rating
        if (product.rating && typeof product.rating === 'object' && 'average' in product.rating) return product.rating.average
        return 5
    }

    const getReviewCount = () => {
        if (!product || !product.rating) return 0
        if (product.rating && typeof product.rating === 'object' && 'count' in product.rating) return product.rating.count
        return 0
    }

    if (loading) return <div className="loading">Loading product details...</div>
    if (error) return <div className="error">Error: {error}</div>
    if (!product) return <div className="not-found">Product not found</div>

    return (
        <main className="cake-details">
            <div className="cake-details__container">
                {/* Left: Images */}
                <div className="cake-details__images">
                    <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="main-img"
                        onError={(e) => { e.target.src = '/placeholder-cake.jpg' }}
                    />
                </div>

                {/* Right: Info */}
                <div className="cake-details__info">
                    <h2 className="cake-details__title">{product.name}</h2>

                    <div className="cake-details__meta">
                        <span className="rating">
                            <FaStar /> {getRatingValue()}
                            {getReviewCount() > 0 && ` (${getReviewCount()} reviews)`}
                        </span>
                        <span className="orders">{product.orderCount || 0} orders</span>
                    </div>

                    <Link to={`/bakers/${product?.createdBy?._id}`} className="cake-details__baker">
                        by {product?.createdBy?.name || "Unknown Bakery"}
                    </Link>

                    {/* Sizes */}
                    <div className="cake-details__sizes">
                        <h4>Select Size:</h4>
                        {product.sizes?.map((size) => (
                            <button
                                key={size.label}
                                className={`size-btn ${selectedSize?.label === size.label ? "active" : ""}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>

                    {/* Accordion integration */}
                    {product?.description && (
                        <CakeAccordion title="Full Description">
                            <p>{product.description}</p>
                        </CakeAccordion>
                    )}

                    {product?.ingredients && (
                        <CakeAccordion title="Ingredients">
                            <ul>
                                {Array.isArray(product.ingredients)
                                    ? product.ingredients.map((ingredient, idx) => <li key={idx}>{ingredient}</li>)
                                    : <li>{product.ingredients}</li>
                                }
                            </ul>
                        </CakeAccordion>
                    )}

                    {/* Price */}
                    <div className="cake-details__price">
                        ${selectedSize ? selectedSize.price : product.price}
                    </div>

                    {/* Actions */}
                    <div className="cake-details__actions">
                        <button className="btn-primary" onClick={() => navigate("/order")}>
                            Buy Now
                        </button>
                        <button className="btn-cart">
                            <FaShoppingCart />
                        </button>
                        <button className="btn-favorite">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CakeDetails
