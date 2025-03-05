import React, { useState } from 'react';
import ProfileEdit from '../../../components/Profile/ProfileEdit';
import ProfileChange from '../../../components/Profile/Profilechange';

const Profile: React.FC = () => {
    const [flg, setFlg] = useState<boolean>(true);

    return (
        <div className="profile-container">
            
            {flg ? <ProfileEdit setFlg={setFlg} /> : <ProfileChange setFlg={setFlg} />}

        </div>
    );
};

export default Profile;