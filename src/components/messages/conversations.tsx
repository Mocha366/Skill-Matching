import React, { useEffect, useState,  } from "react";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, query, where, Timestamp,doc } from "firebase/firestore";
import "./conversation.css";
import { useAuth } from "../../context/AuthProvider";

// プロファイルデータの型を定義
interface Profile {
    uid: string;
    iconPhoto: string;
    nickname: string;
    timestamp: Timestamp;
}

// Conversation コンポーネントのプロパティの型を定義
interface ConversationProps {
    chatuser: (uid: string) => void;
}

const Conversations: React.FC<ConversationProps> = ({ chatuser }) => {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                // likesコレクションからmutualフィールドがtrueのドキュメントを取得
                const likesQuery = query(
                    collection(db, "likes"),
                    where("mutual", "==", true),
                    where("fromUserId", "==", user?.uid)
                );
                const likesSnapshot = await getDocs(likesQuery);
                const profilesData: Profile[] = [];

                for (const likeDoc of likesSnapshot.docs) {
                    const toUserId = likeDoc.data().toUserId;
                    try {
                        const profileDoc = await getDoc(doc(db, "profiles", toUserId));
                        if (profileDoc.exists()) {
                            const data = profileDoc.data();
                            profilesData.push({
                                uid: profileDoc.id,
                                iconPhoto: data.iconPhoto,
                                nickname: data.nickname,
                                timestamp: data.timestamp,
                            });
                        } else {
                            console.error(`ドキュメントが存在しません: ${toUserId}`);
                        }
                    } catch (docError) {
                        console.error(`ドキュメント取得エラー (${toUserId}):`, docError);
                    }
                }
                setProfiles(profilesData);
            } catch (error) {
                console.error("プロファイルデータ取得エラー:", error);
                setError("データの取得中にエラーが発生しました。");
            }
        };
        fetchProfiles();
    }, [user]);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const uid = e.currentTarget.dataset.uid;
        if (uid) {
            chatuser(uid);
        }
    };

    return (
        <div className="conversation">
            <div className="conversation-wrapper">
                <div className="talk">トーク</div>
                {error && <p className="error-message">{error}</p>}
                {profiles.length === 0 ? (
                    <p className="loadingmessage">NowLoading...</p>
                ) : (
                    profiles.map((profile) => (
                        <button
                            data-uid={profile.uid}
                            key={profile.uid}
                            className="profile-button"
                            onClick={handleButtonClick}
                        >
                            <img src={profile.iconPhoto} alt="icon" className="profile-icon" />
                            <p className="profile-nickname">{profile.nickname}</p>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Conversations;
