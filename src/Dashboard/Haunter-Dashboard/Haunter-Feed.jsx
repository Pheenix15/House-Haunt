import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../utilities/formatDate';
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { IoLogoUsd } from "react-icons/io5";
import { IoMap } from "react-icons/io5";
import { useAlert } from '../../Context/AlertContext';
import HouseFilter from '../../Api/House-Filter';
import '../Feed.css'

function HaunterFeed({setLoading}) {

    // FAVORITES
    const [isFavourite, setIsFavourite] = useState({}) // Stores Houses That Are in Favorite
    const [favouriteIds, setFavouriteIds] = useState({}) //Stores Id of Houses that are in Favorite
    const [favorites, setFavorites] = useState([])
    const [totalFavorites, setTotalFavorites] = useState(0)
    // FEEDS
    const [feeds, setFeeds] = useState("houses")
    const [houses, setHouses] = useState([]); //Holds All Approved Houses

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
            const favouriteId = favouriteIds[houseId]
            await axios.delete(`/api/favorites/remove/${favouriteId}`);
            showSuccess("House removed from favourites.")
            } else {
            // Add to favourites
            await axios.post(`/api/favorites/add/${houseId}`);
            showSuccess("House added to favourites.")
            }

            // Refetch the favorites list after success
            await fetchFavorites()

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

    //Remove Favourite
    const removeFav = async (favId) => {
        try {
            await axios.delete(`/api/favorites/remove/${favId}`);
            showSuccess("House removed from favourites.")

            // Refetch the favorites list after success
            const response = await axios.get('/api/favorites');
            setFavorites(response.data.favorites);
            setTotalFavorites(response.data.total_favorites);
        } catch (error) {
            console.log("Failed to remove house:", error);
            showFail("Failed to remove house, please try again")
        }
        
    }

    // RETRIEVE FAVORITES FROM DB
    const fetchFavorites = async () => {
        // setLoading(true) (Causing the page to reload everytime a favorite is added)
        try {
            const favoritesResponse = await axios.get('/api/favorites', {withCredentials: true})
            
            const data = favoritesResponse.data

            setFavorites(Array.isArray(data.favorites) ? data.favorites : [])
            setTotalFavorites(Number(data.total_favorites ?? 0))

            // Initialize isFavourite (for the heart buttons)
            const favMap = {};
            const favMapId = {} // Maps the favs id because of id difference in house and favorites
            
            data.favorites.forEach(fav => {
                //key the id returned by favorite api to id returned by house feed api (favourite:house_id = houses:id in backend, they have the same value but favorite:favorite_id used for fav removal has different value )
                favMap[fav.house_id] = true;
                favMapId[fav.house_id] = fav.favorite_id
            });
            setIsFavourite(favMap);
            setFavouriteIds(favMapId)

            console.log(favMap)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching favorites:', error);

            showFail("'Error fetching favorites:", error)
        } finally {
            // setLoading(false)
        }
    }
    // fetch favorites on app startup
    useEffect(() => {
        fetchFavorites();
    }, [])
    


    //RETRIEVE HAUNTERS FEED FROM DATABASE
    useEffect(() => {
        let mounted = true;
        const fetchFeed = async () => {
            setLoading(true)
            try {
                const feedResponse = await axios.get(`/api/haunter/houses`,);
                console.log(feedResponse.data)

                // assign feedResponse to feeds
                const feedData = feedResponse.data
                // assigns feedData to their states if data is present else leave them empty
                
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
    }, [])

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
                                    <div key={fav.favorite_id} className="house-list-item">
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
                                                        className="remove-from-favourite"
                                                        onClick={() => removeFav(fav.favorite_id)}
                                                    >
                                                        Remove
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