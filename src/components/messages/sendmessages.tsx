import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { db } from "../../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, getDoc, doc, Timestamp } from "firebase/firestore";
import "./sendMessages.css";
interface Message {
    id: string;
    sender: string;
    receiver: string;
    text: string;
    timestamp: Timestamp;
}
interface SendMessageProps {
    chatWith?: string;
    chatuser: (uid: string) => void;
}

const SendMessage: React.FC<SendMessageProps> = ({ chatWith}) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");

    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, "messages"),
            orderBy("timestamp", "asc"),
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
                        id: doc.id,
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

    useEffect(() => {
        const fetchNickname = async () => {
            if (chatWith) {
                try {
                    const docRef = doc(db, "profiles", chatWith);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setNickname(data.nickname); // 取得したフィールドを状態に設定
                    } else {
                        console.error("ドキュメントが存在しません");
                    }
                } catch (error) {
                    console.error("ドキュメント取得エラー:", error);
                }
            }
        };
        fetchNickname();
    }, [chatWith]);

    const sendMessage = async () => {
        if (!message.trim() || !user || !chatWith) return;
        try {
            await addDoc(collection(db, "messages"), {
                sender: user.uid,
                receiver: chatWith,
                text: message.trim(),
                timestamp: new Date(),
            });
            setMessage("");
        } catch (error) {
            console.error("メッセージ送信エラー:", error);
        }
    };

    return (
        <div>
            <p className="chatWith-nickname">
                {nickname}
            </p> 
            <div className="chat-container">
                <div className="messages-container">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message ${
                                msg.sender === user?.uid ? "sent" : "received"
                            }`}
                        >
                            {msg.text}
                            {msg.timestamp.toDate().toLocaleString()}
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
        </div>
    );
};

export default SendMessage;