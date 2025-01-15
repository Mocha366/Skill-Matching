import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ProfileSetup: React.FC = () => {
    const { user } =useAuth();
    const [nickname, setNickname] = useState<string>("");
    const navigate = useNavigate();

    const handleSave = async () => {
        if (user) {
            try {
                await updateDoc(doc(db, "users", user.uid),{
                    nickname,
                    isProfileComplete: true,
                });
                alert("profileを保存しました！");
                navigate("/dashboard");
            } catch (error: any) {
                console.error("プロフィール保存エラー:", error.message);
                alert("エラー:" + error.message);
            }
        }
    };

    return (
        <div style={{ textAlign: "center", margin: "50px" }}>
            <h1>プロフィール設定</h1>
            <input
                type="text"
                placeholder="ニックネームを入力"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}/>
            <button onClick={handleSave} style={{ padding: "10px 20px", fontSize: "16px" }}>
                保存
            </button>
        </div>
    );
};

export default ProfileSetup;