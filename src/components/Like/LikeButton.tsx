import React, { useState, useEffect } from "react";
import { likeUser } from "./LikeUser"; // Like処理をインポート
import { useAuth } from "../../context/AuthProvider"; // ユーザー認証情報を取得
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface LikeButtonProps {
  targetUserId: string; // LikeされるユーザーのID
}

const LikeButton: React.FC<LikeButtonProps> = ({ targetUserId }) => {
  const { user } = useAuth();  
  const [liked, setLiked] = useState(false);

  // 🔍 Firestore の `likes` コレクションをチェックして、すでに Like 済みか判定
  useEffect(() => {
    if (!user?.uid) return;

    const checkIfLiked = async () => {
      const alreadyLikedQuery = query(
        collection(db, "likes"),
        where("fromUserId", "==", user.uid),
        where("toUserId", "==", targetUserId)
      );

      const querySnapshot = await getDocs(alreadyLikedQuery);
      setLiked(!querySnapshot.empty); // すでに Like していたら `true`
    };

    checkIfLiked();
  }, [user, targetUserId]);

  // ✅ Like ボタンをクリックしたときの処理
  const handleLike = async () => {
    if (!user?.uid) return;
    if (!liked) {
      await likeUser(user.uid, targetUserId); // Firestore に Like を保存 & 通知を送信
      setLiked(true); // UIを更新
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        backgroundColor: liked ? "red" : "white", // 既に Like 済みなら赤
        color: liked ? "white" : "black",
        border: "1px solid black",
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      ❤️
    </button>
  );
};

export default LikeButton;