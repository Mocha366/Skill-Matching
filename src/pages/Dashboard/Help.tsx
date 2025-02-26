import FooterBar from "../../components/Footer/FooterBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Helpcomp from "../../components/Help";
import Menu from "../../components/Menu";


const Help: React.FC = () => {
    return (
        <div className="Help-page">
            <div className="Help-headerbar">
                <HeaderBar />
            </div>
            <div className="Help-menu">
                <Menu />
            </div>
            <div className="Help-container">
                <Helpcomp />
            </div>
            <div>
                <FooterBar />
            </div>
        </div>
    )
};

export default Help;