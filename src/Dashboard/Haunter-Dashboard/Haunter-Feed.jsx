import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Feed.css'

function HaunterFeed() {

    const [loading, setLoading] = useState(false); //LOADING STATE
    // FAVORITES
    const [favorites, setFavorites] = useState([])
    const [totalFavorites, setTotalFavorites] = useState(0)
    // FEEDS
    const [houses, setHouses] = useState([]); //HOLDS ALL APPROVED HOUSES
    const [filters, setFilters] = useState({
        location: "",
        max_price: "",
        min_price: "",
        search: "",
        sort_by: "newest",
    }); //FILTERS HOUSES BY OPTIONS
    const [totalResults, setTotalResults] = useState(0); //HOLDS THE NUMBER OF HOUSES IN FEED
    const [failAlert, setFailAlert] = useState(""); //CONTAINS ERROR MESSAGES

    // RETRIEVE FAVORITES FROM DB
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesResponse = await axios.get('/api/haunter/favorites')

                const data = favoritesResponse.data

                setFavorites(Array.isArray(data.favorites) ? data.favorites : [])
                setTotalFavorites(Number(data.total_favorites ?? 0))
                console.log(totalFavorites)
            } catch (error) {
                console.error('Error fetching favorites:', err);
            }
        }

        fetchFavorites()
    }, [])
    
    //RETRIEVE HAUNTERS FEED FROM DATABASE
    useEffect(() => {
        let mounted = true;
        const fetchFeed = async () => {
            setLoading(true)
            try {
                const feedResponse = await axios.get(`/api/haunter/houses`, {
                    params: {
                        location: filters.location || "",
                        max_price: filters.max_price || "",
                        min_price: filters.min_price || "",
                        search: filters.search || "",
                        sort_by: filters.sort_by || "newest",
                    }
                });
                console.log(feedResponse.data)

                // assign feedResponse to feeds
                const feedData = feedResponse.data
                // assigns feedData to their states if data is present else leave them empty
                // setFilters(feedData.filters ?? {})
                setHouses(Array.isArray(feedData.houses) ? feedData.houses : []);
                setTotalResults(Number(feedData.total_results ?? 0));
            } catch (error) {
                if (!mounted) return;
                console.log("Error:", error)
                setTimeout(() => {
                    setFailAlert("Failed to load feed")
                }, 3000);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchFeed();
        return () => {mounted = false};
    }, [filters])

    const handleFilterChange = (key, value) => {
        setFilters(prev => {
            if (prev[key] === value) return prev; // no change
            return { ...prev, [key]: value }; // update only if changed
        });
    };


    return ( 
        <div className="haunter-feed">
            {loading && (
                <p>Loading</p>
            )}

            <section className="favorite-section">
                <div className="favorites-container">
                    <div className="favorites-header">
                        <h3>Favorites ({totalFavorites})</h3>
                    </div>
                    <div className="favorites">
                        {favorites.length === 0 ? (
                            <p>You have no favorites</p>
                        ) : (
                            favorites.map((fav, index) => (
                                <div key={fav.id} className="favorite-list">
                                    <h4>{fav.title}</h4>
                                    <p>{fav.location}</p>
                                    <p>₦{fav.price}</p>
                                </div>
                            ))
                        )}
                        
                    </div>
                </div>
            </section>

            <section className="feeds-section">
                <div className="feeds-container">
                    {/* SEARCH BAR FILTERS */}
                    <div className="filters-container">
                        {filters && (
                            <div className="feed-filters">
                                <input
                                    type="search"
                                    id="location"
                                    name="location"
                                    placeholder="search by location"
                                    value={filters.location}
                                    onChange={e => handleFilterChange("location", e.target.value)}
                                    className="filter-input"
                                />

                                {/* SSearch Bar */}
                                <input
                                    type="search"
                                    id="search"
                                    name="search"
                                    placeholder="Search houses..."
                                    value={filters.search}
                                    onChange={e => handleFilterChange("search", e.target.value)}
                                    className="filter-input"
                                />
                            <small>Showing: {filters.search || "all"}</small>
                            <small>Sort: {filters.location || "default"}</small>
                            </div>
                        )}
                    </div>
                    
                    {/* PRICE FILTER */}
                    <div className="price-filter">
                        {/* Max-price */}
                        <label htmlFor="max_price" className="price-filter-label">Max Price:</label>
                        <input
                            type="range"
                            id="max_price"
                            name="max_price"
                            value={filters.max_price || 0}
                            min={filters.min_price || 100000}
                            max={filters.max_price}
                            step= "10000"
                            onChange={e => handleFilterChange("max_price", Number(e.target.value))}
                            className="filter-input"
                        />
                        {/* Min-price */}
                        {/* <label htmlFor="min_price" className="filter-label">Min Price:</label>
                        <input
                            type="number"
                            id="min_price"
                            name="min_price"
                            placeholder="Enter min price"
                            value={filters.min_price}
                            onChange={e => handleFilterChange("min_price", e.target.value)}
                            className="filter-input"
                        /> */}
                    </div>

                    <div className="house-feed-container">
                        <div className="house-feed-header">
                            <div className="no-of-houses">
                                <p>{totalResults} houses available</p>
                            </div>

                            <div className="filter-dropdown">
                                <label htmlFor="sort_by" className="filter-label"><i className="fa-solid fa-filter"></i></label>
                                <select
                                    id="sort_by"
                                    name="sort_by"
                                    value={filters.sort_by}
                                    onChange={e => handleFilterChange("sort_by", e.target.value)}
                                    className="filter-dropdown-input"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                        </div>

                        <div className="house-feed-list">
                            {houses.length === 0 ? (
                                <p>No houses available</p>
                            ) : (
                                houses.map((house) => (
                                <div key={house.id} className="house-item">
                                    <img src={house.image_url} alt={house.title} className="house-image" />
                                    <div className="house-details">
                                    <h3 className="house-title">{house.title}</h3>
                                    <p className="house-location">{house.location}</p>
                                    <p className="house-price">${house.price}</p>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
     );
}

export default HaunterFeed;