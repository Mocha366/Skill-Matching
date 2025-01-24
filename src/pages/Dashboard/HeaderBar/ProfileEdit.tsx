import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";

const ProfileEdit: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setNickname(data?.nickname || "");
                        setEmail(data?.email || "");
                    }
                } catch (error) {
                    console.error("プロフィールの取得に失敗しました:", error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const onclickButton = () => {
        // プロフィール変更ページへの遷移
        navigate("/profilechange");
    };

    return (
        <div className="profile-edit-page">
            <HeaderBar />
            <div className="profile-edit-container">
                <h1>プロフィール</h1>
                <div className="form-group">
                   <h3>ニックネーム</h3><br></br>
                    {nickname}
                       
                </div>
                <div className="form-group">
                   <h3>メールアドレス</h3><br></br>
                   {email}
                       
                </div>
                <button
                    onClick={onclickButton}
                    className="update-button"
                >
                    更新
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;
