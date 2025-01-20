import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Dashboard.css";
import "../../components/HeaderBar/HeaderBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>("");

    useEffect(() => {
        const fetchNickname = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if(userDoc.exists()) {
                        setNickname(userDoc.data()?.nickname || "ゲスト");
                    }
                } catch (error: any) {
                    console.error("ニックネーム取得エラー:", error.message);
                }
            }
        };
        fetchNickname();
    }, [user]);

    if (loading) {
        return <p>読み込み中...</p>
    }

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="dashboard-container">
            <div>
                <HeaderBar/>
            </div>
            <div className="dashboard-text">
                <p>ようこそ {nickname} さん、SKILL MATCHINGへようこそ！</p>
            </div>
        </div>
    );
};

export default Dashboard;