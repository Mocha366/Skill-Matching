import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import LikeButton from "./Like/LikeButton";

interface Profile {
    id: string;
    nickname: string;
    interests: string[];
}

interface SearchProps {
    setShowProfilePreview: (show: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ setShowProfilePreview }) => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<Profile[] | null>(null);

    const handleSearch = async () => {
        if (!input.trim()) return;

        const searchTerm = input.trim();
        const profilesRef = collection(db, "profiles");

        try {
            let q;
            if (searchTerm.startsWith("@")) { // ID検索
                const id = searchTerm.slice(1); // "@"を除去
                q = query(profilesRef, where("id", "==", id));
            } else if (searchTerm.startsWith("#")) { // タグ検索
                const tag = searchTerm.slice(1); // "#"を除去
                q = query(profilesRef, where("interests", "array-contains", tag));
            } else {
                alert("@ または # で始めてください。");
                return;
            }

            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                nickname: doc.data().nickname,
                interests: doc.data().interests || [],
            })) as Profile[];

            setResults(users);
            setShowProfilePreview(false); //検索時にProfilePreviewを非表示に
        } catch (error) {
            console.error("検索エラー:", error);
            alert("検索に失敗しました。");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleSearch();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if(value === ""){ //検索バーがクリアされたら元のリストを表示
            setResults(null);
            setShowProfilePreview(true);
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="@ID または #タグを入力"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>検索</button>

            <div>
                {results !== null && (
                    results.length > 0 ? (
                        <div className="grid">
                            {results.map((user) => (
                                <div key={user.id} className="card">
                                    <div className="profileview-like">
                                        <LikeButton targetUserId={user.id} />
                                    </div>
                                    <p><strong>ニックネーム:</strong> {user.nickname}</p>
                                    <p><strong>興味:</strong> {user.interests.join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>該当するユーザーがいません。</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Search;