import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import './Chat.css'

function Chat() {
    const [chats, setChats] = useState([]) //Stors all chats
    const [selectedChat, setSelectedChat] = useState(null) //Stores currently selected chat
    const [message, setmessage] = useState('') //Stores users input from message bar
    const {user} = useAuth() //Get current user info

    console.log('Current User in Chat:', user.role)
    let allChats = [] //Temporary variable to store fetched chats

    useEffect(() => {
        const getChats = async () => {
            const chatRsponse = await axios.get('api/agent/chats')
            console.log('Fetched Chats:', chatRsponse.data.chats)

            allChats = chatRsponse.data.chats //Store fetched chats in temporary variable 
            setChats(allChats) //Set state with fetched chats
        }
        
        getChats()
    }, [])

    return (
        <div className="chat-section">
            <div className="chat-contact-section">
                {chats && chats.length === 0 ? (
                    //Check Users Role
                    user.role === 'agent' ? (
                        // No Chats for Agent
                        <div className="no-content">
                            <p>Chat will activate when you accept a request from a house hunter</p>
                        </div>
                        
                    ) : (
                        <div className="no-content">
                             <p>Chat will activate when an agent accepts yoir request</p>
                        </div>
                       
                    )
                ) : (
                    // All Chats
                    chats.map((chat) => (
                        <div key={chat.id} className="chat-contact-item">
                            
                        </div>
                    ))
                )}
            </div>
            {/* MESSAGE SECTION */}
            <div className="chat-message-section">
                {/* This outer div has a purpose do not remove */}
                {chats && chats.length === 0 ? (
                    <div className="no-content">
                        <h2>No active chats</h2>
                    </div>
                    
                ) : (
                    selectedChat === null ? (
                        <div className="no-content">
                            <h2>Select a chat to start messaging</h2>
                        </div>
                        
                    ) : (
                        <div className="chat-message-container">
                            <div className="chat-messages">

                            </div>

                            <div className="chat-input">
                                <input type="text" 
                                    placeholder='start typing...' 
                                    value={message} 
                                    onChange={(e) => setmessage(e.target.value)} 
                                    required
                                    disabled={selectedChat === null}
                                />

                            </div>
                        </div>
                    )
                )}
                
            </div>
        </div>
    );
}

export default Chat;