import React from "react";
import "./HeaderBar.css";
import LogoutButton from "../Login/LogoutButton";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const HeaderBar: React.FC = () => {
    return (
        <div className="header-bar">
            <div className="logo-container">
                <Link to="/dashboard" className="logo-link">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="logo-image"
                    />
                    <span className="site-name">SM</span>
                </Link>
            </div>
            <nav>
                <a href="#1">サービス</a>
                <a href="/skill-matching">Skill Matchingについて</a>
                <a href="/profile-edit">プロフィール編集</a>
                <a href="#4">お知らせ</a>
            </nav>
            <div>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default HeaderBar;