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
            <nav className="headerbar-nav">
                <a href="/dashboard/Service">サービス</a>
                <a href="/dashboard/skill-matching">Skill Matchingについて</a>
                <a href="/dashboard/profile-edit">プロフィール編集</a>
                <a href="/dashboard/Activitie">お知らせ</a>
            </nav>
            <div>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default HeaderBar;