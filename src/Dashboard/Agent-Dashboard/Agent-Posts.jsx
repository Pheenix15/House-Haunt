import axios from "axios";
import { sendAgentPost } from "../../Api/Agent-Post";
import { useState, useEffect } from "react";
import "../Agent-post.css"

function Posts({setLoading, loading}) {
    const [posts, setPosts] = useState(null) //AGENTS POSTS
    const [openPostModal, setOpenPostModal] = useState(false) //SET MODAL TO SEND POST
    const [houseImage, setHouseImage] = useState(null) //IMAGE of HOUSE
    const [houses, setHouses] = useState([]) //HOUSES POSTED BY AGENTS
    const [houseName, setHouseName] = useState("") //NAME OF HOUSE
    const [location, setLocation] = useState("") //HOUSE ADDRESS
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")

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

            console.log(postResponse)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // FETCH AGENT POSTS
    useEffect(() => {
        setLoading(true)
        const fetchPost = async () => {
            try {
                const housesResponse = await axios.get('/api/dashboard/agent')

                console.log(housesResponse.data)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }

        fetchPost();
    }, [])

    return ( 
        <div className="posts">
            <div className="admin-posts">
                <div className="admin-posts-heading">
                    <h2>Your Listings</h2>

                    <div className="add-house">
                        <button 
                            className="add-house-button button"
                            onClick={() => setOpenPostModal(true)}
                        >Add new Listing</button>
                    </div>
                </div>
            </div>

            {/* ADD HOUSE TO DATABASE */}
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
                            <input type="text" name="title" placeholder="Building Name" onChange={(e) => setHouseName(e.target.value)} />
                            <input type="address" name="location" placeholder="house address" onChange={(e) => setLocation(e.target.value)} />
                            <input type="number" name="price" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
                            <input type="text" name="description" placeholder="Describe the house" onChange={(e) => setDescription(e.target.value)} />
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