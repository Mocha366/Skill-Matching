import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import "./ProfilePreview.css";

interface Profile {
  id: string;
  uid: string;
  realName: string;
  interests: string[];
  location: string;
}

const ProfilePreview: React.FC = (): JSX.Element | null => {
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
//ユーザーのログイン情報を取得する関数
  useEffect(() => {
    // ユーザーのログイン情報を取得
    const auth = getAuth();
    // ユーザーのログイン情報が変更されたら実行されるコールバック関数
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMyUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);
//ユーザープロフィールを取得する関数
useEffect(() => {
  const fetchProfile = async () => {
    if (!myUserId) return;
    setLoading(true);
    try {
      const profilesQuery = query(collection(db, "profiles"), where("uid", "==", myUserId));
      const profilesSnap = await getDocs(profilesQuery);
      const profilesList: Profile[] = profilesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Profile));
      setMatchingProfiles(profilesList);
      const profileDoc = doc(db, "profiles", myUserId); // Firestore の UID と一致するドキュメントを取得
      const profileSnap = await getDoc(profileDoc);

      if (profileSnap.exists()) {
        console.log("Profile Data:", profileSnap.data());
        setProfile({ id: profileSnap.id, ...profileSnap.data() } as Profile);
      } else {
        console.log("No profile found for UID:", myUserId);
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (myUserId) {
    fetchProfile();
  }
}, [myUserId]);
//表示の部分
  return (
    <div className="profile-preview">
      <h2>Matching Profiles</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {matchingProfiles.map((profile) => (
            <li key={profile.id}>
              <p>Name: {profile.realName}</p>
              <p>Location: {profile.location}</p>
              <p>Interests: {profile.interests.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePreview;
