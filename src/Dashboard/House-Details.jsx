import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Loading from "../component/Loading";
import { useAuth } from "../component/AuthContext";
import { formatNumber } from "../utilities/formatDate";
import { IoLocation } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { contactAgent } from "../Api/Contact-Agent";
import { useAlert } from "../Context/AlertContext";
import './House-Details.css'


function HouseDetails() {
    const { houseId } = useParams();
    const [houseDetail, setHouseDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [viewAllImage, setViewAllImage] = useState(false) //Opens all Images Modal
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigate = useNavigate()
    const {showSuccess, showFail} = useAlert()

    const {user} = useAuth() //Retrieves the users role

    // console.log(user.role)

    // Fetch house by Id
    useEffect(() => {
        const fetchHouse = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`/api/haunter/houses`)

                const filterById = response.data.houses.find(
                    (house) => String(house.id) === String(houseId) 
                );

                setHouseDetail(filterById)

                console.log(filterById)
            } catch (error) {
                console.error("Failed to fetch house:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchHouse()
    }, [houseId])

    // Navigate To House Feed/Agent Post
    const handleReturn = () => {
        if (user.role === 'agent') {
            navigate('/Dashboard-Agent')
        } else {
            navigate('/Dashboard-Haunter')
        }
    }

    // Send Contact Request
    const sendContactRequest = async (houseId) => {
        try {
            await contactAgent(houseId)
            // Error Here
            showSuccess(contactRequest.message)
        } catch (error) {
            showFail(error)
        }
        
    }

    if (loading) return (
        <>
            <Loading />
        </>
    )

    return ( 
        <div className="house-details-page">
            <div className="house-details-container">

                <div className="return-button">
                    <button onClick={() => handleReturn()} >Return to Feed</button>
                </div>

                {houseDetail && (
                    <div className="house-details">
                        {/* House Images */}
                        <div className="house-details-image">
                            <div className="details-main-image">
                                {houseDetail.images && houseDetail.images.length > 0 ? (
                                    <img src={houseDetail.images[0]} alt={houseDetail.title} />
                                ) : (
                                    <img src="../../img/icons/broken-image.png" alt="Image not available" className='house-image' />
                                )}

                                {/* <img src={houseDetail.images[0]} alt={houseDetail.title} /> */}
                            </div>

                            <div className="details-secondary-image">
                                {houseDetail.images && houseDetail.images.length > 1 ? (
                                    // Map only 2 images starting from index 1
                                    houseDetail.images.slice(1, 3).map((image, index) => (
                                        <div className="secondry-image-box" key={index} >
                                            <img
                                                src={image}
                                                alt={`${houseDetail.title} ${index + 1}`}
                                            />
                                        </div>
                                        
                                    ))
                                    ) : (
                                    <img
                                        src="../../img/icons/broken-image.png"
                                        alt="Image not available"
                                    />
                                )}
                            </div>

                            <div className="image-overlay-button">
                                {houseDetail.images.length > 3 && (
                                    <button 
                                        className="see-all-images"
                                        onClick={() => setViewAllImage(true)}
                                    >
                                        +{houseDetail.images.length - 3} more
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="house-details-content">
                            <div className="details-main-description">
                                <div className="main-description-top">
                                    <div className="title-and-location">
                                        <p className="main-description-title" >{houseDetail.title}</p>

                                        <p className="main-description-location">
                                            <IoLocation /> {houseDetail.location}
                                        </p>
                                    </div>

                                    <div className="price">
                                        <p>Price</p>
                                        <p className="main-description-price" >₦ {formatNumber(houseDetail.price)}</p>
                                    </div>
                                </div>

                                <div className="main-description-body">
                                    <p className="description-body-heading" >Description</p>

                                    <p>{houseDetail.description}</p>
                                </div>
                            </div>
                            
                            {/* Agent Description */}
                            <div className="agent-description">
                                <p className="agent-name">
                                    {houseDetail.agent_name}
                                </p>

                                <button 
                                    className="contact-agent-button"
                                    onClick={() => sendContactRequest(houseDetail.id)}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {viewAllImage && (
                <div className="all-images-modal">
                    <div className="close-modal-button">
                        <button 
                            className="button close-button"
                            onClick={() => {setViewAllImage(false), setThumbsSwiper(null)}}
                        >
                            <IoClose />
                        </button>
                    </div>

                    <div className="imgaes-carousal">
                        <Swiper
                            loop={true}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            spaceBetween={10}
                            className='mainSwiper'
                        >
                            {houseDetail.images && (
                                houseDetail.images.map((image, index) => (
                                    <SwiperSlide className="mySwiper-image"
                                        key={index}
                                    >
                                        <img src={image} alt="Testing" />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>

                        {/* Thumbnail Swiper */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={6}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="thumbnailSwiper"
                        >
                            {houseDetail.images && (
                                houseDetail.images.map((image, index) => (
                                    <SwiperSlide className="mySwiper-thumbnail-image"
                                        key={index}
                                    >
                                        <img src={image} alt='' />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HouseDetails;