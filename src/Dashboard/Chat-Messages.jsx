import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import './Chat.css'

function ChatMessages() {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setmessage] = useState('') //Stores users input from message bar
    const [selectedChat, setSelectedChat] = useState(null) //Stores currently selected chat
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
            const response = await axios.post(`/api/chat/${chatId}/messages`, 
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


    return (
        <div className="chat-message-page">
            <div className="chat-messages-heading">

                {selectedChat ? `Chat with ${selectedChat.participant.username}` : 'Loading Chat...'}
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