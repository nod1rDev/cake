import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer_content">
                    <p>&copy; Кондитерские изделия «Кристалл», 2000–2023</p>

                    <div>
                        <Link to={'/'}>Политика конфиденциальности</Link>
                        <Link to={'/'}>+7 (8412) 709-900</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
