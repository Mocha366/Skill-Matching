import LoginHeaderBar from "../components/Login/LoginHeaderBar";
import EmailPasswordLogin from "../components/Login/EmailPasswordLogin";
import "./Login.css"

const LoginPage: React.FC = () => {
    return(
        <>
        <div className="loginPage-container">
            <div>
                <LoginHeaderBar />
            </div>
            <div className="loginPage-contents">
                <EmailPasswordLogin />
            </div>
        </div>
        </>
    );
};

export default LoginPage;