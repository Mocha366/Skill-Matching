import { useAuth } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../components/HeaderBar/HeaderBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Menu from "../../components/Menu";
import Search from "../../components/Search";
import FooterBar from "../../components/Footer/FooterBar";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import Background from "../../components/Background";
import { useState } from "react";

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [showProfilePreview,setShowProfilePreview] = useState(true);

    if (loading) {
        return <p>読み込み中...</p>
    }

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <>
            <div className="dashboard-container">
                <header className="dashboard-headerbar">
                    <HeaderBar/>
                </header>
                <Background />
                <div className="dashboard-contents">
                    <div className="dashboard-menu">
                        <Menu/>
                    </div>
                    <div className="dashboard-main">
                        <div className="dashboard-search">
                            <Search setShowProfilePreview={setShowProfilePreview} />
                        </div>
                        {showProfilePreview &&(
                            <div className="dashboard-profile-preview">
                                <ProfilePreview />
                            </div>
                        )}
                    </div>
                </div>
                <footer>
                    <FooterBar />
                </footer>
            </div>
        </>
    );
};

export default Dashboard;