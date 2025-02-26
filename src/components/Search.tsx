import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Search: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!input.trim()) return;

        const searchTerm = input.trim();
        const profilesRef = collection(db, "profiles");

        try {
            if (searchTerm.startsWith("@")) {
                // ID検索
                const id = searchTerm.slice(1); // "@"を除去
                const q = query(profilesRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);

                const users = querySnapshot.docs.map((doc) => doc.data());
                setResults(users);
            } else if (searchTerm.startsWith("#")) {
                // タグ検索
                const tag = searchTerm.slice(1); // "#"を除去
                const q = query(profilesRef, where("interests", "array-contains", tag));
                const querySnapshot = await getDocs(q);

                const users = querySnapshot.docs.map((doc) => doc.data());
                setResults(users);
            } else {
                alert("@ または # で始めてください。");
            }
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

    return (
        <div>
            <input
                type="text"
                placeholder="@ID または #タグを入力"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>検索</button>
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <strong>{result.nickname}</strong> (ID: {result.id})
                                <p>興味分野: {result.interests?.join(", ") || "なし"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>該当するユーザーがいません。</p>
                )}
            </div>
        </div>
    );
};

export default Search;