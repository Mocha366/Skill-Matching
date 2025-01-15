import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const EmailPasswordLogin: React.FC = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRegister, setIsRegister ] = useState<boolean>(false);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user =userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && !userDoc.data().isProfileComplete) {
                navigate("/profile-setup");
            } else {
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.error("ログインエラー:", error.message);
            alert("ログインエラー: " + error.message);
        }
    };

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                nickname: "デフォルトニックネーム",
                isProfileComplete: false,
                createdAt: new Date(),
            });

            console.log("登録成功:", userCredential.user);
            alert(`登録完了: ${user.email}`);
            setIsRegister(false);
        } catch (error: any) {
            console.error("登録エラー:", error.message);
            alert("登録エラー: " + error.message);
        }
    };
    
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{isRegister ? "新規登録" : "ログイン"}</h1>
            <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}
            />
            {isRegister ? (
                <button onClick={handleRegister} style={{ padding: "10px 20px", fontSize: "16px" }}>
                    登録
                </button>
            ) : (
                <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                    ログイン
                </button>
            )}
            <div style={{marginTop: "20px" }}>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#007BFF",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    {isRegister ? "ログイン画面に戻る" : "新規登録はこちら"}
                </button>
            </div>
        </div>
    );
};

export default EmailPasswordLogin;