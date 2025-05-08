import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import ProfileModal from "./ProfileModal";
import LikeButton from "../Like/LikeButton";
import "./ProfilePreview.css";

// アセットフォルダ内の画像をインポート
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import nullicon from "../../assets/Nullicon.png";

interface Profile {
  id: string;
  nickname: string;
  interests: string[];
  iconPhoto: string;
  comment: string;
  age: string;
  occupation: string;
}

const ProfilePreview: React.FC = () => {
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // 自分のプロフィールを取得する
  const getUID = (): string | null => {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      console.error("User not found");
      return null;
    }
  }
  const userUID = getUID();

  const fetchMyInterests = async () => {
    if (!userUID) {
      console.error("User UID is null");
      return;
    }

    setLoading(true);
    try {
      const profileDoc = doc(db, "profiles", userUID); // profiles コレクションから自分のドキュメントを取得
      const profileSnap = await getDoc(profileDoc);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setMyInterests(data.interests || []); // 自分の interests フィールドを保存
      } else {
        console.error("Profile not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // 自分の趣味に一致するプロフィールを取得する
  const fetchMatchingProfiles = async () => {
    if (myInterests.length === 0) return;
    setLoading(true);
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("interests", "array-contains-any", myInterests)); // interests が一致するドキュメントを検索
      const querySnapshot = await getDocs(q);

      const profiles: Profile[] = querySnapshot.docs
        .filter((doc) => doc.id !== userUID)
        .map((doc) => ({
          id: doc.id,
          nickname: doc.data().nickname,
          interests: doc.data().interests,
          iconPhoto: doc.data().iconPhoto,
          comment: doc.data().comment,
          age: doc.data().age,
          occupation: doc.data().occupation,
        })) as Profile[];
      setMatchingProfiles(profiles);
    } catch (error) {
      console.error("Error fetching matching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInterests();
  }, []);

  useEffect(() => {
    fetchMatchingProfiles();
  }, [myInterests]);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const bgColor = window.getComputedStyle(card as HTMLElement).backgroundColor;
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                                      (parseInt(rgb[1]) * 587) +
                                      (parseInt(rgb[2]) * 114)) / 1000);
        if (brightness > 250) {
          (card as HTMLElement).style.color = "#000"; // 背景が明るい場合は黒
        } else {
          (card as HTMLElement).style.color = "#fff"; // 背景が暗い場合は白
        }
      }
    });
  }, [matchingProfiles]);

  const getBackgroundImage = (iconPhoto: string) => {
    switch (iconPhoto) {
      case "/src/assets/icon1.png":
        return icon1;
      case "/src/assets/icon2.png":
        return icon2;
      case "/src/assets/icon3.png":
        return icon3;
      case "/src/assets/icon4.png":
        return icon4;
      case "/src/assets/icon5.png":
        return icon5;
      case "/src/assets/icon6.png":
        return icon6;
      case "/src/assets/icon7.png":
        return icon7;
      case "/src/assets/icon8.png":
        return icon8;
      default:
        return nullicon; // デフォルトの背景画像を設定
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="container">
      <h2>興味が合う人一覧</h2>
      {matchingProfiles.length === 0 ? (
        <p>一致するユーザーがいません</p>
      ) : (
        <div className="grid">
          {matchingProfiles.map(user => (
            <div
              key={user.id}
              className={`card ${user.iconPhoto === "null" ? "null-icon" : ""}`}
              style={{ backgroundImage: `url(${getBackgroundImage(user.iconPhoto)})` }}
              onClick={() => setSelectedProfile(user)}
            >
              <div className="profilepreview-likebutton">
                <LikeButton targetUserId={user.id} />
              </div>
              <p className="nickname"><strong>ニックネーム:</strong> {user.nickname}</p>
              <p className="interests"><strong>興味:</strong> {user.interests.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
      {selectedProfile && (
        <ProfileModal
          isOpen={!!selectedProfile}
          onClose={() => setSelectedProfile(null)}
          profile={selectedProfile}
        />
      )}
    </div>
  );
};

export default ProfilePreview;