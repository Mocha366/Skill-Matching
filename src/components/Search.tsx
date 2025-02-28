import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import LikeButton from "./Like/LikeButton";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import "./Search.css"
import ProfileModal from "./ProfilePreview/ProfileModal";

import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/icon7.png";
import icon8 from "../assets/icon8.png";
import nullicon from "../assets/Nullicon.png";

interface Profile {
    id: string;
    nickname: string;
    interests: string[];
    iconPhoto: string;
    comment: string;
    age: string;
    occupation: string;
}

interface SearchProps {
    setShowProfilePreview: (show: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ setShowProfilePreview }) => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<Profile[] | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

    const getBackgroundImage = (iconPhoto: string) => {
        switch (iconPhoto) {
            case "/src/assets/icon1.png":
                return icon1;
            case "/src/assets/icon2.png":
                return icon2;
            case "/src/assets/icon3.png":
                return icon3;
            case "/src/assets/icon4.png":
                return icon4;
            case "/src/assets/icon5.png":
                return icon5;
            case "/src/assets/icon6.png":
                return icon6;
            case "/src/assets/icon7.png":
                return icon7;
            case "/src/assets/icon8.png":
                return icon8;
            default:
                return nullicon;
        }
    };

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
                iconPhoto: doc.data().iconPhoto,
                comment: doc.data().comment,
                age: doc.data().age,
                occupation: doc.data().occupation,
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
            <div className="search-bar">
                <TextField
                    label="検索"
                    variant="outlined"
                    fullWidth
                    placeholder="@ID または #タグを入力"
                    value={input}
                    onChange={ handleInputChange }
                    onKeyDown={ handleKeyDown }
                    sx={{
                        width: "350px",
                        marginBottom: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.7)", // 透明度70%の白色
                        borderRadius: "16px", // 角丸
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.7)", // 枠線の透明度を調整
                                borderRadius: "16px"
                            },
                            "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.9)", // ホバー時の枠線
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#ffffff", // フォーカス時の枠線を白に
                            },
                            
                        },
                        "& .MuiInputBase-input": {
                            color: "#000", // 入力文字を黒に
                        },
                        "& .MuiInputLabel-root": {
                            color: "rgba(0, 0, 0, 0.6)", // ラベルの透明度を調整
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#000", // フォーカス時のラベル色
                        },
                    }}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div className="search-result">
                {results !== null && (
                    results.length > 0 ? (
                        <div className="grid">
                            {results.map((user) => (
                                <div
                                    key={user.id}
                                    className={`card ${user.iconPhoto === "null" ? "null-icon" : ""}`}
                                    style={{ backgroundImage: `url(${getBackgroundImage(user.iconPhoto)})` }}
                                    onClick={() => setSelectedProfile(user)}
                                >
                                    <div className="profileview-like">
                                        <LikeButton targetUserId={user.id} />
                                    </div>
                                    <p className="nickname"><strong>ニックネーム:</strong> {user.nickname}</p>
                                    <p className="interests"><strong>興味:</strong> {user.interests.join(", ")}</p>
                                </div>
                            ))}
                            {selectedProfile && (
                                <ProfileModal
                                    isOpen={!!selectedProfile}
                                    onClose={() => setSelectedProfile(null)}
                                    profile={selectedProfile}
                                />
                            )}
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