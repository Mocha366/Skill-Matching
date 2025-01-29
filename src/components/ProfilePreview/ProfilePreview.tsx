import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./ProfilePreview.css";

interface Profile {
  id: string;
  realName: string;
  interests: string;
  location: string;
}

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // ログインしている場合、メールアドレスを取得
      setUserEmail(user.email || null);
    } else {
      // ログアウト状態
      setUserEmail(null);
      setProfile(null);
    }
  });

const ProfilePreview: React.FC = () => {
  const [myInterests, setMyInterests] = useState<string | null>(null);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const myUserId = "8PLnQmXsI2T5XBHExiWdGye1Z2t1"; // 自分の Firestore 上のユーザー ID

  // 自分のプロフィールを取得する
  const fetchMyInterests = async () => {
    setLoading(true);
    try {
      const profileDoc = doc(db, "profiles", myUserId); // profiles コレクションから自分のドキュメントを取得
      const profileSnap = await getDoc(profileDoc);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setMyInterests(data.interests || null); // 自分の interests フィールドを保存
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
    if (!myInterests) return;
    setLoading(true);
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("interests", "==", myInterests)); // interests が一致するドキュメントを検索
      const querySnapshot = await getDocs(q);

      const profiles: Profile[] = querySnapshot.docs
        .filter((doc) => doc.id !== myUserId) // 自分自身を除外
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Profile[];

      setMatchingProfiles(profiles);
    } catch (error) {
      console.error("Error fetching matching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初回に自分の interests を取得
    fetchMyInterests();
  }, []);

  useEffect(() => {
    // interests が更新されたら一致するプロフィールを検索
    if (myInterests) {
      fetchMatchingProfiles();
    }
  }, [myInterests]);

  return (
    <div className="ProfilePreview">
      <div className="text-wrapper">
        {matchingProfiles.map((profile) => (
          <ul key={profile.id}>
            <li>名前: {profile.realName}</li>
            <li>得意分野</li>
            <li>興味分野: {profile.interests}</li>
          </ul>
        ))}
      </div>
      {loading && <p>Loading...</p>}
  </div>
  );
};

export default ProfilePreview;
