import axios from "axios";
import { sendAgentPost } from "../../Api/Agent-Post";
import { useState, useEffect } from "react";
import { Country, State, City }  from 'country-state-city';
import { formatDate } from '../../utilities/formatDate';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoAlertCircle } from "react-icons/io5";
import "../Agent-post.css"
import { useAlert } from "../../Context/AlertContext";

function Posts({setLoading, loading}) {
    const [allState, setAllState] = useState([])
    const [selectedState, setSelectedState] = useState("")
    const [stateCode, setStateCode] = useState("")
    const [allCities, setAllCities] = useState([])
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedImages, setSelectedImages] = useState([]) //IMAGES SELECTED IN ADD HOUSE MODAL
    // const [posts, setPosts] = useState(null) //AGENTS POSTS
    const [openPostModal, setOpenPostModal] = useState(false) //SET MODAL TO SEND POST
    const [houseImage, setHouseImage] = useState([]) //IMAGE of HOUSE
    const [houses, setHouses] = useState([]) //HOUSES POSTED BY AGENTS
    const [houseName, setHouseName] = useState("") //NAME OF HOUSE
    const [location, setLocation] = useState("") //HOUSE ADDRESS
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const {showSuccess, showFail} = useAlert()

    // RETRIEVE AGENT ID FROM LOCALSTORAGE
    const agentId = localStorage.getItem("id");

    // // RETRIEVE ALL STATES AND THEIR CITIES
    // useEffect(() => {
    //     const statelist = State.getStatesOfCountry("NG")
    //     setAllState(statelist)
    //     // console.log(allState)
    // }, [])
    

    // useEffect(() => {
    //     if (!stateCode) {
    //         setAllCities([]);
    //         return
    //     }

    //     setAllCities(City.getCitiesOfState("NG", stateCode))
    // }, [stateCode])

    // // Checks that all values are correct
    // useEffect(() => {
    //     console.log("State code:", selectedState);
    //     console.log("Cities:", selectedCity);
    // }, [selectedState, selectedCity]);


    // // Reset city when state changes
    // useEffect(() => {
    //     setSelectedCity("");
    // }, [stateCode])
    


    const form = new FormData()

    form.append("agent_id", agentId)
    form.append("title", houseName)
    houseImage.forEach((file) => {
        form.append("images", file);
    });
    form.append("location", location)
    form.append("price", price)
    form.append("description", description,)
    form.append("status", "pending") //initial status of house
    form.append("created_at", new Date().toLocaleString())


    // SEND POSTS TO DATABASE
    const sendPost = async (e) => {
        e.preventDefault();

        // Enforces min of 3 images
        
        //!!!important test this before doing anything else.........!
        if (!houseImage || houseImage.length < 3) {
            showFail("Please select at least 3 images.");
            return;
        }

        setLoading(true)
        try {
            // 
            const postResponse = await sendAgentPost(form);
            console.log("Post Response:", postResponse)
            setHouseImage([]) //Reset house images
            showSuccess("Your new listing has been sent")

        } catch (error) {
            console.log(error)
            showFail(error.message)
        } finally {
            setLoading(false)
            setOpenPostModal(false)
        }
    }

    // FETCH AGENT POSTS
    useEffect(() => {
        setLoading(true)
        const fetchPost = async () => {
            try {
                const housesResponse = await axios.get('/api/dashboard/agent')

                const houseData = housesResponse.data.houses

                setHouses(houseData)
                console.log(houses.image_path)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }

        fetchPost();
    }, [])

    return ( 
        <div className="posts">
            <div className="agent-posts">
                <div className="agent-posts-heading">
                    <h2>Your Listings</h2>

                    <div className="add-house">
                        <button 
                            className="add-house-button button"
                            onClick={() => setOpenPostModal(true)}
                        >Add new Listing</button>
                    </div>
                </div>

                <div className="agents-houses">
                    {houses.map((house) => (
                        <div
                         key={house._id}
                         className="agent-house"
                        >
                            <div className="agent-house-top">
                                <p className="added-at">
                                    {formatDate(house.created_at)}
                                </p>
                            </div>
                            <div className="agent-house-body">
                                <div className="agent-house-image">
                                    {house.images && house.images.length > 0 ? (
                                        <img src={house.images[0]} alt={house.title} />
                                    ): (
                                        <img src="../../img/icons/broken-image.png" alt="Image not available" />
                                    )}
                                    
                                </div>

                                <div className="agent-house-details">
                                    <div className="agent-house-title">
                                        <h3>{house.title}</h3>
                                    </div>

                                    <div className="agent-house-info">
                                        <p className="agent-house-description">{house.description}</p>
                                        <p className="agent-house-location"><span className="bold">Location:</span> {house.location}</p>
                                    </div>

                                    <div className="agent-house-price">
                                        <p><span className="bold">Price:</span> ₦{house.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="agent-house-bottom">
                                <p className="reviewed-at">
                                    {house.reviewed_at ? `Reviewed: ${formatDate(house.reviewed_at)}` : " "}
                                    
                                </p>

                                <div className="house-status" 
                                    style={{
                                        color: house.status === 'rejected' ? "#bc0808" : house.status === 'approved' ? "#0d47a1" : "#1f1f1f"
                                    }}
                                >
                                    <div className="review-circle">
                                        {house.status === "approved" ? <IoCheckmarkCircleSharp /> : <IoAlertCircle />}
                                    </div>
                                    <p className="agent-house-status">
                                        {house.status}
                                    </p>
                                </div>

                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL TO ADD HOUSE TO DATABASE */}
            {openPostModal && (
                <div className="add-house-modal">
                    <div className="modal-heading add-house-modal-heading">
                        <h2>Add new listing</h2>

                        <div className="close-button">
                            <i 
                                className='fa-solid fa-times rotate'
                                style={{
                                    color: "#1a73e8"
                                }}
                                onClick={() => {setOpenPostModal(false); setHouseImage([])}}
                            ></i>
                        </div>
                    </div>
    
                    <div className="modal-form">
                        <form onSubmit={sendPost} className="add-house-form">
                            <div className="form-input">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" placeholder="Title of the Listing" onChange={(e) => setHouseName(e.target.value)} required />
                            </div>
                            
                            {/* <div className="location-select">  
                                <input list="states" 
                                    name="state"
                                    value={selectedState}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);

                                        // Match dropdown list to input value
                                        const match = allState.find(
                                            // s = state
                                            (s) => s.name.toLowerCase() === e.target.value.toLowerCase()
                                        );

                                        setStateCode(match ? match.isoCode : "")
                                        console.log("Clicked/Typed State:", e.target.value)
                                    }}
                                    required
                                />

                                <datalist id="states">
                                    {allState.map((state) => (
                                        <option
                                        key={state.isoCode}
                                        value={state.name}
                                        />
                                    ))}
                                </datalist>
                                
                                <input list="cities" 
                                    name="cities"
                                    value={selectedCity}
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);

                                        console.log("Selected City:", e.target.value)
                                    }}
                                    disabled={!stateCode}
                                    required
                                />

                                <datalist id="cities">
                                    {allCities.map((city, index) => (
                                        <option
                                        key={`${city.name}-${index}`}
                                        value={city.name}
                                        />
                                    ))}
                                </datalist>
                                
                            </div> */}
                            <div className="form-input">
                                <label htmlFor="location">Address</label>
                                <input type="address" name="location" placeholder="eg. 22, Omotayo Ojo Street, Ikeja, Lagos" onChange={(e) => setLocation(e.target.value)} required />
                            </div>

                            <div className="form-input">
                                <label htmlFor="price">Price</label>
                                <input type="number" name="price" placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
                            </div>

                            <div className="form-input">
                                <label htmlFor="description">Describe the house</label>
                                <input type="text" name="description" placeholder="Describe the house" onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            {/* Image Input */}
                            <div className="form-input">
                                <label htmlFor="images">Images</label>
                                <input type="file" 
                                    name="images" 
                                    accept="image/png, image/jpeg" 
                                    multiple 
                                    onChange={(e) => {
                                        const newFile = Array.from(e.target.files);
                                        if (newFile.length === 0) return;
                                        setHouseImage((prev) => [...prev, ...newFile]);

                                        e.target.value = null //Resets file input
                                    }}
                                />
                                {houseImage.length === 0 ? (<></>) : (
                                    <p className="tiny" >{houseImage.length} image(s) selected</p>
                                )}
                            </div>

                            <button type="submit" >{loading ? "Posting..." : "Post"}</button>
                        </form>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Posts;