import React from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import FooterBar from "../../../components/Footer/FooterBar";
import Menu from "../../../components/Menu";


const Service: React.FC = () => {
    return (
        <div className="service-page">
            <HeaderBar />
            <div className="service-Menu">
                <Menu/>
            </div>
            <div className="service-container">
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
                <button className="start-button">始める</button>
            </div>
            <div>
                <FooterBar />
            </div>
        </div>
    );
};

export default Service;