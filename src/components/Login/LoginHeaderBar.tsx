import React from "react";
import LogoutButton from "./LogoutButton";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import "./LoginHeaderBar.css"

const LoginHeaderBar: React.FC = () => {
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
            <div className="headerbar-logout">
                <LogoutButton/>
            </div>
        </div>
    );
}

export default LoginHeaderBar;