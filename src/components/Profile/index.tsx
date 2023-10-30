import React, { useState } from "react";
import styles from '../Links/LinksForm.module.css';
import style from '../Profile/Profile.module.css';

const Profile = ({ profileData, setProfileData, image, setImage }: any) => {
  const [formData, setFormData] = useState(profileData);

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleFieldChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    setProfileData(formData);
  };

  const isSaveDisabled = !formData.firstName || !formData.lastName;

  return (
    <div className="profile" style={{width: '-webkit-fill-available'}}>
      <div className={styles.linksHeader}>Profile</div>
      <div className={styles.linksSub}>
        Add your details to create a personal touch to your profile.
      </div>
      <div className={style.profilePic}>
        <div className={styles.linksSub}>Profile picture</div>
        <div className={style.imageInput}>
          {/* <div style={{color: '#C6D752'}}>+ Upload Image</div> */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && (
            <img
              src={image}
              alt="Profile Image"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
        <div className={styles.linksSub}>
          Image must be below 1024x1024px. Use PNG or JPG format.
        </div>
      </div>

      <div className={style.formFields}>
        <div className={style.inputData}>
          <div className={styles.linksSub}>First name*</div>
          <input
            className={style.field}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleFieldChange}
          />
        </div>

        <div className={style.inputData}>
          <div className={styles.linksSub}>Last name*</div>
          <input
            className={style.field}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleFieldChange}
          />
        </div>
        <div className={style.inputData}>
          <div className={styles.linksSub}>Email</div>
          <input
            className={style.field}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <div className={style.saveDiv}>
        <button
          className={`${style.saveBtn} ${
            isSaveDisabled ? style.saveBtnDisabled : ""
          }`}
          onClick={handleSaveClick}
          disabled={isSaveDisabled}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
