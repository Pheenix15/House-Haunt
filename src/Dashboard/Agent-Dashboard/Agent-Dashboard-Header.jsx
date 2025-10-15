import './Agent-Dashboard-Header.css'


function AgentDashboardHeader() {
    return ( 
        <div className="agent-dashboard-header">
            <div className="dashboard-header-content">
                <div className="greeting">
                    <div className="greating-icon">
                        <img src="../img/icons/user-profile.png" alt="user profile icon" />
                    </div>

                    <div className="user-info">
                        <p className='welcome' >Welcome</p>

                        <p className='username' >Username</p>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboardHeader;