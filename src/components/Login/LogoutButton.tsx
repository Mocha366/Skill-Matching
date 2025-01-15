import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("ログアウトしました");
            navigate("/login");
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: "8px 16px",
                borderRadius: "20px",
                background: "transparent",
                border: "1px solid black",
                fontWeight: "bold",
                cursor: "pointer",
            }}
        >
            ログアウト
        </button>
    );
};

export default LogoutButton;