import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate, formatNumber } from '../../utilities/formatDate';
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";
import { IoLogoUsd } from "react-icons/io5";
import { IoMap } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { useAlert } from "../../Context/AlertContext";
import {
    getFiltersFromURL,
    buildQueryParams,
    applySearchFilter,
    applyPriceFilter,
    clearAllFilters,
} from '../../Api/House-Filter';
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
    const [openHouseDetails, setOpenHouseDetails] = useState(false) // Opens the House Details Modal
    const [selectedHouse, setSelectedHouse] = useState(null) //Stores clicked house in House feed
    // FILTERS
    const [openFilter, setOpenFilter] = useState(false) //Opens filter on Mobile
    const [searchInput, setSearchInput] = useState(""); //Search input states while typing
    const [priceInput, setPriceInput] = useState(""); //Price input states while typing
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        maxPrice: null,
    }); //Applied Filters
    const {showSuccess, showFail} = useAlert()

    const location = useLocation();
    const navigate = useNavigate();

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

            // console.log(favMap)
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
    

    // HOUSE FEED AND FILTER

    //Sync appliedFilters from URL on mount
    useEffect(() => {
        const initialFilters = getFiltersFromURL(location.search);
        setAppliedFilters(initialFilters);

        // mirror into input fields
        setSearchInput(initialFilters.search || "");
        setPriceInput(initialFilters.maxPrice ?? "");
    }, [location.search]);

    //Retrieve hunters feed from database
    useEffect(() => {
        let mounted = true;
        const fetchFeed = async () => {
            setLoading(true)
            try {
                const params = buildQueryParams(appliedFilters);
                const feedResponse = await axios.get(`/api/haunter/houses`, {params});
                // console.log(feedResponse.data) for debugging purposes

                // assign feedResponse to feeds
                const feedData = feedResponse.data
                // assigns feedData to their states if data is present else leave them empty
                console.log(feedData)
                setHouses(Array.isArray(feedData.houses) ? feedData.houses : []);
                setTotalResults(Number(feedData.total_results ?? 0));
            } catch (error) {
                if (!mounted) return;
                console.log("Error:", error)
                setTimeout(() => {
                    showFail("Failed to load feed")
                }, 3000);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchFeed();
        return () => {mounted = false};
    }, [appliedFilters]) //Fetch runs whenever appliedFilters changes

    // Opens house details when user clicks on a house
    const handleHouseClick = (house) => {
        setSelectedHouse(house); // save the clicked house
        setOpenHouseDetails(true); // open the modal
    };

    // Search filter button
    const handleApplyFilters = () => {
        let updatedFilters = appliedFilters;

        // apply search (replaces previous search)
        updatedFilters = applySearchFilter(updatedFilters, searchInput);

        // apply price (replaces previous price)
        updatedFilters = applyPriceFilter(updatedFilters, priceInput);

        setAppliedFilters(updatedFilters);

        // sync URL
        const params = new URLSearchParams(buildQueryParams(updatedFilters));
        navigate(`?${params.toString()}`, { replace: true });
    };

    // Filter Count
    const filterCount = (appliedFilters.search !== "" ? 1 : 0) + (appliedFilters.maxPrice !== null ? 1 : 0);

    // Clear filters button
    const handleClearFilters = () => {
        const cleared = clearAllFilters();

        setAppliedFilters(cleared);
        setSearchInput("");
        setPriceInput("");

        // remove query params from URL
        navigate(location.pathname, { replace: true });
    };


    return ( 
        <div className="haunter-feed">

            <div className="haunter-feed-header">
                {/* <div className="feed-heading">
                    <h2>House Feed</h2>
                </div> */}

                {/* Feed Filter */}
                <div className="filter-heading">
                    <div className="filter-heading-text">
                        <p>Filters</p>

                        {filterCount > 0 && (
                            <div className="circle">
                                {filterCount}
                            </div>
                        )}
                        
                        {/* <IoFilterSharp /> */}
                    </div>

                    <div className="filter-dropdown-arrow">
                        <button onClick={() => setOpenFilter(prev => !prev)} >
                            <IoChevronDownSharp />
                        </button>
                        
                    </div>
                </div>

                <div className={openFilter ? "feed-filters filters-open" : "feed-filters"}>

                    <div className="feed-filter-input">
                        <div className="feed-search-filter">
                            <IoMap />
                            
                            <input
                                type="text" 
                                placeholder='search  by location'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                        <div className="feed-price-filter">
                            <IoLogoUsd />

                            <input 
                                type="number" 
                                placeholder='Enter your budget'
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="feed-filter-buttons">
                        <button className="search-filters-btn" onClick={handleApplyFilters}>
                            Search
                        </button>

                        <button className="clear-filters-btn" onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
                    
                </div>
            </div>    
            
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
                                <div key={house.id} className="house-list-item" onClick={() => handleHouseClick(house)} >
                                    <div className="house-list-content">
                                        <div className="house-feed-list-image">
                                            {house.images && house.images.length > 0 ? (
                                                <img src={house.images[0]} alt={house.title} className='house-image' />
                                            ): (
                                                <img src="../../img/icons/broken-image.png" alt="Image not available" className='house-image' />
                                            )}
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
                                                <p className="house-feed-price">₦ {formatNumber(house.price)}</p>
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

                            {/* House Modal */}

                            {/* {openHouseDetails && selectedHouse && (
                                <div className="modal house-list-modal">
                                    <div className="house-list-modal-heading">
                                        <button className="circle" onClick={() => setOpenHouseDetails(false)} ><IoCloseCircle /></button>
                                    </div>

                                    <div className="house-list-modal-details">
                                        <div className="house-list-modal-details-images">
                                            <div className="left-image">
                                                {selectedHouse.images && selectedHouse.images.length > 0 ? (
                                                    <img src={selectedHouse.images[0]} alt={selectedHouse.title} />
                                                ) : (
                                                    <img src="../../img/icons/broken-image.png" alt="Image not available" className='house-image' />
                                                )}
                                                
                                            </div>

                                            <div className="right-images">
                                                <div className="right-images-grid">
                                                    {selectedHouse.images && selectedHouse.images.length > 1 ? (
                                                        // Map only 3 images starting from index 1
                                                        selectedHouse.images.slice(1, 4).map((image, index) => (
                                                            <div className="right-images-grid-image" key={index} >
                                                                <img
                                                                    src={image}
                                                                    alt={`${selectedHouse.title} ${index + 1}`}
                                                                    className="house-image"
                                                                />
                                                            </div>
                                                            
                                                        ))
                                                        ) : (
                                                        <img
                                                            src="../../img/icons/broken-image.png"
                                                            alt="Image not available"
                                                            className="house-image"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="house-list-modal-details-detail">
                                            <div className="house-details">
                                                <div className="main-house-details">
                                                    <div className="main-house-details-left">
                                                        <p className='bold' >{selectedHouse.title}</p>

                                                        <p><IoLocation /> {selectedHouse.location}</p>
                                                    </div>

                                                    <div className="main-house-details-right">
                                                        <p>{formatNumber(selectedHouse.price)}</p>
                                                    </div>
                                                </div>

                                                <div className="house-descriptions">
                                                    <p>{selectedHouse.description}</p>
                                                </div>
                                            </div>

                                            <div className="house-list-modal-agent-details">
                                                <div className="agent-name">
                                                    <p>{selectedHouse.agent_name}</p>
                                                </div>

                                                <div className="contact-agent">
                                                    <button className="contact-agent-button">
                                                        Contact Agent
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )} */}
                        </div>
                    </div>
                )}
                
            </div>

        </div>
     );
}

export default HaunterFeed;