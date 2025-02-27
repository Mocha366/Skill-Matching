import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthProvider";

const useUnreadNotifications = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("userId", "==", user.uid), where("read", "==", false), where("deleted", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size); // 🔥 未読通知数をセット
    });

    return () => unsubscribe();
  }, [user]);

  return unreadCount;
};

export default useUnreadNotifications;