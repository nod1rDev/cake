import React, { useEffect } from 'react'
import './Catalog.css'
import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/Product.js'

const Catalog = () => {
    const { fetchProducts, products } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    console.log(products);

    return (
        <main>
            <div className="menu">
                <h2>Меню</h2>
                <form className="menu_form">
                    <Link to={"#"}>Летнее меню</Link>
                    <Link to={"#"}>Кофе и чай</Link>
                    <Link to={"#"}>Холодные напитки</Link>
                    <Link to={"#"}>Комбо</Link>
                    <Link to={"#"}>Shoko Go</Link>
                    <Link to={"#"}>Конструктор завтраков</Link>
                    <Link to={"#"}>Завтраки весь день</Link>
                    <Link to={"#"}>Блинчики</Link>
                    <Link to={"#"}>Пицца от Eazzy Pizza & Gelato</Link>
                    <Link to={"#"}>Супы</Link>
                    <Link to={"#"}>Горячие блюда</Link>
                    <Link to={"#"}>Только в доставке</Link>
                    <Link to={"#"}>Салаты</Link>
                    <Link to={"#"}>Десерты</Link>
                    <Link to={"#"}>Добавки и соусы</Link>
                </form>

            </div>
            <div className="catalogue">
                <h2>Каталог</h2>
                <div className="catalogue_content">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Catalog
