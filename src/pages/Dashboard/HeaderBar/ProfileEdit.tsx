import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";

const ProfileEdit: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [interests, setInterests] = useState<string>("");
    const [socialLinks, setSocialLinks] = useState<string>("");
    const [realname, setRealname] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [qualifications, setQualifications] = useState<string[]>([]);
    const [occupation, setOccupation] = useState<string>("");
    const [workplace, setWorkplace] = useState<string>("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "profiles", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setNickname(data?.nickname || "");
                        setEmail(data?.email || "");
                        setAge(data?.age || "");
                        setLocation(data?.location || "");
                        setInterests(data?.interests || "");
                        setSocialLinks(data?.socialLinks || "");
                        setRealname(data?.realname || "");
                        setId(data?.id || "");
                        setComment(data?.comment || "");
                        setQualifications(data?.qualifications || []);
                        setOccupation(data?.occupation || "");
                        setWorkplace(data?.workplace || "");
                    } else {
                        console.error("ユーザードキュメントが存在しません");
                    }
                } catch (error) {
                    console.error("プロフィールの取得に失敗しました:", error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const onclickButton = (url: string) => {
        navigate(url);
    };

    return (
        <div className="profile-edit-page">
            <HeaderBar />
             <div className="profile-edit-Menu">
                        <Menu/>
                    </div>
            <div className="profile-edit-container">
                <div className="profile-edit-header">
                    <h1>プロフィール</h1>
                </div>
                <div className="profile-info">
                    <div className="profile-info-left">
                        <p><strong>ニックネーム</strong></p>
                        {nickname}
                        <p><strong>メールアドレス</strong></p>
                        {email}
                        <p><strong>年齢</strong></p>
                        {age}
                        <p><strong>興味分野</strong></p>
                        {interests}
                        <p><strong>URL</strong></p>
                        {socialLinks}
                        <p><strong>職業</strong></p>
                        {occupation}
                    </div>
                    <div className="profile-info-right">
                        <p><strong>名前</strong></p>
                        {realname}
                        <p><strong>ID</strong></p>
                        {id}
                        <p><strong>一言</strong></p>
                        {comment}
                        <p><strong>出身</strong></p>
                        {location}
                        <p><strong>資格</strong></p>
                        <ul>
                            {qualifications.map((qualification, index) => (
                                <li key={index}>{qualification}</li>
                            ))}
                        </ul>
                        <p><strong>職場 / 学校名</strong></p>
                        {workplace}
                    </div>
                </div>
                <button onClick={() => onclickButton("/dashboard/profilechange")} className="update-button">
                    更新
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;
