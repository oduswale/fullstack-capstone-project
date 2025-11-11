import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../urlConfig'; // adjust path if needed

export default function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    // Task 1: Fetch all gifts
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`);
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };
        fetchGifts();
    }, []);

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // convert seconds to ms
        return date.toLocaleDateString('default', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Task 2: Navigate to details page
    const goToDetails = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container my-4">
            <h1 className="mb-4">Available Gifts</h1>
            <div className="row">
                {gifts.length > 0 ? (
                    gifts.map((gift) => (
                        <div className="col-md-4 mb-4" key={gift._id}>
                            <div className="card h-100" onClick={() => goToDetails(gift._id)} style={{ cursor: 'pointer' }}>
                                
                                {/* Task 4: Display gift image or placeholder */}
                                <div className="image-placeholder">
                                    {gift.image ? (
                                        <img src={gift.image} alt={gift.name} className="card-img-top" />
                                    ) : (
                                        <div className="no-image-available">No Image Available</div>
                                    )}
                                </div>

                                <div className="card-body">
                                    {/* Task 5: Display gift name */}
                                    <h5 className="card-title">{gift.name}</h5>
                                    {/* Task 6: Display formatted date */}
                                    <p className="card-text">{formatDate(gift.date_added)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No gifts available at the moment.</p>
                )}
            </div>
        </div>
    );
}
