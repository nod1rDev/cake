import React, { useEffect, useState } from 'react';
import './CategoryMenu.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiCakeSlice, GiCupcake, GiBread, GiDonut } from 'react-icons/gi';
import { useProductStore } from '../store/Product';

const CategoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const { categories, fetchCategories } = useProductStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // Optional: assign bakery icons by category name
  const categoryIcons = {
    Cakes: <GiCakeSlice />,
    Cupcakes: <GiCupcake />,
    Bread: <GiBread />,
    Donuts: <GiDonut />,
  };

  return (
    <>
      <button className="burger-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
        Каталог
      </button>

      <div className={`category-menu-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="category-sidebar">
          {categories.map((cat, index) => (
            <div
              key={cat._id}
              className={`category-item ${activeCategory === index ? 'active' : ''}`}
              onClick={() => setActiveCategory(index)} // 🔥 Now click, not hover!
            >
              <span className="category-icon">
                {categoryIcons[cat.name] || <GiCakeSlice />}
              </span>
              {cat.name}
            </div>
          ))}
        </div>

        <div className="category-submenu">
          {activeCategory !== null && (
            <div className="subcategory-group">
              <h4>{categories[activeCategory]?.name}</h4>
              <p>Здесь можно отобразить подкатегории или товары...</p>
              {/* You can render subcategories or fetch category products */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryMenu;
