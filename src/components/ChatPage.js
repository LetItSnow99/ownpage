import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [activeConversation, setActiveConversation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const currentUser = useUserStore((state) => state.currentUser);

    const conversations = [
        { name: 'Juste M.', time: '21:42', image: 'https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg' },
        { name: 'Sigita S.', time: '18:20', image: 'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg' },
        { name: 'Mantas T.', time: '15:15', image: 'https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0' },
        { name: 'Laura V.', time: '12:55', image: 'https://img.freepik.com/premium-photo/woman-with-glasses-standing-front-wall-covered-sticky-notes_201606-20124.jpg' },
        { name: 'Egle G.', time: '21:50', image: 'https://www.edarabia.com/wp-content/uploads/2015/11/7-ways-to-become-the-person-everyone-respects.jpg' },
        { name: 'Jonas B.', time: '16:20', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Tomas K.', time: '14:40', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Agnė R.', time: '13:10', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { name: 'Monika J.', time: '12:00', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Saulius P.', time: '11:45', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Giedrė V.', time: '10:30', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { name: 'Rimantas S.', time: '09:50', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { name: 'Karolina M.', time: '08:20', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
        { name: 'Paulius T.', time: '07:40', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { name: 'Simona K.', time: '06:15', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { name: 'Andrius Z.', time: '05:30', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
        { name: 'Kristina L.', time: '04:45', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
        { name: 'Milda D.', time: '03:15', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { name: 'Lukas J.', time: '02:10', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { name: 'Erika P.', time: '01:30', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
    ];

    const filteredConversations = searchQuery
        ? conversations.filter((conversation) =>
            conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : conversations;

    const handleSendMessage = () => {
        if (!message.trim() || !activeConversation) return;

        const newMessage = {
            id: Date.now(),
            username: currentUser?.username || 'You',
            text: message,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => {
            const updatedMessages = { ...prevMessages };
            if (!updatedMessages[activeConversation]) {
                updatedMessages[activeConversation] = [];
            }
            updatedMessages[activeConversation].push(newMessage);
            return updatedMessages;
        });
        setMessage('');
    };

    return (
        <div
            className="chat-page-container"
            style={{
                background: "url('https://media.istockphoto.com/id/1034337372/vector/on-air-neon-sign-vector-on-air-radio-design-template-neon-sign-light-banner-neon-signboard.jpg?s=612x612&w=0&k=20&c=LNfHnq_IIg8V_4c_O0JvwEeF3sB4Gg87JFMWdn_PysA=') no-repeat center center fixed",
                backgroundSize: 'cover',
            }}
        >
            {currentUser ? (
                <div className="chat-page d-flex" style={{ width: '900px', height: '700px', margin: 'auto' }}>
                    {/* Contact List */}
                    <div className="first-cont">
                        <div className="search-bar-container gap10">
                            <input
                                type="text"
                                placeholder="Ieškoti"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <hr className="divider" />

                        <div className="contact-list">
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.name}
                                    className={`contact d-flex j-between a-center ${
                                        activeConversation === conversation.name ? 'active' : ''
                                    }`}
                                    onClick={() => setActiveConversation(conversation.name)}
                                >
                                    <div className="d-flex a-center">
                                        <img src={conversation.image} alt={conversation.name} className="contact-image" />
                                        <div className="ml1 contact-name-time">
                                            <span>{conversation.name}</span>
                                        </div>
                                    </div>
                                    <span className="time" style={{ marginLeft: 'auto' }}>{conversation.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Panel */}
                    <div className="d-flex column grow3 right-panel">
                        <div className="chat-header">
                            <span className="to-text">Kam:</span>{' '}
                            <span className="name">{activeConversation || 'Pasirinkite pokalbį'}</span>
                        </div>

                        <div className="messages">
                            {(messages[activeConversation] || []).map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`message ${msg.username === 'You' ? 'from-you' : 'from-them'}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="message-input">
                            <input
                                type="text"
                                placeholder="Rašyti žinutę"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button className="send-btn" onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            ) : (
                <h2 style={{ textAlign: 'center', color: '#333' }}>Prisijunkite, kad galėtumėte naudotis Chat funkcija.</h2>
            )}
        </div>
    );
};

export default ChatPage;
