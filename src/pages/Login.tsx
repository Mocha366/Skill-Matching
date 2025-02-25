import React, { useState } from "react";
import LoginHeaderBar from "../components/Login/LoginHeaderBar";
import EmailPasswordLogin from "../components/Login/EmailPasswordLogin";
import LoginFooterBar from "../components/LoginFooterBar/LoginFooterBar";
import Aboutcomp from "../components/About";
import Helpcomp from "../components/Help";
import "./Login.css"

const LoginPage: React.FC = () => {

    const [activeComponent, setActiveComponent] = useState<"login" | "about" | "help">("login");

    return(
        <>
        <div className="loginPage-container">
            <header className="loginPage-headerbar">
                <LoginHeaderBar />
            </header>

            <main className="loginPage-contents">
                {activeComponent === "login" && <EmailPasswordLogin />}
                {activeComponent === "about" && <Aboutcomp />}
                {activeComponent === "help" && <Helpcomp />}
            </main>

            <footer className="loginPage-footerbar">
                <LoginFooterBar setActiveComponent={setActiveComponent} />
            </footer>
        </div>
        </>
    );
};

export default LoginPage;