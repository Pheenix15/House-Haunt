import axios from "axios";

export const contactAgent = async (houseId) => {
    try {
        const sendRequest = await axios.post( `/api/haunter/contact-agent/${houseId}`)
        console.log(sendRequest.data)
        const contactRequest = sendRequest.data

        return contactRequest
    } catch (error) {
        console.log(error)

        let message = error.message
        throw new Error(message)
    }
}