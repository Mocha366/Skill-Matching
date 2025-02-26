import React, { useState } from "react";
import SendMessage from "../../../components/messages/sendmessages";
import Conversations from "../../../components/messages/conversations";

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
            <Conversations chatuser={chatuser} />
            <SendMessage chatWith={chatWith} chatuser={chatuser} />
        </div>
    );
};

export default ParentComponent;