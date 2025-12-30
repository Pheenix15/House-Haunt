import axios from "axios";
import { sendAgentPost } from "../../Api/Agent-Post";
import { useState, useEffect } from "react";
import { formatDate } from '../../utilities/formatDate';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoAlertCircle } from "react-icons/io5";
import "../Agent-post.css"
import { useAlert } from "../../Context/AlertContext";

function Posts({setLoading, loading}) {
    const [posts, setPosts] = useState(null) //AGENTS POSTS
    const [openPostModal, setOpenPostModal] = useState(false) //SET MODAL TO SEND POST
    const [houseImage, setHouseImage] = useState(null) //IMAGE of HOUSE
    const [houses, setHouses] = useState([]) //HOUSES POSTED BY AGENTS
    const [houseName, setHouseName] = useState("") //NAME OF HOUSE
    const [location, setLocation] = useState("") //HOUSE ADDRESS
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const {showSuccess, showFail} = useAlert()

    // RETRIEVE AGENT ID FROM LOCALSTORAGE
    const agentId = localStorage.getItem("id");

    const form = new FormData()

    form.append("agent_id", agentId)
    form.append("title", houseName)
    form.append("image", houseImage)
    form.append("location", location)
    form.append("price", price)
    form.append("description", description,)
    form.append("status", "pending") //initial status of house
    form.append("created_at", new Date().toLocaleString())


    // SEND POSTS TO DATABASE
    const sendPost = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // 
            const postResponse = await sendAgentPost(form);
            showSuccess("Your new listing has been sent")

        } catch (error) {
            console.log(error)
            showFail("An error occured please try again")
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
                                    <img src={house.image_url} alt={house.title} />
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
                                    Reviewed: {formatDate(house.reviewed_at)}
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
                    <div className="modal-heading">
                        <h2>Add new listing</h2>

                        <div className="close-button">
                            <i 
                                className='fa-solid fa-times rotate'
                                style={{
                                    color: "#1a73e8"
                                }}
                                onClick={() => setOpenPostModal(false)}
                            ></i>
                        </div>
                    </div>
                    
                    <div className="modal">
                        <form onSubmit={sendPost} className="add-house-form">
                            <input type="text" name="title" placeholder="Building Name" onChange={(e) => setHouseName(e.target.value)} required />
                            <input type="address" name="location" placeholder="house address" onChange={(e) => setLocation(e.target.value)} required />
                            <input type="number" name="price" placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
                            <input type="text" name="description" placeholder="Describe the house" onChange={(e) => setDescription(e.target.value)} required />
                            {/* Image Input */}
                            <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => {
                                const file = e.target.files[0];
                                // console.log(file)
                                setHouseImage(file)}} />

                            <button type="submit" >{loading ? "Posting..." : "Post"}</button>
                        </form>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Posts;