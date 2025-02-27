import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs, getDoc, DocumentData, QuerySnapshot } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider";
import { db } from "../../../firebase";
import "./News.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";
import FooterBar from "../../../components/Footer/FooterBar";

interface Notification {
  userId: string;
  message: string;
  time: any;
  read: boolean;
  type: string;
  senderId: string;
  deleted: false;
  senderNickname?: string; //送信者のニックネーム
}

const News: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("userId", "==", user.uid), where("deleted", "==", false));

    const fetchNotifications = async (snapshot: QuerySnapshot<DocumentData>) => {
      const fetchedNotifications = snapshot.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      })) as Notification[];

      //senderId から nickname を取得する
      const updatedNotifications = await Promise.all(
        fetchedNotifications.map(async (notification) => {
          const senderRef = doc(db, "profiles", notification.senderId);
          const senderSnap = await getDoc(senderRef);

          return {
            ...notification,
            senderNickname: senderSnap.exists() ? senderSnap.data().nickname : "運営より",
          };
        })
      );

      setNotifications(updatedNotifications);
    };

    const unsubscribe = onSnapshot(q, (snapshot) => {
      fetchNotifications(snapshot);
    });

    return () => unsubscribe(); // ✅ これで型エラーが解消！
  }, [user]);

  const markAsRead = async (userId: string, time: any) => {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("time", "==", time)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const notificationRef = doc(db, "notifications", querySnapshot.docs[0].id);
      await updateDoc(notificationRef, { read: true });
    }
  };

  const markAsDeleted = async (userId: string, time: any) => {
    if (window.confirm("この通知を削除しますか？")) {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        where("time", "==", time)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const notificationRef = doc(db, "notifications", querySnapshot.docs[0].id);
        await updateDoc(notificationRef, { deleted: true });
      }
    }
  };

  return (
    <div className="News-page">
      <header className="News-headerbar">
        <HeaderBar/>
      </header>
      <div className="News-contents">
        <div className="News-menu">
          <Menu/>
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
          <h1>お知らせ</h1>
          <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
            {notifications.length === 0 ? (
              <p>現在お知らせはありません。</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={`${notification.userId}_${notification.time.seconds}`}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      backgroundColor: notification.read ? "#fff" : "#e6f7ff",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>{notification.message}</p>
                      <small style={{ color: "#666" }}>
                        送信者: {notification.senderNickname || "Unknown"} | {notification.time.toDate().toLocaleString()}
                      </small>
                    </div>
                    <div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.userId, notification.time)}
                          style={{
                            padding: "5px 10px",
                            fontSize: "12px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        >
                          既読にする
                        </button>
                      )}
                      <button
                        onClick={() => markAsDeleted(notification.userId, notification.time)}
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          backgroundColor: "#FF0000",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        削除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div>
        <FooterBar />
      </div>
    </div>
  );
};

export default News;