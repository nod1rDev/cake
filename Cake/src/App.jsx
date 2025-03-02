import './App.css'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Card from './components/Card'
import { logo, menu, profile, cake } from './assets/images'

function App() {

    return (
        <>
            <header>
                <div className="container">
                    <nav className="mainNav">
                        <div>
                            <Link to={'/'}><img src={logo} alt="" className='logo' /></Link>
                            <button class="catalogue-button">
                                <img src={menu} alt="" />
                                Каталог
                            </button>
                            <form action="" className='menu-header'>
                                <NavLink to={'/sales'}>Оптовые продажи</NavLink>
                                <NavLink to={'/difference'}>Продажи в рознице</NavLink>
                                <NavLink to={'/contacts'}>Контакты</NavLink>
                                <NavLink to={'/vacancies'}>Вакансии</NavLink>
                                <NavLink to={'/comments'}>Отзывы</NavLink>
                            </form>
                        </div>
                        <button className="profile-button">
                            <img src={profile} alt="" className='icon' />
                            Личный кабинет
                        </button>
                    </nav>
                </div>
            </header>

            <main>
                <div className="menu">
                    <h2>Меню</h2>
                    <form class="menu_form">
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
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                        <Card weight={'200 гр.'} img={cake} kkal={'500 ккал.'} name={'Тортик'} price={'300₽'} desc={'Зеркало синхронизует межатомный магнит.'} />
                    </div>
                </div>
            </main>

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

export default App
