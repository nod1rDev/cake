import { useEffect } from "react";
import { useBakerStore } from "../store/Baker";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './Bakers.css';
import BakerCard from "../components/BakerCard";
=======
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213

const Bakers = () => {
    const { fetchBaker, bakers, error } = useBakerStore();

    useEffect(() => {
        fetchBaker();
    }, [fetchBaker]);

    console.log('Bakers:', bakers); // Debugging line to check bakers

    return (
        <div>
<<<<<<< HEAD
            <main class="bakers">
                <div class="left-side">
                    <h1>Кондитеры</h1>
                    {/* <nav class="Community">
                        <a href="#">О НАС</a>
                        <a href="#">СПЕЦИАЛИСТЫ</a>
                    </nav> */}
                </div>

                <div class="right-side">
                    <img class="Community-photo" src={"/"} alt="" />
                    <div class="about">
                        <h3>О нас</h3>
                        <p>Мы - команда профессионалов, которые стремятся к совершенству в своей работе. Наша цель -
                            предоставить
                            нашим клиентам лучший сервис и качество.</p>

                    </div>
                    <div class="specialists">
                        <div class="specialist-container">
                            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                            {bakers && bakers.length > 0 ? (
                                bakers.map((baker) => (
                                    <Link to={baker._id} style={{ display: 'block' }}><BakerCard baker={baker} /></Link>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
=======
            <h2>Admin List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {bakers && bakers.length > 0 ? (
                bakers.map((baker) => (
                    <Link to={baker._id} style={{display: 'block'}}>{baker.name}</Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
        </div>
    );
}

export default Bakers;
