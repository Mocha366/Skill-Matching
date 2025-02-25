import React from "react";
import "./FooterBar.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const FooterBar: React.FC = () => {
    return (
        <div className="footer-bar">
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
            <nav className="footerbar-nav">
                <a href="/dashboard/About">Skill Matchingについて</a>
                <a href="/dashboard/News">お知らせ</a>

            </nav>
        </div>
    );
};

export default FooterBar;