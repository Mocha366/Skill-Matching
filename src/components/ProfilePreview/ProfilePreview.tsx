import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import "./ProfilePreview.css";

interface Profile {
  id: string;
  realName: string;
  interests: string[];
  location: string;
}

const ProfilePreview: React.FC = (): JSX.Element | null => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [Interests, setInterests] = useState<string[]>([]);
  const [matchingProfiles, setMatchingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [myUserId, setMyUserId] = useState<string | null>(null); // 自分の Firestore 上のユーザー ID

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setMyUserId(user.uid);
        fetchUserProfile(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (uid: string) => {
    setLoading(true);
    try {
      const profileDoc = doc(db, "profiles", uid);
      const profileSnap = await getDoc(profileDoc);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setInterests(data.interests || []);
        fetchMatchingProfiles(data.interests || []);
      } else {
        console.error("Profile not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchingProfiles = async (interests: string[]) => {
    if (interests.length === 0) return;
    setLoading(true);
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("interests", "array-contains-any", interests));
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
