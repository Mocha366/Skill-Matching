import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore";


const getUserNickname = async (userId: string) => {
    try {
        const userRef = doc(db, "profiles", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data().nickname;
        } else {
            return "Unknown User";
        }
    } catch (error) {
        console.error("ニックネームの取得に失敗:",error);
        return "Unknown User";
    }
};

export const likeUser = async (fromUserId: string, toUserId: string, ) => {
    try {
        const already = query(collection(db, "likes"), where("fromUserId", "==", fromUserId), where("toUserId", "==", toUserId));
        const querySnapshot = await getDocs(already);

        if (!querySnapshot.empty) {
            console.log("既にライクしています！");
            return;
        }

        const fromUserName = await getUserNickname(fromUserId);

        await addDoc(collection(db, "likes"), {
            fromUserId,
            toUserId,
            createdAt: serverTimestamp(),
        });

        console.log("ライクしました！");

        await addDoc(collection(db, "notifications"), {
            userId: toUserId,
            senderId: fromUserId,
            message: `あなたは${fromUserName}からライクされました！`,
            type: "like",
            time: serverTimestamp(),
            read: false,
            deleted: false,
        });
    } catch (error) {
        console.error("ライクに失敗しました:", error);
    }
}