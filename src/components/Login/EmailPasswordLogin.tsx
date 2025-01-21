import React, { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    GithubAuthProvider,
    signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EmailPasswordLogin: React.FC = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRegister, setIsRegister ] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const saveUserToFirestore = async (user: any, providerName: string) => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                nickname: user.displayName || `${providerName}ユーザー`,
                isProfileComplete: false,
                createdAt: new Date(),
            });
        }
    };

    const handleAuthProvider = async (provider: any, providerName: string) => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user= result.user;

            await saveUserToFirestore(user, providerName);
            
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && !userDoc.data()?.isProfileComplete) {
                navigate("/profile-setup");
            } else {
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.error(`${providerName}認証エラー:`, error.message);
            alert(`${providerName}認証エラー: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        const provider = new GoogleAuthProvider();
        handleAuthProvider(provider, "Google");
    };

    const handleGithubAuth = () => {
        const provider = new GithubAuthProvider();
        handleAuthProvider(provider, "GitHub");
    };
    
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
            alert(`登録完了: ${user.email}`);
            navigate("/profile-setup");
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
            <div style={{ marginTop: "20px" }}>
                {isRegister ? (
                    <button onClick={handleRegister} style={{ padding: "10px 20px", fontSize: "16px" }}>
                        登録
                    </button>
                ) : (
                    <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                        ログイン
                    </button>
                )}
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <button
                    onClick={handleGoogleAuth}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#4285F4",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                    disabled={loading}
                >
                    {loading ? "処理中..." : "Googleでログイン"}
                </button>   
                <button
                    onClick={handleGithubAuth}
                    style={{
                        marginLeft: "10",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#333",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                    disabled={loading}
                >
                    {loading ? "処理中..." : "GitHubでログイン"}
                </button>
            </div>
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