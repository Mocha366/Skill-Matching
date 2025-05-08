import React from "react";
import "./LoginFooterList.css";

interface LoginFooterListProps {
    setActiveComponent: (component: "login" | "about" | "help") => void;
}

const LoginFooterList: React.FC<LoginFooterListProps> = ({setActiveComponent}) => {
    return (
        <div>
            <nav className="footerbar-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("about"); }}>
                    ・Skill Matchingについて
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("help"); }}>
                    ・ヘルプ
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("login"); }}>
                    ・ログインに戻る
                </a>
            </nav>
        </div>
    )
}

export default LoginFooterList;