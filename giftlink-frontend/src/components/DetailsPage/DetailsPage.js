import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import { urlConfig } from '../../config';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch gift details
        const fetchGift = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${productId}`);
                if (!response.ok) throw new Error('Failed to fetch gift');
                const data = await response.json();
                setGift(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();
        window.scrollTo(0, 0);
    }, [productId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading gift details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;

    return (
        <div className="container mt-5" style={{ maxHeight: '90vh', overflowY: 'auto', paddingBottom: '2rem' }}>
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
                Back
            </button>

            <div className="card product-details-card mb-4">
                <div className="card-header text-white">
                    <h2 className="details-title">{gift.name}</h2>
                </div>
                <div className="card-body">
                    <div
                        className="image-placeholder-large mb-3"
                        style={{ height: '400px', backgroundColor: '#f0f0f0' }}
                    >
                        {gift.image ? (
                            <img
                                src={gift.image.startsWith('http') ? gift.image : `${urlConfig.backendUrl}${gift.image}`}
                                alt={gift.name}
                                className="img-fluid h-100 w-100"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                }}
                            />
                        ) : (
                            <div className="no-image-available-large d-flex align-items-center justify-content-center h-100 text-muted">
                                No Image Available
                            </div>
                        )}
                    </div>

                    <p><strong>Category:</strong> {gift.category}</p>
                    <p><strong>Condition:</strong> {gift.condition}</p>
                    <p><strong>Date Added:</strong> {new Date(gift.date_added * 1000).toLocaleDateString()}</p>
                    <p><strong>Age (Years):</strong> {gift.age_years}</p>
                    <p><strong>Description:</strong> {gift.description}</p>
                </div>
            </div>

            <div className="comments-section mt-4">
                <h3 className="mb-3">Comments</h3>
                {[
                    { author: "John Doe", comment: "I would like this!" },
                    { author: "Jane Smith", comment: "Just DMed you." },
                    { author: "Alice Johnson", comment: "I will take it if it's still available." },
                    { author: "Mike Brown", comment: "This is a good one!" },
                    { author: "Sarah Wilson", comment: "My family can use one. DM me if it is still available. Thank you!" }
                ].map((comment, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <p className="comment-author"><strong>{comment.author}:</strong></p>
                            <p className="comment-text">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailsPage;
