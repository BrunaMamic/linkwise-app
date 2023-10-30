import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import ProfileLinkForm from '../components/Links/index';
import MobilePhoneOutline from '../components/PhoneOutline/index';
import Profile from '../components/Profile/index';
import Navbar from '../components/Navbar/index';
import Preview from '../components/Preview/index';
import { setLazyProp } from "next/dist/server/api-utils";

const Home = () => {
  const [showLinks, setShowLinks] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [profileLinks, setProfileLinks] = useState([]);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });
  const [image, setImage] = useState(null);

  const [showBackButton, setShowBackButton] = useState(false);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  const handleOverviewClick = () => {
    setShowLinks(false);
    setShowProfile(false);
    setShowOverview(true);
    setShowBackButton(true);
    setShowCopyToClipboard(true);
  };

  const handleLinksClick = () => {
    setShowLinks(true);
    setShowProfile(false);
    setShowOverview(false);
    setShowBackButton(false);
    setShowCopyToClipboard(false);
  };

  const handleProfileClick = () => {
    setShowLinks(false);
    setShowProfile(true);
    setShowOverview(false);
    setShowBackButton(false);
    setShowCopyToClipboard(false);
  };

  const handleBackClick = () => {
    handleLinksClick();
  };

  const handleShareLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mobile Phone Outline</title>
        <meta name="description" content="Mobile Phone Outline" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <Navbar
        showLinks={showLinks}
        showProfile={showProfile}
        showOverview={showOverview}
        showBackButton={showBackButton}
        showCopyToClipboard={showCopyToClipboard}
        handleLinksClick={handleLinksClick}
        handleProfileClick={handleProfileClick}
        handleOverviewClick={handleOverviewClick}
        handleBackClick={handleBackClick}
        handleShareLink={handleShareLink}
      />
      <div className={styles.main}>
        {showOverview ? (
          <Preview
            profileLinks={profileLinks}
            profileData={profileData}
            image={image}
          />
        ) : showLinks ? (
          <div className={styles.linkDiv}>
            <div className={styles.mobileDiv}>
              <MobilePhoneOutline
                links={profileLinks}
                profileData={profileData}
                image={image}
              />
            </div>
            <div className={styles.linksDiv}>
              <ProfileLinkForm
                profileLinks={profileLinks}
                setProfileLinks={setProfileLinks}
              />
            </div>
          </div>
        ) : (
          <div className={styles.linkDiv}>
            <div className={styles.mobileDiv}>
              <MobilePhoneOutline
                links={profileLinks}
                profileData={profileData}
                image={image}
              />
            </div>
            <div className={styles.linksDiv}>
              <Profile
                profileData={profileData}
                setProfileData={setProfileData}
                image={image}
                setImage={setImage}
              />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
