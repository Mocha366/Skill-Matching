import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";

const ProfileSetup: React.FC = () => {
    const { user } =useAuth();
    const [profile, setProfile] = useState<{
        email:string;
        id: string;
        nickname: string;
        comment: string;
        realName: string;
        age: string;
        iconPhoto: File | string | null; // 修正
        location: string;
        interests: string[];
        qualifications: string[];
        occupation: string;
        workplace: string;
        socialLinks: string;
    }>({
        email: user?.email || "",
        id: "",
        nickname: "",
        comment: "",
        realName: "",
        age: "",
        iconPhoto: null,
        location: "",
        interests: [],
        qualifications: [],
        occupation: "",
        workplace: "",
        socialLinks: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            alert("ログインが必要です");
            return;
        }   

        if (!profile.id || profile.id.length > 15 || !profile.nickname) {
            alert("必須項目を正しく入力してください(IDは15文字以内)");
            return;
        }
        
        setLoading(true);

        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                isProfileComplete: true,
            });

            await setDoc(doc(db, "profiles", user.uid), {
                ...profile,
                createdAt: new Date(),
            })
            
            alert("プロフィールを保存しました！");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("プロフィール保存エラー:", error.message);
            alert("エラー:" + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-setup-page">
            <div className="profile-setup">
                <h1>プロフィール設定</h1>
                <form className="profile-form">
                    <label>
                        メールアドレス(自動入力)
                        <input type="email" value={profile.email} disabled />
                    </label>
                    <label>
                        検索用ID(最大15文字)
                        <input
                            type="text"
                            value={profile.id}
                            onChange={(e) => setProfile({ ...profile, id: e.target.value })}
                            maxLength={15}
                            required
                        />
                    </label>
                    <label>
                        ニックネーム
                        <input
                            type="text"
                            value={profile.nickname}
                            onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        一言コメント
                        <textarea
                            value={profile.comment}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 40) {
                                    setProfile({ ...profile, comment: value });
                                }
                            }}
                        ></textarea>
                        <p>{profile.comment.length}/40</p>
                    </label>
                    <label>
                        本名
                        <input
                            type="text"
                            value={profile.realName}
                            onChange={(e) => setProfile({ ...profile, realName: e.target.value })}
                        />
                    </label>
                    <label>
                        年齢
                        <input
                            type="number"
                            value={profile.age}
                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                        />
                    </label>
                    <label>
                        アイコン写真
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setProfile({ ...profile, iconPhoto: e.target.files?.[0] || null })
                            }
                        />
                    </label>
                    <label>
                        出身
                        <select
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
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
                    </label>
                    <label>
                        興味分野(最大5つ)
                        <div className="tag-selector-container">
                            <div className="selected-tags">
                                {profile.interests.map((tag) => (
                                    <span
                                        key={tag}
                                        className="tag selected"
                                        onClick={() => {
                                            setProfile({
                                                ...profile,
                                                interests: profile.interests.filter((t) => t !== tag),
                                            });
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
                                    "React",
                                ].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`option ${
                                            profile.interests.includes(option) ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                            const selectedTags = profile.interests;
                                            if (selectedTags.includes(option)) {
                                                setProfile({
                                                    ...profile,
                                                    interests: selectedTags.filter((tag) => tag !== option),
                                                });
                                            } else {
                                                if (selectedTags.length >= 5) {
                                                    alert("最大5つまで選択できます");
                                                    return;
                                                }
                                                setProfile({
                                                    ...profile,
                                                    interests: [...selectedTags, option],
                                                });
                                            }
                                        }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </label>
                    <label>
                        所持資格
                    </label>
                    {profile.qualifications.map((qualification: string, index: number) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                                type="text"
                                value={qualification}
                                onChange={(e) => {
                                    const updatedQualifications = [...profile.qualifications];
                                    updatedQualifications[index] = e.target.value;
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
                                    const updatedQualifications = profile.qualifications.filter((_, i) => i !== index);
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
                    <label>
                        職業
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
                    </label>
                    <label>
                        職場/学校名
                        <input
                            type="text"
                            value={profile.workplace}
                            onChange={(e) => setProfile({ ...profile, workplace: e.target.value })}
                        />
                    </label>
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
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "保存中..." : "保存"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;