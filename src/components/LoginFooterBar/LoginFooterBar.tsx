import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./FooterBar.css";
import FooterList from "./LoginFooterList"

interface FooterBarProps {
    setActiveComponent: (component: "login" | "about" | "help") => void;
}

const FooterBar: React.FC<FooterBarProps> = ({ setActiveComponent }) => {
    return (
        <div className = "footer-bar">
            <div className="footerbar-logo">
                <Link to="/dashboard" className="logo-link">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="logo-image"
                    />
                    <span className="site-name">SM</span>
                </Link>
            </div>
            <div className="footerbar-list">
                <FooterList setActiveComponent={setActiveComponent} />
            </div>
        </div>
    )
}

export default FooterBar;