import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"
import { useAuth } from "../../../context/AuthProvider"
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";
import Background from "../../../components/Background";
import "./Like.css"
import FooterBar from "../../../components/Footer/FooterBar";

interface Like {
    fromUserId: string;
    toUserId: string;
    mutual: boolean;
}

interface UserProfile {
    id: string;
    nickname: string;
}

const Likepage: React.FC = () => {
    const { user } = useAuth();
    const [mutualLikes, setMutualLikes] = useState<UserProfile[]>([]);
    const [likesGiven, setLikesGiven] = useState<UserProfile[]>([]);
    const [likesReceived, setLikesReceived] = useState<UserProfile[]>([]);

useEffect(() => {
    if (!user) return;

    const fetchLikes = async () => {
        try {
            const likesRef = collection(db, "likes");

            const givenQuery = query(likesRef, where("fromUserId", "==", user.uid));
            const givenSnapshot = await getDocs(givenQuery);

            const receivedQuery = query(likesRef, where("toUserId", "==", user.uid));
            const receivedSnapshot = await getDocs(receivedQuery);

            const mutual: UserProfile[] = [];
            const given: UserProfile[] = [];
            const received: UserProfile[] = [];

            for (const likeDoc of givenSnapshot.docs) {
                const likeData = likeDoc.data() as Like;
                const userSnap = await getDoc(doc(db, "profiles", likeData.toUserId));
                
                if (userSnap.exists()) {
                    const profile = { id: likeData.toUserId, nickname: userSnap.data().nickname };
                    if (likeData.mutual) {
                        mutual.push(profile);
                    } else {
                        given.push(profile);
                    }
                }
            }

            for (const likeDoc of receivedSnapshot.docs) {
                const likeData = likeDoc.data() as Like;
                const userSnap = await getDoc(doc(db, "profiles", likeData.fromUserId));
      
                if (userSnap.exists()) {
                    const profile = { id: likeData.fromUserId, nickname: userSnap.data().nickname };
                    if (!likeData.mutual) {
                        received.push(profile);
                    }
                }
            }

            setMutualLikes(mutual);
            setLikesGiven(given);
            setLikesReceived(received);
        } catch (error) {
            console.error("ライクの取得失敗:", error);
        }
    }

    fetchLikes();
}, [user]);

    return (
        <div className="like-container">
            <header className="like-headerbar">
                <HeaderBar />
            </header>
            <Background />
            <div className="like-contents">
                <div className="like-menu">
                    <Menu />
                </div>
                <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h2>マッチング状況</h2>

                <h3>💖 相互ライク</h3>
                {mutualLikes.length > 0 ? (
                    <ul>
                    {mutualLikes.map((profile) => (
                        <li key={profile.id}>{profile.nickname}</li>
                    ))}
                    </ul>
                ) : (
                    <p>相互ライクはありません</p>
                )}

                <h3>❤️ 自分から送ったライク</h3>
                {likesGiven.length > 0 ? (
                    <ul>
                    {likesGiven.map((profile) => (
                        <li key={profile.id}>{profile.nickname}</li>
                    ))}
                    </ul>
                ) : (
                    <p>自分からのライクはありません</p>
                )}

                <h3>💌 受け取ったライク</h3>
                {likesReceived.length > 0 ? (
                    <ul>
                    {likesReceived.map((profile) => (
                        <li key={profile.id}>{profile.nickname}</li>
                    ))}
                    </ul>
                ) : (
                    <p>受け取ったライクはありません</p>
                )}
                </div>
            </div>
            <FooterBar />
        </div>
    )
}

export default Likepage;