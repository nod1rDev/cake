import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useProductStore } from "../store/Product.js"
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa"
import "./CakeDetails.scss"

const CakeDetails = () => {
    const { productId } = useParams()
    const { products, fetchProducts } = useProductStore()
    const navigate = useNavigate()

    const [selectedSize, setSelectedSize] = useState(null)
    const [openSection, setOpenSection] = useState(null)

    useEffect(() => {
        if (!products || products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products])

    const product = products.find((p) => p._id === productId)
    if (!product) return <p>Loading...</p>

    const handleAccordion = (section) => {
        setOpenSection(openSection === section ? null : section)
    }

    return (
        <main className="cake-details">
            <div className="cake-details__container">
                {/* Left: Images */}
                <div className="cake-details__images">
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} className="main-img" />
                </div>

                {/* Right: Info */}
                <div className="cake-details__info">
                    <h2 className="cake-details__title">{product.name}</h2>

                    <div className="cake-details__meta">
                        <span className="rating"><FaStar /> {product.rating || 5}</span>
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

                    {/* Accordion */}
                    <div className="accordion">
                        <div className={`accordion-item ${openSection === "description" ? "open" : ""}`}>
                            <button onClick={() => handleAccordion("description")}>Full Description</button>
                            {openSection === "description" && <p>{product.description}</p>}
                        </div>
                        <div className={`accordion-item ${openSection === "ingredients" ? "open" : ""}`}>
                            <button onClick={() => handleAccordion("ingredients")}>Ingredients</button>
                            {openSection === "ingredients" && <p>{product.ingredients}</p>}
                        </div>
                    </div>

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
