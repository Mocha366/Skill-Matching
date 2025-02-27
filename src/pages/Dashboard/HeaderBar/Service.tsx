import React from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import FooterBar from "../../../components/Footer/FooterBar";
import Menu from "../../../components/Menu";
import Background from "../../../components/Background";


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
                        <h1>さあああああああああああああああああああびす</h1>
                        <p>
                            わたしたちはエンジニア同士の恋を応援するアプリを作りました。
                            これは、エンジニア同士のマッチングアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                        </p>
                        <p>
                            あなたの理想のエンジニアと出会うためのアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                            あなたの理想のエンジニアと出会うためのアプリです。
                        </p>
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