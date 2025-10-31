import axios from "axios";
import { sendAgentPost } from "../../Api/Agent-Post";
import { useState, useEffect } from "react";

function Posts() {
    const [posts, setPosts] = useState(null) //AGENTS POSTS
    const [openPostModal, setOpenPostModal] = useState(false) //SET MODAL TO SEND POST
    const [houses, setHouses] = useState([]) //HOUSES POSTED BY AGENTS
    const [houseName, setHouseName] = useState("") //NAME OF HOUSE
    const [address, setAddress] = useState("") //HOUSE ADDRESS
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [ownerName, setOwnerName] = useState("") //NAME OF LANDLORD

    const formData = {
        houseName: houseName,
        address,
        price,
        description,
        LandLord: ownerName
    }

    // SEND POSTS TO DATABASE
    const sendPost = async (e) => {
        e.preventDefault();
        try {
            // 
            const postResponse = await sendAgentPost(formData);

            console.log(postResponse)
        } catch (error) {
            console.log(error)
        }
    }

    // FETCH AGENT POSTS
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const housesResponse = await axios.get('/api/agent/houses')
            } catch (error) {

            }
        }
    }, [])

    return ( 
        <div className="posts">

            {/* ADD HOUSE TO DATABASE */}
            <div className="add-house-modal">
                <div className="modal">
                    <form onSubmit={sendPost} className="add-house-form">
                        <input type="text" placeholder="Building Name" onChange={(e) => setHouseName(e.target.value)} />
                        <input type="address" placeholder="house address" onChange={(e) => setAddress(e.target.value)} />
                        <input type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
                        <input type="text" placeholder="Describe the house" onChange={(e) => setDescription(e.target.value)} />
                        <input type="name" placeholder="Landlord name" onChange={(e) => setOwnerName(e.target.value)} />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Posts;