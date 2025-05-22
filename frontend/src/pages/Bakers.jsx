import { useEffect } from "react";
import { useBakerStore } from "../store/Baker";
import { Link } from "react-router-dom";

const Bakers = () => {
    const { fetchBaker, bakers, error } = useBakerStore();

    useEffect(() => {
        fetchBaker();
    }, [fetchBaker]);

    console.log('Bakers:', bakers); // Debugging line to check bakers

    return (
        <div>
            <h2>Admin List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {bakers && bakers.length > 0 ? (
                bakers.map((baker) => (
                    <Link to={baker._id} style={{display: 'block'}}>{baker.name}</Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Bakers;
