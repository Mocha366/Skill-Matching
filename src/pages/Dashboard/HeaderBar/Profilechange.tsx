import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import "./Profilechange.css";

const ProfileChange: React.FC = () => {
  const { user } = useAuth();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
      const [age, setAge] = useState<string>("");
      const [location, setLocation] = useState<string>("");
      const [interests, setInterests] = useState<string>("");
      const [socialLinks, setSocialLinks] = useState<string>("");
      const [realname, setRealname] = useState<string>("");
      const [id, setId] = useState<string>("");
      const [comment, setComment] = useState<string>("");
      const [qualification, setQualification] = useState<string>("");
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
                          setQualification(data?.qualification || "");
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

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "profiles", user.uid), {
        nickname,
        email,
        age,
        location,
        interests,
        socialLinks,
        realname,
        id,
        comment,
        qualification,
        occupation,
        workplace,
      });
      navigate("/profileEdit"); // 遷移先を指定
      alert("プロフィールを更新しました");
    } catch (error) {
      console.error("プロフィールの更新に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-page">
      <HeaderBar />
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
          <div className="form-group">
          <label htmlFor="age">年齢</label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="年齢を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">興味分野</label>
          <input
            id="interests"
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="興味分野を設定してください"
          />
        </div>
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
          <label htmlFor="nickname">ニックネーム</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="ニックネームを入力してください"
          />
        </div>
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

export default ProfileChange;