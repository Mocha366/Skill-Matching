import React, { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Google from "./GoogleIcon";

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

    const handleKeyDownLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter"){
                handleLogin();
            }
        };
    
    return (
        <div 
            className="EmailPasswordLogin-container" 
            style={{
                    textAlign: "center",
                    marginTop: "50px",
                    marginLeft:"22%",
                    marginRight:"22%",
                    paddingTop:"20px",
                    paddingBottom:"20px",
                    borderRadius:"45px",
                    backgroundColor:"white"
                }}
        >
            <h1 style={{marginTop:0}}>{isRegister ? "新規登録" : "ログイン"}</h1>
            <p style={{margin:"30px 46% 0 0"}}>メールアドレス</p>
            <input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", margin:"0 auto 10px", padding: "10px", width: "60%", borderRadius:"13px"}}
            />
            <p style={{margin:"20px 50% 0 0"}}>パスワード</p>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "0 auto 10px", padding: "10px", width: "60%", borderRadius:"13px"}}
                onKeyDown={handleKeyDownLogin}
            />
            <div style={{display:"flex", marginTop:"36px"}}>
                {isRegister ? (
                    <button onClick={handleRegister} style={{ marginLeft:"41%", marginRight:"10px", padding: "10px 20px", fontSize: "14px", backgroundColor: "#FF9292" }}>
                        登録
                    </button>
                ) : (
                    <button onClick={handleLogin} style={{ marginLeft:"39%", marginRight:"16px", padding: "8px 15px", fontSize: "14px", backgroundColor: "#FF9292" }}>
                        ログイン
                    </button>
                )}
                <button
                    onClick={handleGoogleAuth}
                    style={{
                        padding: "10px 20px 5px",
                        fontSize: "16px",
                        backgroundColor: "white",
                        color: "#FF9292",
                        cursor: "pointer",
                        marginRight:"37%"
                    }}
                    disabled={loading}
                >   
                    {loading ? "処理中..." : <Google />}
                </button>
            </div>
            <div style={{marginTop: "20px" }}>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "black",
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