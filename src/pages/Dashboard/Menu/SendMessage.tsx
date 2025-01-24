import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, limit, Timestamp } from "firebase/firestore";
import "./SendMessage.css";
import Conversation from "../../../components/conversations/conversations";

interface Message {
    id: string;
    sender: string;
    receiver: string;
    text: string;
    timestamp: Timestamp;
}

const SendMessage: React.FC<{ chatWith?: string }> = ({ chatWith }) => {
    const { user, } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "messages"),
            orderBy("timestamp", "asc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (
                    (data.sender === user.uid && data.receiver === chatWith) ||
                    (data.sender === chatWith && data.receiver === user.uid)
                ) {
                    msgs.push({
                        id:doc.id,
                        sender: data.sender,
                        receiver: data.receiver,
                        text: data.text,
                        timestamp: data.timestamp,
                    });
                }
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [user, chatWith]);

    const sendMessage = async () => {
        if (!message.trim() || !user) return;

        try {
            await addDoc(collection(db, "messages"),{
                sender: user.uid,
                receiver: chatWith = "admin",
                text: message.trim(),
                timestamp: new Date(),
            });
            setMessage("");
        } catch (error) {
            console.error("メッセージ送信エラー:", error);
        }
    };

    return (
        <div className="chat-container">
            <Conversation/>
            <div className="messages-container">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${
                            msg.sender === user?.uid ? "sent" : "received"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="メッセージを入力..."
                />
                <button onClick={sendMessage}>送信</button>
            </div>
        </div>
    );
};

export default SendMessage;