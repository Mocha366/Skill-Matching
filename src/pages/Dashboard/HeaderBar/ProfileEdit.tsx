import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import HeaderBar from "../../../components/Dashboard/HeaderBar";

const ProfileEdit: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

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
                    console.error("プロフィールの取得に失敗しました:",error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleUpdate = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef,{ nickname, email });
            alert("プロフィールを更新しました！");
            navigate("/dashboard");
        } catch (error) {
            console.error("プロフィールの更新に失敗しました:", error);
            alert("更新に失敗しました。もう一度試してください。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-edit-page">
            <HeaderBar/>
            <div className="profile-edit-container">
                <h1>プロフィールの再設定</h1>
                <div className="form-group">
                    <label htmlFor="nickname">ニックネーム</label>
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="ニックネームを入力してください"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="メールアドレスを入力してください"
                    />
                </div>
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="update-button"
                >
                    {loading ? "更新中..." : "更新する"}
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;