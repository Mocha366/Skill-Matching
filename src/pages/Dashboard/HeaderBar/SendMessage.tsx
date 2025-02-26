import React, { useState } from "react";
import SendMessage from "../../../components/messages/sendmessages";
import Conversations from "../../../components/messages/conversations";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";
import "./SendMessage.css";

const ParentComponent: React.FC = () => {
    const [chatWith, setChatWith] = useState<string>("");

    const chatuser = (uid: string) => {
        console.log("chatuser function called with uid:", {uid});
        setChatWith(uid);
        console.log("chatWith state updated to:", {chatWith});
    };

    console.log("Rendering ParentComponent with chatuser:", chatuser);

    return (
        <div>
            <div className="message-headerber">
                <HeaderBar/>
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