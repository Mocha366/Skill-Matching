import React, { useState } from 'react';
import ProfileEdit from '../../../components/Profile/ProfileEdit';
import ProfileChange from '../../../components/Profile/Profilechange';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Background from '../../../components/Background';
import "./Profile.css"

const Profile: React.FC = () => {
    const [flg, setFlg] = useState<boolean>(true);

    return (
        <div className="profile-container">
            <header className="profile-headerbar">
                <HeaderBar />
            </header>
            <Background />
            {flg ? <ProfileEdit setFlg={setFlg} /> : <ProfileChange setFlg={setFlg} />}

        </div>
    );
};

export default Profile;