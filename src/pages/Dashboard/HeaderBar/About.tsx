import React from "react";
import "./About.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Menu from "../../../components/Menu";
import FooterBar from "../../../components/Footer/FooterBar";
import Aboutcomp from "../../../components/About";

const About: React.FC = () => {
    return (
        <div className="About-container">
            <div className="About-headerbar">
                <HeaderBar/>
            </div>
            <div className="About-contents">
                <div className="About-menu">
                    <Menu />
                </div>
                <Aboutcomp />
            </div>
            <footer>
                <FooterBar />
            </footer>
        </div>
    );
};

export default About;