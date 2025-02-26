import React from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";
import LikeButton from "../../../components/Like/LikeButton";

const Likepage: React.FC = () => {
    return (
        <div className="like-container">
            <header className="like-headerbar">
                <HeaderBar />
            </header>
            <div className="like-contents">
                <div className="like-menu">
                    <Menu />
                </div>
                <div>
                    <LikeButton targetUserId="A2ejNmPFbHeH0ei118vqfWe4Sd13" />
                </div>
            </div>
        </div>
    )
}

export default Likepage;