import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./LoginFooterBar.css";
import LoginFooterList from "./LoginFooterList"

interface LoginFooterBarProps {
    setActiveComponent: (component: "login" | "about" | "help") => void;
}

const LoginFooterBar: React.FC<LoginFooterBarProps> = ({ setActiveComponent }) => {
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
                <LoginFooterList setActiveComponent={setActiveComponent} />
            </div>
        </div>
    )
}

export default LoginFooterBar;