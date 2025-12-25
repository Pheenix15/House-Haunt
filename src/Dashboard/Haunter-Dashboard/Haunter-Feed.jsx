import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Feed.css'
import { formatDate } from '../../utilities/formatDate';
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { IoLogoUsd } from "react-icons/io5";
import { IoMap } from "react-icons/io5";
import { useAlert } from '../../Context/AlertContext';

function HaunterFeed({setLoading}) {

    // FAVORITES
    const [isFavourite, setIsFavourite] = useState({}) // ADDS HOUSE TO FAVOURITE
    const [favorites, setFavorites] = useState([])
    const [totalFavorites, setTotalFavorites] = useState(0)
    // FEEDS
    const [feeds, setFeeds] = useState("houses")
    const [houses, setHouses] = useState([]); //HOLDS ALL APPROVED HOUSES
    const [filters, setFilters] = useState({
        location: "",
        max_price: "",
        min_price: "",
        search: "",
        sort_by: "newest",
    }); //FILTERS HOUSES BY OPTIONS
    const [totalResults, setTotalResults] = useState(0); //HOLDS THE NUMBER OF HOUSES IN FEED
    const {showSuccess, showFail} = useAlert()


    // ADD/REMOVE TO FAVOURITE
    const toggleFavourite = async (houseId) => {
        const isFav = !!isFavourite[houseId];
        
        // Update UI
        setIsFavourite(prev => ({
        ...prev,
        [houseId]: !isFav,
        }));

        try {
            if (isFav) {
            // Remove from favourites
            await axios.post(`/api/favorites/remove/${houseId}`);
            showSuccess("House removed from favourites.")
            } else {
            // Add to favourites
            await axios.post(`/api/favorites/add/${houseId}`);
            showSuccess("House added to favourites.")
            }

            // Refetch the favorites list after success
            const response = await axios.get('/api/haunter/favorites');
            setFavorites(response.data.favorites);
            setTotalFavorites(response.data.total_favorites);

            
        } catch (error) {
            // rollback on failure
            setIsFavourite(prev => ({
            ...prev,
            [houseId]: isFav,
            }));
            console.log("Favourite toggle failed:", error);
            showFail("An error occuored, please try again later")
        }
    };

    // RETRIEVE FAVORITES FROM DB
    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true)
            try {
                const favoritesResponse = await axios.get('/api/favorites', {withCredentials: true})
                
                const data = favoritesResponse.data

                setFavorites(Array.isArray(data.favorites) ? data.favorites : [])
                setTotalFavorites(Number(data.total_favorites ?? 0))

                // Initialize isFavourite (for the heart buttons)
                const favMap = {};
                data.favorites.forEach(fav => {
                    favMap[fav.id] = true;
                });
                setIsFavourite(favMap);

                console.log(totalFavorites)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching favorites:', error);

                showFail("'Error fetching favorites:", error)
            } finally {
                setLoading(false)
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
            
            {/* Search bar Filters */}
            {/* <div className="filters-container">
                {filters && (
                    <div className="feed-filters">
                        <div className="feed-filter">
                            <IoMap />
                            <input
                                type="search"
                                id="location"
                                name="location"
                                placeholder= {filters.location || "type a location"}
                                value={filters.location}
                                onChange={e => handleFilterChange("location", e.target.value)}
                                className="filter-input location-filter-input"
                            />
                        </div>
                        

                        <div className="feed-filter">
                            <IoLogoUsd />
                            <input
                                type="search"
                                id="price"
                                name="price"
                                placeholder= {filters.max_price || "search by price"}
                                value={filters.max_price}
                                onChange={e => handleFilterChange("max_price", Number(e.target.value))}
                                className="filter-input price-filter-input"
                            />
                        </div>
                        

                        
                    
                    </div>
                )}
            </div> */}
            
            
            {/* House Feeds */}
            <div className="house-feed-container">
                <div className="feed-selector">
                    <button 
                        className={feeds === "houses" ? "feed-selector-button active-feed" : "feed-selector-button"} 
                        onClick={()=> setFeeds("houses")}
                        type="button" 
                    >
                        Available Houses
                    </button>
                    <button 
                        className={feeds === "favourites" ? "feed-selector-button active-feed" : "feed-selector-button"} 
                        onClick={()=> setFeeds("favourites")}
                        type="button" 
                    >
                        Favourites
                    </button>
                </div>

                {feeds === "favourites" ? (
                    // Favourite Feed
                    <div className="house-feed">
                        <div className="favorites-header">
                            <p>{totalFavorites} house(s)</p>
                        </div>
                        <div className="favorites house-feed-list">
                            {favorites.length === 0 ? (
                                <p>You have not added any favorites</p>
                            ) : (
                                favorites.map((fav) => (
                                    <div key={fav.id} className="house-list-item">
                                        <div className="house-list-content">
                                            <div className="house-feed-list-image">
                                                <img src={fav.image_url} alt={fav.title} className="house-image" />
                                            </div>
                                            
                                            <div className="house-feed-list-details">
                                                <div className="feed-details-top">
                                                    <p className="date-added">
                                                        {/* {formatDate(fav.created_at)} */}
                                                    </p>
                                                </div>

                                                <div className="feed-details-heading">
                                                    <h3 className="house-feed-title">{fav.title}</h3>
                                                </div>
                                                
                                                <div className="feed-details-description">
                                                    <p className="house-feed-details">{fav.description}</p>
                                                    <p className="house-feed-location">{fav.location}</p>
                                                    <p className="house-feed-price">₦ {fav.price}</p>
                                                </div>

                                                <div className="feed-details-buttom">
                                                    <button 
                                                        className="add-to-favourite"
                                                        onClick={() => toggleFavourite(fav.id)}
                                                    >
                                                        {isFavourite[fav.id] ? <HiMiniHeart className='heart' /> : <HiOutlineHeart className='heart' />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="house-list-agent">
                                            <p className="house-feed-agent"></p>
                                        </div>
                                    </div>
                                ))
                            )}
                            
                        </div>
                    </div>
                ) : (
                    // House Feed
                    <div className="house-feed">
                        <div className="house-feed-header">
                            <div className="no-of-houses">
                                {houses.length === 0 ? (
                                    <p>0 houses available</p>
                                ) : (
                                    <p>{houses.length} house(s) available</p>
                                )}
                                
                            </div>
                            
                            {/* Filter by Date added */}
                            {/* <div className="filter-dropdown">
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
                            </div> */}
                        </div>

                        <div className="house-feed-list">
                            {houses.length === 0 ? (
                                <p>No houses available</p>
                            ) : (
                                houses.map((house) => (
                                <div key={house.id} className="house-list-item">
                                    <div className="house-list-content">
                                        <div className="house-feed-list-image">
                                            <img src={house.image_url} alt={house.title} className="house-image" />
                                        </div>
                                        
                                        <div className="house-feed-list-details">
                                            <div className="feed-details-top">
                                                <p className="date-added">
                                                    {formatDate(house.created_at)}
                                                </p>
                                            </div>

                                            <div className="feed-details-heading">
                                                <h3 className="house-feed-title">{house.title}</h3>
                                            </div>
                                            
                                            <div className="feed-details-description">
                                                <p className="house-feed-details">{house.description}</p>
                                                <p className="house-feed-location">{house.location}</p>
                                                <p className="house-feed-price">₦ {house.price}</p>
                                            </div>

                                            <div className="feed-details-buttom">
                                                <button 
                                                    className="add-to-favourite"
                                                    onClick={() => toggleFavourite(house.id)}
                                                >
                                                    {isFavourite[house.id] ? <HiMiniHeart className='heart' /> : <HiOutlineHeart className='heart' />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="house-list-agent">
                                        <p className="house-feed-agent">added by {house.agent_name}</p>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
                
            </div>

        </div>
     );
}

export default HaunterFeed;