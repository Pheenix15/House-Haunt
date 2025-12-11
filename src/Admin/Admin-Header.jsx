import { HiBell } from "react-icons/hi2";
import "./Admin-Header.css"

function AdminHeader() {
    return ( 
        <div className="admin-header">
            <div className="admin-header-logo">
                <img src="../img/HouseHaunt-logo.png" alt="house hunt logo" />
            </div>

            <div className="admin-header-left">
                {/* <div className="admin-notification-bell">
                    <HiBell className="notification-bell" />
                </div> */}

                {/* Admin Profile Image */}
                {/* <div className="admin-profile-details">
                    <img src="../img/users/profile-2.png" alt="Admin-image" />
                    <div className="admin-profile-info">
                        <p>Admin Name</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default AdminHeader;