import { useAuth } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../components/HeaderBar/HeaderBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Menu from "../../components/Menu";

const Dashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

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
                <div>
                    <HeaderBar/>
                </div>
                <div className="dashboard-contents">
                    <div className="dashboard-menu">
                        <Menu/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;