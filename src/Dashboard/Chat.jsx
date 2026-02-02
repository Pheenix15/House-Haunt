import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client'
import { IoSend } from "react-icons/io5";
import { useAuth } from '../Context/AuthContext';
import './Chat.css'

// Initialize Socket.io

function Chat() {
    const [chats, setChats] = useState([]) //Stors all chats
    const [selectedChat, setSelectedChat] = useState(null) //Stores currently selected chat
    const [chatMessages, setChatMessages] = useState([]) //Stores messages of selected chat
    const [message, setmessage] = useState('') //Stores users input from message bar
    const {user} = useAuth() //Get current user info
    const navigate = useNavigate()

    console.log('Current User in Chat:', user?.role)
    let allChats = [] //Temporary variable to store fetched chats

    useEffect(() => {
        const getChats = async () => {
            const chatRsponse = await axios.get('api/chat')
            console.log('Fetched Chats:', chatRsponse.data.chats)

            allChats = chatRsponse.data.chats //Store fetched chats in temporary variable 
            setChats(allChats) //Set state with fetched chats
        }
        
        getChats()
    }, [])

    useEffect(() => {
        console.log('Selected Chat:', selectedChat)
    }, [selectedChat])

    // CHAT MESSAGES

    // Retrieve Messages for Selected Chat
    useEffect(() => {
        const getMessages = async () => {
            if (selectedChat) {
                const messagesResponse = await axios.get(`/api/chat/${selectedChat.chat_id}/messages`)
                console.log('Fetched Messages for Selected Chat:', messagesResponse.data.messages)

                setChatMessages(messagesResponse.data.messages) //Set state with fetched messages
            }
        }
        
        getMessages()
    }, [selectedChat])

    //Send Message Functionality
    const sendMessage = async () => {
        if (message.trim() === '' || !selectedChat) return; // Prevent sending empty messages or if no chat is selected
        try {
            const response = await axios.post(`/api/chat/${selectedChat.chat_id}/messages`, 
                { content: message }
            );

            console.log('Message Sent:', response.data);
            // Update chatMessages state to include the new message
            setChatMessages((prevMessages) => [...prevMessages, response.data.message]);
            
            setmessage(''); // Clear input field after sending

            //scrollToBottom();  Scroll to bottom to show latest message
        } catch (error) {
            console.log('Error sending message:', error);
        }
    }
    // Open Chat in New Page on Mobile
    const handleChatClick = (chatId) => {
        navigate(`/dashboard/chat/${chatId}`);
    }

    return (
        <div className="chat-section">
            {/* Desktop Chat Section */}
            <div className="desktop-chat-section">
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
                                <p>Chat will activate when an agent accepts your request</p>
                            </div>
                        
                        )
                    ) : (
                        // All Chats
                        chats.map((chat, index) => (
                            <div key={chat.chat_id} className="chat-contact-item" onClick={() => setSelectedChat(chat)} >
                                <div className="chat-letter">
                                    {/* First letter of chats name */}
                                    <p>{chat.participant?.username?.charAt(0)?.toUpperCase()}</p>
                                </div>

                                <div className="chat-contact-info">
                                    <p className='contact-name bold' >{chat.participant.username}</p>
                                    <p className='contact-email' >{chat.participant.email}</p>
                                </div>
                                
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
                                    {/* Messages will go here */}
                                    {/* <h2>{selectedChat.haunter.username}</h2> */}

                                    {chatMessages.map((msg) => (
                                        <div key={msg.id} className={`chat-message-item ${msg.sender_role === user?.role ? 'sent' : 'recieved'}`} >
                                            <p className="message-content">{msg.content}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="chat-input">
                                    <input type="text" 
                                        placeholder='start typing...'
                                        name='message' 
                                        value={message} 
                                        onChange={(e) => setmessage(e.target.value)} 
                                        required
                                        disabled={selectedChat === null}
                                    />

                                    <button 
                                        className='chat-button' 
                                        onClick={sendMessage} 
                                        disabled={selectedChat === null}
                                        type='submit'
                                    >
                                        <IoSend />
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                    
                </div>
            </div>

            {/* Mobile Chat Section */}
            <div className="mobile-chat-section">
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
                        chats.map((chat, index) => (
                            <div key={chat.chat_id} className="chat-contact-item" onClick={() => handleChatClick(chat.chat_id)} >
                                <div className="chat-letter">
                                    {/* First letter of chats name */}
                                    <p>{chat.participant?.username?.charAt(0)?.toUpperCase()}</p>
                                </div>

                                <div className="chat-contact-info">
                                    <p className='contact-name bold' >{chat.participant.username}</p>
                                    <p className='contact-email' >{chat.participant.email}</p>
                                </div>
                                
                            </div>
                        ))
                    )}
                </div>

                {/* Chat Message Section */}
                <div className="chat-message-section">

                </div>
            </div>
        </div>
    );
}

export default Chat;