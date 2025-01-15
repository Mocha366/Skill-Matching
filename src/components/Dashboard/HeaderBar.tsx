import React from "react";
import "./HeaderBar.css";
import LogoutButton from "../Login/LogoutButton";
import Logo from "../../assets/Logo.png";

const HeaderBar: React.FC = () => {
    return (
        <div className="header-bar">
            <img
                src={Logo}
                alt="Logo"
            />
            <nav>
                <a href="#1">サービス</a>
                <a href="#2">Skill Matchingについて</a>
                <a href="#3">プロフィール</a>
                <a href="#4">お知らせ</a>
            </nav>
            <div>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default HeaderBar;