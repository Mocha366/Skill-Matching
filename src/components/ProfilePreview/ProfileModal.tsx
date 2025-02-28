import React from 'react';
import './ProfileModal.css';
import nullicon from '../../assets/nullicon.png'; // nulliconのインポート

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    nickname: string;
    interests: string[];
    iconPhoto: string | null; // iconPhotoがnullの可能性がある
    comment: string;
    age: string;
    occupation: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const backgroundImage = profile.iconPhoto ? profile.iconPhoto : nullicon;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{profile.nickname}</h2>
        <p><strong>興味:</strong> {profile.interests.join(", ")}</p>
        <p><strong>コメント:</strong> {profile.comment}</p>
        <p><strong>年齢:</strong> {profile.age}</p>
        <p><strong>職業:</strong> {profile.occupation}</p>
      </div>
    </div>
  );
};

export default ProfileModal;