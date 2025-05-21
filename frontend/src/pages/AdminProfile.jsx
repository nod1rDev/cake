import { useEffect } from 'react';
import { useUserStore } from '../store/User';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // To get bakerId from URL
import { useProductStore } from '../store/Product';

const AdminProfile = () => {
    const { userInfo, errorMessage, isLoadingProfile, fetchProfile, logoutUser } = useUserStore();

    useEffect(() => {
        console.log('calling fetchProfile');
        fetchProfile();
    }, [fetchProfile]);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/register'); // Navigate to login page after logout
    };

    const { bakerId } = useParams();
    const { products, fetchProductsByBaker } = useProductStore();

    useEffect(() => {
        fetchProductsByBaker(bakerId);
    }, [bakerId, fetchProductsByBaker]);

    return (
        <>
            <div>
                <h2>Your Profile</h2>
                {/* Display error message if any */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {/* Show loading state while fetching */}
                {isLoadingProfile ? (
                    <p>Loading profile...</p>
                ) : (
                    userInfo && (
                        <div>
                            <p>Name: {userInfo.name}</p>
                            <p>Email: {userInfo.email}</p>
                            {/* Add more fields as needed */}
                        </div>
                    )
                )}
                <button onClick={handleLogout}>Logout</button>
                <h1>ADMIN</h1>
            </div>

            <div>
                <h2>Products by this Baker</h2>
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id}>
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found for this baker.</p>
                )}
            </div>

            <Link to='/admin'>create</Link>
        </>

        // <>
        //       <main className="admin_profile">
        //         <section class="left-side">
        //           <h1>Виктория</h1>
        //           <nav class="VikaLinks">
        //             <Link to={'/'}>ЛИЧНЫЕ ДАННЫЕ</Link>
        //             <Link to={'/'}>МОИ ПИТОМЦЫ</Link>
        //             <Link to={'/'}>ЗАПИСЬ НА ПРИЕМ</Link>
        //             <Link to={'/'}>ВЫЙТИ</Link>
        //           </nav>
        //         </section>

        //         <section class="right-side">
        //           <div class="PersonalInfo">
        //             <h2>Личные данные</h2>

        //             <div class="PersonalInfo-container">
        //               <div class="PersonalInfo-container-left">
        //                 <div class="image-container">
        //                   <img src="images/фото (1).png" alt="Pet 1" />
        //                   <p>изменить</p>

        //                 </div>
        //                 <div class="PersonalInfo-container-left-text">
        //                   <div class="info-pair">
        //                     <h3>Имя</h3>
        //                     <p>Виктория</p>
        //                   </div>
        //                   <div class="info-pair">
        //                     <h3>Фамилия</h3>
        //                     <p>Иванова</p>
        //                   </div>
        //                   <div class="info-pair">
        //                     <h3>Отчество</h3>
        //                     <p>Александровна</p>
        //                   </div>
        //                   <div class="info-pair">
        //                     <h3>Телефон</h3>
        //                     <p>+7 999 598-12-45</p>
        //                   </div>
        //                 </div>


        //               </div>
        //               <div class="PersonalInfo-container-right">
        //                 <h3>О себе</h3>
        //                 <p> loremЖиву в Волгограде, очень люблю животных! Мечтаю завести много зверей и построить приют.
        //                   Пока
        //                   что у меня собака, кошка и рыбки : </p>

        //               </div>

        //             </div>



        //             <section class="pets">
        //               <h2>Мои питомцы</h2>
        //               <div class="add-pet">
        //                 <img src="images/ic_newpets.png" alt="Add Pet" />
        //                 <p>Добавить питомца</p>

        //               </div>
        //               <div class="pets-container">
        //                 <div class="pet-card">

        //                   <div class="pet-card-container">
        //                     <div class="image-container">
        //                       <img src="images/Ellipse.png" alt="Pet 1" />
        //                       <p>изменить</p>

        //                     </div>
        //                     <div class="pet-card-container-left">

        //                       <h2>Имя питомца</h2>
        //                       <div class="info-pair">
        //                         <h3>тип</h3>
        //                         <p>Собака</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>пол</h3>
        //                         <p>Мужской</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>Порода</h3>
        //                         <p>Лабрадор</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>Возраст</h3>
        //                         <p>1 год 2 месяца</p>
        //                       </div>
        //                     </div>
        //                   </div>

        //                   <div class="otherInformation">
        //                     <h3>Дополнительная информация</h3>
        //                     <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt itaque, alias autem
        //                       iusto perferendis animi quae, aspernatur dolor reprehenderit aliquam excepturi at
        //                       placeat quia reiciendis tenetur maxime assumenda atque accusantium.Питомец очень
        //                       дружелюбный и любит играть с детьми. У него есть все прививки и он
        //                       стерилизован.</p>

        //                   </div>
        //                 </div>

        //                 <div class="pet-card">

        //                   <div class="pet-card-container">
        //                     <div class="image-container">
        //                       <img src="images/Ellipse.png" alt="Pet 1" />
        //                       <p>изменить</p>

        //                     </div>

        //                     <div class="pet-card-container-left">

        //                       <h2>Имя питомца</h2>
        //                       <div class="info-pair">
        //                         <h3>тип</h3>
        //                         <p>Собака</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>пол</h3>
        //                         <p>Мужской</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>Порода</h3>
        //                         <p>Лабрадор</p>
        //                       </div>
        //                       <div class="info-pair">
        //                         <h3>Возраст</h3>
        //                         <p>1 год 2 месяца</p>
        //                       </div>
        //                     </div>
        //                   </div>

        //                   <div class="otherInformation">
        //                     <h3>Дополнительная информация</h3>
        //                     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum excepturi possimus
        //                       mollitia quibusdam laboriosam voluptatem dolorum necessitatibus minima dolor omnis
        //                       voluptas ipsum unde, ipsam laudantium obcaecati debitis quam ducimus nostrum.Питомец
        //                       очень дружелюбный и любит играть с детьми. У него есть все прививки и он
        //                       стерилизован.</p>

        //                   </div>
        //                 </div>
        //               </div>
        //             </section>
        //           </div>
        //         </section>
        //       </main>
        //     </>
    );
};

export default AdminProfile;
