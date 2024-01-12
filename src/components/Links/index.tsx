import React, { useEffect, useState } from "react";
import styles from "../Links/LinksForm.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import style from "../Profile/Profile.module.css";

type Platform =
  | "GitHub"
  | "LinkedIn"
  | "Facebook"
  | "Twitter"
  | "YouTube"
  | "Twitch"
  | "Dev.to"
  | "Codewars"
  | "freeCodeCamp";

const ProfileLinkForm = ({ profileLinks, setProfileLinks }: any) => {
  const [linkForms, setLinkForms] = useState(profileLinks);
  const [hideEmptyLinksDiv, setHideEmptyLinksDiv] = useState(false);

  useEffect(() => {
    if (profileLinks.length) {
      setHideEmptyLinksDiv(true);
    }
  }, [profileLinks]);

  const platforms = [
    { label: "GitHub", iconUrl: "/static/github.svg" },
    { label: "LinkedIn", iconUrl: "/static/linkedin.svg" },
    { label: "Facebook", iconUrl: "/static/facebook.svg" },
    { label: "Twitter", iconUrl: "/static/twitter.svg" },
    { label: "YouTube", iconUrl: "/static/youtube.svg" },
    { label: "Twitch", iconUrl: "/static/twitch.svg" },
    { label: "Dev.to", iconUrl: "/static/devto.svg" },
    { label: "Codewars", iconUrl: "/static/codewars.svg" },
    { label: "freeCodeCamp", iconUrl: "/static/freecodecamp.svg" },
  ];

  const isURLValid = (url: any, platform: Platform) => {
    const platformValidators = {
      GitHub: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
      LinkedIn: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      Facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
      Twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
      YouTube:
        /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/[a-zA-Z0-9_-]+|user\/[a-zA-Z0-9_-]+)$/,
      Twitch: /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_]+\/?$/,
      "Dev.to": /^(https?:\/\/)?(www\.)?dev\.to\/[a-zA-Z0-9_]+\/?$/,
      Codewars: /^(https?:\/\/)?(www\.)?codewars\.com\/users\/[a-zA-Z0-9_]+$/,
      freeCodeCamp:
        /^(https?:\/\/)?(www\.)?freecodecamp\.org\/[a-zA-Z0-9_]+\/?$/,
    };

    if (platform in platformValidators) {
      const regex = platformValidators[platform as Platform];
      return regex.test(url);
    }

    return false;
  };

  const handleLinkChange = (
    event: { target: { name: string; value: string } },
    index: number
  ) => {
    const updatedForms = [...linkForms];
    updatedForms[index][event.target.name] = event.target.value;
    setLinkForms(updatedForms);
  };

  const handleAddLinkForm = () => {
    setLinkForms([...linkForms, { platform: "GitHub", url: "" }]);
    setHideEmptyLinksDiv(true);
  };

  const handleAddLink = (linkForm: any, index: number) => {
    if ( //trim mice razmak sa pocetka i kraja stringa
      linkForm.url.trim() !== "" && // ugl provjerava da nije prazno to untra
      isURLValid(linkForm.url, linkForm.platform)
    ) {
      const updatedLinks = [...profileLinks];
      updatedLinks[index] = linkForm;
      setProfileLinks(updatedLinks);
    }
  };

  const handleRemoveLinkForm = (index: number) => {
    const updatedForms = [...linkForms];
    updatedForms.splice(index, 1);
    setLinkForms(updatedForms);
    const updatedLinks = [...profileLinks];
    updatedLinks.splice(index, 1);
    setProfileLinks(updatedLinks);
  };

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const rLinks = reorder(
      linkForms,
      result.source.index,
      result.destination.index
    );

    setLinkForms(rLinks);
    setProfileLinks(rLinks);
  };

  return (
    <div className={`${styles.mainLinks} ${style.phoneDisplay}`}>
      <div className={styles.linksHeader}>Customize your links</div>
      <div className={styles.linksSub}>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </div>
      <button
        onClick={handleAddLinkForm}
        className={`${styles.newLinkButton} ${
          linkForms.length >= 5 ? styles.disabledButton : ""
        }`}
        disabled={linkForms.length >= 5}>
        + Add New Link
      </button>

      {!hideEmptyLinksDiv ? (
        <div className={styles.emptyLinks}>
          <div className={styles.emptyLinksInsideFrame}>
            <div style={{ marginBottom: "30px" }}>
              <img src={"/static/icons/emptyLinks.svg"} />
            </div>
            <div className={styles.linksHeader}>Let's get you started</div>
            <div className={styles.linksSub}>
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ marginTop: "24px", maxHeight: "461px", overflowY: "auto" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {linkForms.map((linkForm: any, index: any) => (
                    <Draggable index={index} draggableId={`l-${index}`}>
                      {(provided) => (
                        <div
                          className={styles.linkForm}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px",
                            }}>
                            <div
                              className={styles.linksSub}
                              style={{
                                marginBottom: "0px",
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <img src={"/static/icons/hamburger.svg"} />
                              Link #{index + 1}
                            </div>
                            <button
                              className={styles.removeBtn}
                              onClick={() => handleRemoveLinkForm(index)}>
                              Remove
                            </button>
                          </div>

                          <div className={styles.formFields}>
                            <div className={styles.selectFormField}>
                              <div className={styles.text}>Platform</div>
                              <select
                                className={styles.field}
                                name="platform"
                                value={linkForm.platform}
                                onChange={(e) => handleLinkChange(e, index)}>
                                {platforms.map((platform) => (
                                  <option
                                    key={platform.label}
                                    value={platform.label}>
                                    {platform.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className={styles.selectFormField}>
                              <div className={styles.text}>Link</div>
                              <input
                                className={`${styles.field} ${
                                  !isURLValid(linkForm.url, linkForm.platform)
                                    ? styles.invalidLink
                                    : ""
                                }`}
                                type="text"
                                name="url"
                                placeholder="ex. https://github.com/BrunaMamic"
                                value={linkForm.url}
                                onChange={(e) => handleLinkChange(e, index)}
                                onBlur={() => handleAddLink(linkForm, index)}
                              />
                              {!isURLValid(linkForm.url, linkForm.platform) && (
                                <div className={styles.errorMessage}>
                                  Please check the URL
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <div className={style.saveDiv}>
        <button className={style.saveBtn} onClick={() => handleAddLink}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileLinkForm;
