import { io } from 'socket.io-client'

let socket = null;
const listeners = {
  receive_message: [],
  joined_chat: [],
};

export function initSocket() {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return socket;
  }

  const token = localStorage.getItem('token');
  const socketUrl = `${import.meta.env.VITE_SOCKET_URL}`;
  console.log('initSocket token present:', !!token);
  console.log('Socket URL:', socketUrl);
  // limit reconnection attempts in dev to avoid repeated spam; inspect connect_error for details
  socket = io(socketUrl, {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    ackTimeout: 60000, // increased from default 5s to 60s to allow slower servers
  });

  socket.on('connect', () => {
    console.log('Socket connected', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connect error', err);
    try {
      // surface any server-provided message or details
      console.error('connect_error details:', err && (err.message || JSON.stringify(err)));
    } catch (e) {
      console.error('Error stringifying connect_error', e);
    }
  });

  socket.on('error', (err) => {
    console.error('Socket error', err);
  });

  socket.on('disconnect', (reason) => {
    console.warn('Socket disconnected. Reason:', reason);
  });

  // Register internal listeners for 'receive_message' and 'joined_chat'
  socket.on('receive_message', (msg) => {
    listeners.receive_message.forEach(handler => handler(msg));
  });

  socket.on('joined_chat', (payload) => {
    listeners.joined_chat.forEach(handler => handler(payload));
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function joinChat(chatId) {
  if (!socket) return;
  socket.emit('join_chat', chatId);
}

export function leaveChat(chatId) {
  if (!socket) return;
  socket.emit('leave_chat', chatId);
}

export function sendMessage(payload, ack) {
  if (!socket) {
    console.warn('Socket is null, cannot send message');
    return;
  }
  if (!socket.connected) {
    console.warn('Socket not connected (connected=false), cannot send message');
    return;
  }
  console.log('Emitting send_message:', payload);
  socket.emit('send_message', payload, ack);
}

export function onReceiveMessage(cb) {
  if (!listeners.receive_message.includes(cb)) {
    listeners.receive_message.push(cb);
  }
}

export function offReceiveMessage(cb) {
  listeners.receive_message = listeners.receive_message.filter(h => h !== cb);
}

export function onJoined(cb) {
  if (!listeners.joined_chat.includes(cb)) {
    listeners.joined_chat.push(cb);
  }
}

export function offJoined(cb) {
  listeners.joined_chat = listeners.joined_chat.filter(h => h !== cb);
}

export function disconnect() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}



// FOR WHEN SOCKET IS WORKING (PUT IN CHAT.JSX)
// Initialize Socket singleton and register global listeners

// useEffect(() => {
//     socketRef.current = initSocket();

//     const handleReceive = (msg) => {
//         // if component not mounted or no selected chat yet, ignore here
//         if (!selectedChatRef.current) return;
//         // If message doesn't belong to current chat, ignore (other UI can update chats list)
//         if (msg.chat_id !== selectedChatRef.current.chat_id) return;

//         setChatMessages(prev => {
//             if (prev.some(m => m.id === msg.id)) return prev;
//             // if server echoes clientId, replace optimistic message
//             if (msg.clientId) {
//                 const idx = prev.findIndex(m => m.clientId === msg.clientId);
//                 if (idx !== -1) {
//                     const next = [...prev];
//                     next[idx] = msg;
//                     return next;
//                 }
//             }
//             return [...prev, msg];
//         });
//     };

//     onReceiveMessage(handleReceive);

//     const handleJoined = (payload) => console.log('joined_chat', payload);
//     onJoined(handleJoined);

//     return () => {
//         offReceiveMessage(handleReceive);
//         offJoined(handleJoined);
//     }
// }, []);


// Keep selectedChatRef in sync and perform join + fetch messages

// useEffect(() => {
//     selectedChatRef.current = selectedChat;
//     if (!selectedChat) return;

//     // join socket room
//     socketJoinChat(selectedChat.chat_id);

//     // fetch existing messages via HTTP for history load
//     const getMessages = async () => {
//         try {
//             const messagesResponse = await axios.get(`/api/chat/${selectedChat.chat_id}/messages`)
//             console.log('Fetched Messages for Selected Chat:', messagesResponse.data.messages)
//             setChatMessages(messagesResponse.data.messages)
//         } catch (err) {
//             console.error('Error fetching messages', err)
//         }
//     }

//     getMessages();
// }, [selectedChat]);


// Send Message Functionality (optimistic via socket)

// const sendMessage = () => {
//     if (message.trim() === '' || !selectedChat) return;

//     const clientId = `c-${Date.now()}`;
//     const optimisticMsg = {
//         id: clientId,
//         clientId,
//         chat_id: selectedChat.chat_id,
//         content: message,
//         sender_role: user.role,
//         created_at: new Date().toISOString(),
//         pending: true,
//     };

//     // show immediately in chat box
//     setChatMessages(prev => [...prev, optimisticMsg]);
//     setmessage('');

//     // emit via socket; server should persist and broadcast receive_message including clientId
//     console.log('Sending message. Socket ref:', socketRef.current?.id, 'Connected:', socketRef.current?.connected);
//     showFail('Message not sent. Please try again.') //Default failure message if ack fails or times out
//     socketSendMessage({ chat_id: selectedChat.chat_id, content: message, clientId }, (ack) => {
//         console.log('Send ack received:', ack);
//         if (ack && ack.ok && ack.message) {
//             setChatMessages(prev => prev.map(m => m.clientId === clientId ? ack.message : m));
//         }
//     });
// }