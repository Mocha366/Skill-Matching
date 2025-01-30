import HeaderBar from "../components/HeaderBar/HeaderBar";
import EmailPasswordLogin from "../components/Login/EmailPasswordLogin";
import "./Login.css"

const LoginPage: React.FC = () => {
    return(
        <>
        <div className="loginPage-container">
            <div>
                <HeaderBar />
            </div>
            <div className="loginPage-contents">
                <EmailPasswordLogin />
            </div>
        </div>
        </>
    );
};

export default LoginPage;