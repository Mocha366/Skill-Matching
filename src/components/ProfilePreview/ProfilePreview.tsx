import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./ProfilePreview.css";
import LikeButton from "../Like/LikeButton";

interface Profile {
  id: string;
  nickname: string;
  interests: string[];
}

const ProfilePreview: React.FC = () => {
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

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
        if (brightness > 125) {
          (card as HTMLElement).style.color = "#000"; // 背景が明るい場合は黒
        } else {
          (card as HTMLElement).style.color = "#fff"; // 背景が暗い場合は白
        }
      }
    });
  }, [matchingProfiles]);

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
            <div key={user.id} className="card">
              <div className="profileview-like">
                <LikeButton targetUserId={user.id} />
              </div>
              <p><strong>ニックネーム:</strong> {user.nickname}</p>
              <p><strong>興味:</strong> {user.interests.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePreview;