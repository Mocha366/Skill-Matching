import React from "react";
import "./FooterList.css";

interface FooterListProps {
    setActiveComponent: (component: "login" | "about" | "help") => void;
}

const FooterList: React.FC<FooterListProps> = ({setActiveComponent}) => {
    return (
        <div>
            <nav className="footerbar-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("about"); }}>
                    Skill Matchingについて
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("help"); }}>
                    ヘルプ
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveComponent("login"); }}>
                    ログインに戻る
                </a>
            </nav>
        </div>
    )
}

export default FooterList;