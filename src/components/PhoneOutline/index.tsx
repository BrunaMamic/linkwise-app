import React from "react";
import styles from '../PhoneOutline/MobilePhoneOutline.module.css';

const MobilePhoneOutline = ({
  links,
  profileData,
  image,
  isPreview = false,
}: any) => {
  const maxLinks = 5;
  const displayedLinks = links.slice(0, maxLinks);
  console.log(profileData);

  const platformColors: any = {
    GitHub: "#1A1A1A",
    Facebook: "#2442AC",
    LinkedIn: "#2D68FF",
    Twitter: "#43B7E9",
    YouTube: "#EE3939",
    Codewars: "#8A1A50",
    freeCodeCamp: "#302267",
    "Dev.to": "#333",
    Twitch: "#EE3FC8",
  };

  const platformIcons: any = {
    GitHub: "/static/icons/github.svg",
    Facebook: "/static/icons/facebook.svg",
    LinkedIn: "/static/icons/linkedin.svg",
    Twitter: "/static/icons/twitter.svg",
    YouTube: "/static/icons/youtube.svg",
    Codewars: "/static/icons/codewars.svg",
    Twitch: "/static/icons/twitch.svg",
    "Dev.to": "/static/icons/devto.svg",
    freeCodeCamp: "/static/icons/freecodecamp.svg",
  };

  return (
    <div className={styles.mobilePhone}>
      {!isPreview ? (
        <div className={styles.profileImagePlaceholder}>
          {image ? (
            <div className={styles.circularImageContainer}>
              <img
                src={image}
                alt="Profile Image"
                className={styles.circularImage}
              />
            </div>
          ) : (
            <img src={"/static/icons/profilePic.svg"} />
          )}
        </div>
      ) : (
        image && (
          <div className={styles.profileImagePlaceholder}>
            <div className={styles.circularImageContainer}>
              <img
                src={image}
                alt="Profile Image"
                className={styles.circularImage}
              />
            </div>
          </div>
        )
      )}

      <div className={styles.namePlaceholders}>
        {profileData.firstName ? (
          <div>
            {profileData.firstName} {profileData.lastName}
          </div>
        ) : (
          !isPreview && <div className={styles.namePlaceholder}></div>
        )}
        {profileData.email ? (
          <div className={styles.email}>{profileData.email}</div>
        ) : (
          !isPreview && <div className={styles.emailPlaceholder}></div>
        )}
      </div>
      <div className={styles.links}>
        {displayedLinks.map((link: any, index: any) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            className={styles.link}
            style={{ backgroundColor: platformColors[link.platform] }}>
            <div style={{ marginRight: "10px", display: "flex" }}>
              <img
                src={platformIcons[link.platform]}
                alt={link.platform}
                className={styles.platformIcon}
              />
            </div>

            {link.platform}
          </a>
        ))}

        {!isPreview &&
          Array(maxLinks - displayedLinks.length)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.linkPlaceholder}></div>
            ))}
      </div>
    </div>
  );
};

export default MobilePhoneOutline;
