import React, { useState } from "react";
import SendMessage from "../../../components/messages/sendmessages";
import Conversations from "../../../components/messages/conversations";
import Menu from "../../../components/Menu";
import "./SendMessage.css";
import Logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";

const ParentComponent: React.FC = () => {
    const [chatWith, setChatWith] = useState<string>("");

    const chatuser = (uid: string) => {
        setChatWith(uid);
    };

    return (
        <div className="message-page">
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
            <div className="message-container">
                <div className="message-menu">
                    <Menu/>
                </div>
                <Conversations chatuser={chatuser} />
                <SendMessage chatWith={chatWith} chatuser={chatuser} />
            </div>
        </div>
    );
};

export default ParentComponent;