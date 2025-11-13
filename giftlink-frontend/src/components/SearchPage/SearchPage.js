import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = async () => {
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: document.getElementById('categorySelect').value,
            condition: document.getElementById('conditionSelect').value,
        }).toString();

        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/search?${queryParams}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="search-page-container">
            <div className="filter-bar">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <select id="categorySelect" className="form-control filter-select">
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select id="conditionSelect" className="form-control filter-select">
                    <option value="">All Conditions</option>
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
                <label className="age-label">Max Age: {ageRange} yrs</label>
                <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="10"
                    value={ageRange}
                    onChange={e => setAgeRange(e.target.value)}
                />
                <button className="btn btn-primary search-btn" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="search-results-container">
                {searchResults.length > 0 ? (
                    searchResults.map(product => (
                        <div key={product.id} className="card mb-2 result-card">
                            {product.image && <img src={product.image} alt={product.name} className="card-img-top" />}
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description.slice(0, 80)}...</p>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => goToDetailsPage(product.id)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">
                        No products found. Please revise your filters.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
