import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { IoSend } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";
import './Chat.css'

function ChatMessages() {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setmessage] = useState('') //Stores users input from message bar
    const [selectedChat, setSelectedChat] = useState(null) //Stores currently selected chat
    const selectedChatRef = useRef(null); //Reference to currently selected chat
    const { user } = useAuth(); //Get current user info
    const { chatId } = useParams();
    const navigate = useNavigate();

    console.log('Current User in Chat:', user?.role)
    // Retrieve Selected Chat
    useEffect(() => {
        const getSelectedChat = async () => {
            if (chatId) {
                const chatResponse = await axios.get(`/api/chat`)
                // Filter to find the chat with the matching chatId
                const chat = chatResponse.data.chats.find(c => c.chat_id.toString() === chatId);
                setSelectedChat(chat);
                console.log('Fetched Selected Chat:', chat);
            }
        }

        getSelectedChat()
    }, [chatId])

    // Keep selectedChatRef in sync and perform join + fetch messages
    useEffect(() => {
        selectedChatRef.current = selectedChat;
        if (!selectedChat) return;

        // fetch existing messages via HTTP for history load
        const getMessages = async () => {
            try {
                const messagesResponse = await axios.get(`/api/chat/${selectedChat.chat_id}/messages`)
                console.log('Fetched Messages for Selected Chat:', messagesResponse.data.messages)
                setChatMessages(messagesResponse.data.messages)
            } catch (err) {
                console.error('Error fetching messages', err)
            }
        }

        getMessages();
    }, [selectedChat]);

    //Send Message Functionality
    const sendMessage = async () => {
        if (message.trim() === '' || !selectedChat) return; // Prevent sending empty messages or if no chat is selected
        
        // show immediately in chat box
        const optimisticMsg = {
            chat_id: selectedChat.chat_id,
            sender_id: user.id,
            content: message,
            sender_role: user.role,
            created_at: new Date().toISOString(),
            pending: true,
        };
        setChatMessages(prev => [...prev, optimisticMsg]);
        setmessage('');

        scrollToBottom();  //Scroll to bottom to show latest message
        // define scrollToBottom() first.

        try {
            const response = await axios.post(`/api/chat/${selectedChat.chat_id}/messages`, 
                { content: message }
            );

            console.log('Message Sent:', response.data);
            // Update chatMessages state to include the new message
            // setChatMessages((prevMessages) => [...prevMessages, response.data.message]);
            
            setmessage(''); // Clear input field after sending
        } catch (error) {
            console.log('Error sending message:', error);
        }
    }

    //  Return to dashboard
    const returnToDashboard = () => {
        if (user?.role === "haunter") {
            navigate('/Dashboard-Haunter');
        } else {
            navigate('/Dashboard-Agent');
        }
        
    }
    return (
        <div className="chat-message-page">
            <div className="chat-messages-heading">
                {/* Back button is not working */}
                <IoArrowBackOutline onClick={() => returnToDashboard()} />
                <p>{selectedChat ? `Chat with ${selectedChat.participant.username}` : 'Loading Chat...'}</p>
            </div>

            <div className="chat-messages">
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
            </div>
        </div>
    );
}

export default ChatMessages;