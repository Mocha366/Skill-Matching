import React from "react";
import "./HeaderBar.css";
import LogoutButton from "../Login/LogoutButton";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

interface HeaderBarProps {
    unreadCount?: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ unreadCount = 0 }) => {
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
                <a href="/dashboard/About">Skill Matchingについて</a>
                <a href="/dashboard/profile-edit">プロフィール編集</a>
                <a href="/dashboard/News">お知らせ{unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}</a>
            </nav>
            <div className="logout">
                <LogoutButton/>
            </div>
        </div>
    );
};

export default HeaderBar;