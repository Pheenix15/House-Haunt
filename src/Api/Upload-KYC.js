import axios from "axios";

export const uploadKYC = async (KYCData) => {
    console.log("KYC Data:", KYCData);
    try {
        const response = await axios.post('/api/kyc/upload', KYCData)

        const KYCResponse = response.data

        return KYCResponse
    } catch (error) {
        // let message = error.message

        console.log(error)
        // throw new Error(message)
    }
}

// Continue from Here. What is KYC expecting? Don't Forget to desable on Desktop/Laptop Devices