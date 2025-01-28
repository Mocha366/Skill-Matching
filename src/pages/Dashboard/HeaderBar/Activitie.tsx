import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthProvider"
import { db } from "../../../firebase";
import "./Activitie.css" 
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";

interface Notification {
  id: string;
  userId: string;
  message: string;
  time: any;
  read: boolean;
  type: string;
  senderId: string;
  deleted: false;
}

const Activitie: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("userId", "==", user.uid), where("deleted", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      setNotifications(fetchedNotifications);
    })

    return () => unsubscribe();
  }, [user]);

  // 通知を既読にする
  const markAsRead = async (notificationId: string) => {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, { read: true });
  };

  // 通知を削除する
  const markAsDeleted = async (notificationId: string) => {
    if (window.confirm("この通知削除しますか？")) {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { deleted: true });
    }
  };

  return (
    <div className="activitie-page">
      <HeaderBar/>
      <div className="activitie-menu">
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
                  key={notification.id}
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
                      送信者: {notification.senderId} | {notification.time.toDate().toLocaleString()}
                    </small>
                  </div>
                  <div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
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
                      onClick={() => markAsDeleted(notification.id)}
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
  );
};

export default Activitie;