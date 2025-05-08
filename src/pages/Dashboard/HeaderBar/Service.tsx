import React from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import FooterBar from "../../../components/Footer/FooterBar";
import Menu from "../../../components/Menu";
import Background from "../../../components/Background";
import "./Service.css"


const Service: React.FC = () => {
    return (
        <>
            <div className="service-container">
                <header className="service-header">
                    <HeaderBar />
                </header>
                <Background />
                <div className="service-contents">
                    <div className="service-menu">
                        <Menu/>
                    </div>
                    <div className="test">
                        
                    </div>
                </div>
                <footer>
                    <FooterBar />
                </footer>
            </div>
        </>
    );
};

export default Service;