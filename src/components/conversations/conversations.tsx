import React, { useEffect, useState } from "react";
import "./conversation.css";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import "./conversation.css";

interface profiles {
    id: string;
    icon: string;
    nickname: string;
    timestamp: Timestamp;
}

const Conversation: React.FC = () => {
    const [conversations, setConversations] = useState<profiles[]>([]);;
    useEffect(() => {
        const q = query(
                    collection(db, "profiles"),
                    orderBy("timestamp", "asc"),
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const profile: profiles[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                profile.push({
                    id:doc.id,
                    icon: data.icon,
                    nickname: data.nickname,
                    timestamp: data.timestamp,
                });               
            })
        setConversations(profile);
        });
    return () => unsubscribe();
    }, []);


    return (
        <div className="conversation">
            <div className="conversation-wrapper">
            {conversations.map((profi) => (
                    <div key={profi.id}>
                        <img src = {profi.icon} alt = "icon" />
                        <p>{profi.nickname}</p>
                        <h1>aaa</h1>
                    </div>
                ))}
            </div>
        </div>
    );
    }
export default Conversation;
                
