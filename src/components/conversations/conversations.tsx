import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, Timestamp } from "firebase/firestore";
import "./conversation.css";

// プロファイルデータの型を定義
interface Profile {
    uid: string;
    iconPhoto: string;
    nickname: string;
    timestamp: Timestamp;
}

const Conversation: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "profiles"));
                const profilesData: Profile[] = [];
                for (const doc of querySnapshot.docs) {
                    try {
                        const profileDoc = await getDoc(doc.ref);
                        if (profileDoc.exists()) {
                            const data = profileDoc.data();
                            profilesData.push({
                                uid: profileDoc.id,
                                iconPhoto: data.iconPhoto,
                                nickname: data.nickname,
                                timestamp: data.timestamp,
                            });
                        } else {
                            console.error(`ドキュメントが存在しません: ${doc.id}`);
                        }
                    } catch (docError) {
                        console.error(`ドキュメント取得エラー (${doc.id}):`, docError);
                    }
                }
                setProfiles(profilesData);
            } catch (error) {
                console.error("プロファイルデータ取得エラー:", error);
                setError("データの取得中にエラーが発生しました。");
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="conversation">
            <div className="conversation-wrapper">
                {error && <p className="error-message">{error}</p>}
                {profiles.length === 0 ? (
                    <p>データがありません。</p>
                ) : (
                    profiles.map((profile) => (
                        <div key={profile.uid} className="profile">
                            <img src={profile.iconPhoto} alt="icon" className="profile-icon" />
                            <p className="profile-nickname">{profile.nickname}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Conversation;