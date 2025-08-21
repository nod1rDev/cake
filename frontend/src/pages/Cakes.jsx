import React, { useEffect, useState } from 'react'
import './Cakes.css'
import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/Product.js'

const Cakes = () => {
    const { fetchProducts, fetchCategories, fetchProductsByCategory, products, categories } = useProductStore()
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [fetchProducts, fetchCategories])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
        fetchProductsByCategory(category._id)
    }

    const handleAllProducts = () => {
        setSelectedCategory(null)
        fetchProducts()
    }

    return (
        <main>
            <div className="menu">
                <h2>Меню</h2>
                <form className="menu_form">
                    <Link to={"#"} onClick={handleAllProducts} className={!selectedCategory ? 'active' : ''}>
                        Все продукты
                    </Link>
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <Link
                                key={category._id}
                                to={"#"}
                                onClick={() => handleCategoryClick(category)}
                                className={selectedCategory?._id === category._id ? 'active' : ''}
                            >
                                {category.name}
                            </Link>
                        ))
                    ) : (
                        <p>Загрузка категорий...</p>
                    )}
                </form>
            </div>
            <div className="catalogue">
                <h2>Cakes</h2>
                <div className="catalogue_content">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Cakes
