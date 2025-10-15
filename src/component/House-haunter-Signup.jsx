import { useEffect } from "react";
import { uploadKyc } from "../kyc-api";
import { testConnection, API_BASE } from "../api";

function HaunterSignup() {
    useEffect(() => {
        testConnection();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("full_name", e.target.full_name.value);
        formData.append("id_document", e.target.id_document.files[0]);

        await uploadKyc(formData);
    };

    return ( 
        <div className="haunter-signup">
            <form onSubmit={handleSubmit}>
                <input type="text" name="full_name" placeholder="Full Name" required />
                <input type="file" name="id_document" required />
                <button type="submit">Upload KYC</button>
            </form>
            HOUSE HAUNTER PAGE
        </div>
    );
}

export default HaunterSignup;