import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../src/firebase";
import "./ProfilePreview.css";

interface Profile {
  id: string;
  realName: string;
  interests: string[];
  location: string;
}

const ProfilePreview: React.FC = () => {
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [myUserId, setMyUserId] = useState<string | null>(null);

  // ログインしているユーザーのIDを取得する
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMyUserId(user.uid);
        fetchMyInterests(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // 自分のプロフィールを取得する
  const fetchMyInterests = async (userId: string) => {
    setLoading(true);
    try {
      const profileDoc = doc(db, "profiles", userId); // profiles コレクションから自分のドキュメントを取得
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
        .filter((doc) => doc.id !== myUserId) // 自分自身を除外
        .map((doc) => ({
          id: doc.id,
          realName: doc.data().realName,
          interests: doc.data().interests,
          location: doc.data().location,
        }));

      setMatchingProfiles(profiles);
    } catch (error) {
      console.error("Error fetching matching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // interests が更新されたら一致するプロフィールを検索
    if (myInterests.length > 0) {
      fetchMatchingProfiles();
    }
  }, [myInterests]);

  return (
    <div>
      <h1>Matching Profiles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {myInterests.length > 0 ? (
            <div>
              <h2>Your Interests:</h2>
              <p>{myInterests.join(", ")}</p>
            </div>
          ) : (
            <p>No interests found for your profile.</p>
          )}
          <h2>Matching Profiles:</h2>
          {matchingProfiles.length > 0 ? (
            <ul>
              {matchingProfiles.map((profile) => (
                <li key={profile.id}>
                  <strong>{profile.realName}</strong> - Interests: {profile.interests.join(", ")}, Location: {profile.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching profiles found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePreview;
