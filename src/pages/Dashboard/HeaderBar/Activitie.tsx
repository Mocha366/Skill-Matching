import React, { useState } from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
//import LogoutButton from "../Login/LogoutButton";
//import Logo from "../../assets/Logo.png";
//import { Link } from "react-router-dom";
const Activities: React.FC = () => {
    //useStateを使って通知の一覧を管理
    //useStateの引数にnotificationsの初期値を渡す
    //setNotificationsはnotificationsの値を更新するための関数
  const [notifications, setNotifications] = useState<{ id: number; message: string; time: string }[]>([
    { id: 1, message: "システムアップデートが完了しました", time: "2025-01-17 10:00" },
    { id: 2, message: "新しいメッセージがあります", time: "2025-01-17 11:00" },
  ]);

  // 新しい通知を追加する関数
  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: "新しい通知が追加されました!",
      time: new Date().toLocaleString(),
    };
    setNotifications([newNotification, ...notifications]);
  };

  // 通知を削除する関数
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <HeaderBar />
      <h1>通知一覧</h1>
      <button
        onClick={addNotification}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        新しい通知を追加
      </button>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{notification.message}</p>
              <small style={{ color: "#666" }}>{notification.time}</small>
            </div>
            <button
              onClick={() => deleteNotification(notification.id)}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
