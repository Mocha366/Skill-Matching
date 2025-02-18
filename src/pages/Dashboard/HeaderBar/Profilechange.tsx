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
  //const [socialLinks, setSocialLinks] = useState<string>("");
  const [realname, setRealname] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  //const [qualification, setQualification] = useState<string>("");
  //const [occupation, setOccupation] = useState<string>("");
  const [workplace, setWorkplace] = useState<string>("");
  const [profile, setProfile] = useState<any>({ interests: "", qualifications: [] });
  

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
                          //setSocialLinks(data?.socialLinks || "");
                          setRealname(data?.realname || "");
                          setId(data?.id || "");
                          setComment(data?.comment || "");
                          //setQualification(data?.qualification || "");
                          //setOccupation(data?.occupation || "");
                          setWorkplace(data?.workplace || "");

                          setProfile({   // 修正
                            qualifications: data?.qualifications || [],
                            occupation: data?.occupation || "",
                            socialLinks: data?.socialLinks || "",
                          });
                          
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
        socialLinks: profile.socialLinks,  // 修正: profile.socialLinks を保存
        realname,
        id,
        comment,
        qualification: profile.qualifications,  // 修正: profile.qualifications を保存
        occupation: profile.occupation,  // 修正: profile.occupation を保存
        workplace,
      });
      navigate("/dashboard/profile-edit"); // 遷移先を指定
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
            type="number"
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
          <label htmlFor="location">出身</label>
          <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">選択してください</option>
                            {[
                                "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
                                "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
                                "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
                                "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", 
                                "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
                                "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", 
                                "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
                            ].map((prefecture) => (
                                <option key={prefecture} value={prefecture}>
                                    {prefecture}
                                </option>
                            ))}
                        </select>
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
          <label htmlFor="id">検索用ID(最大15文字)</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            maxLength={15}
            placeholder="設定する検索用IDを入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">コメント</label>
          <textarea
            value={comment}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 40) {
                setComment(value);
              }
            }}
          ></textarea>
          <p>{comment.length}/40</p>
        </div>
        <div className="form-group">
          <label htmlFor="qualification">資格</label>
          {profile.qualifications.map((qualification: string, index: number) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                                type="text"
                                value={qualification}
                                onChange={(e) => {
                                    const updatedQualifications = profile.qualifications.map((q: string, i: number) =>
                                        i === index ? e.target.value : q
                                    );
                                    setProfile({ ...profile, qualifications: updatedQualifications });
                                }}
                                placeholder={`資格 ${index + 1}`}
                                style={{
                                    flexGrow: 1,
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedQualifications = profile.qualifications.filter((_: any, i: number) => i !== index);
                                    setProfile({ ...profile, qualifications: updatedQualifications });
                                }}
                                style={{
                                    marginLeft: '8px',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                    background: '#f5f5f5',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            setProfile({ ...profile, qualifications: [...profile.qualifications, ''] });
                        }}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            background: '#1e90ff',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        ＋ 資格を追加
                    </button>
        </div>
        <div className="form-group">
          <label htmlFor="occupation">職業</label>
          <select
                            value={profile.occupation}
                            onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                        >
                            <option value="">選択してください</option>
                            {[
                                "・学生",
                                "・フロントエンドエンジニア",
                                "・バックエンドエンジニア",
                                "・フルスタックエンジニア",
                                "・iOSアプリエンジニア",
                                "・Androidアプリエンジニア",
                                "・クロスプラットフォームアプリエンジニア",
                                "・データサイエンティスト",
                                "・データエンジニア",
                                "・AI/機械学習エンジニア",
                                "・インフラ,運用",
                                "・ネットワークエンジニア",
                                "・セキュリティエンジニア",
                                "・リスクアナリスト",
                                "・UI/UXデザイナー",
                                "・ゲーム開発エンジニア",
                                "・プロジェクトマネージャー",
                                "・ITコンサルタント",
                                "・IoTエンジニア",
                                "・ロボティクスエンジニア",
                                "・その他",
                            ].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
        </div>
        <div className="form-group workplace-group">
          <label htmlFor="workplace">職場</label>
          <input
            id="workplace"
            type="text"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            placeholder="職場を入力してください"
          />
        </div>
        <div className="form-group">
          <label htmlFor="socialLinks">URL</label>
          <label>
                        Twitter, GitHub等のURL
                        <input
                            type="text"
                            value={profile.socialLinks}
                            onChange={(e) =>
                                setProfile({ ...profile, socialLinks: e.target.value })
                            }
                            placeholder="カンマ区切りで入力"
                        />
                    </label>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="update-button"
        >
          {loading ? "更新中..." : "更新する"}
        </button>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileChange;