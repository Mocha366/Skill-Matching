import React from "react";
import "./ProfilePreview.css";// Firebase設定をインポート
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "../../firebase";



interface ProfilePreviewProps {
    nickname: string;
    interests: string[];
    URL: string[];
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ nickname, interests, URL }) => {
    React.useEffect(() => {
        const fetchProfile = async () => {
            const querySnapshot = await getDocs(collection(db, "profiles"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        };
        fetchProfile();
    }, []);
    
    return (
        <div className="profile-preview">
            <h2 className="profile-nickname">{nickname}</h2>
            <ul className="profile-interests">
                {interests.map(interest => (
                    <li key={interest} className="profile-interest">{interest}</li>
                ))}
                {URL.map((url, index) => (
                    <li key={index} className="profile-URL">{url}</li>
                ))}
            </ul>
        </div>
    );
};
export default ProfilePreview;