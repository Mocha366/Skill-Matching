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
  //const [profile, setProfile] = useState<any>({ interests: "" });
  

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
                    <label>
                      興味分野(最大5つ)
                      <div className="tag-selector-container">
                        <div className="selected-tags">
                          {interests
                            .split(",")
                            .filter((tag: string) => tag.trim())
                            .map((tag: string) => (
                              <span
                                key={tag}
                                className="tag selected"
                                onClick={() => {
                                  const updatedTags = interests
                                    .split(",")
                                    .filter((t: string) => t !== tag)
                                    .join(",");
                                  setInterests(updatedTags);
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        <div className="options">
                          {[
                            "HTML", "CSS", "JavaScript", "TypeScript", "Python", "Ruby", "PHP", "Java",
                            "Kotlin", "C#", "Go", "Scala", "Swift", "Objective-C", "Dart", "C", "C++",
                            "Rust", "Assembly", "R", "Julia", "MATLAB", "SQL", "Bash", "PowerShell",
                            "Perl", "Solidity", "Lua", "Elixir", "Erlang", "Haskell", "F#", "Groovy",
                          ].map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`option ${interests.split(",").includes(option) ? "selected" : ""}`}
                              onClick={() => {
                                const selectedTags = interests
                                  .split(",")
                                  .filter((tag: string) => tag.trim());
                                if (selectedTags.includes(option)) {
                                  const updatedTags = selectedTags.filter((tag: string) => tag !== option).join(",");
                                  setInterests(updatedTags);
                                } else {
                                  if (selectedTags.length >= 5) {
                                    alert("最大5つまで選択できます");
                                    return;
                                  }
                                  setInterests([...selectedTags, option].join(","));
                                }
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </label>
        <div className="form-group">
          <label htmlFor="location">場所</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="場所を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="realname">本名</label>
          <input
            id="realname"
            type="text"
            value={realname}
            onChange={(e) => setRealname(e.target.value)}
            placeholder="本名を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="IDを入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">コメント</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">資格</label>
          <input
            id="qualification"
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            placeholder="資格を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">職業</label>
          <input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="職業を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="workplace">職場</label>
          <input
            id="workplace"
            type="text"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            placeholder="職場を入力してください"
          />
        </div>
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