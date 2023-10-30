import React from 'react';
import styles from './Preview.module.css'; 
import MobilePhoneOutline from '../PhoneOutline';

const Preview = ({ profileLinks, profileData, image, handleBackClick, handleShareLink }:any) => {
  return (
    <div className={styles.previewContainer}>
      <div className="mobile-phone-container">
        <MobilePhoneOutline
          links={profileLinks}
          profileData={profileData}
          image={image}
          isPreview={true}
        />
      </div>
    </div>
  );
};

export default Preview;
