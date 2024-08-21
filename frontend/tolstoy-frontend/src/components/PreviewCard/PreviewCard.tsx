import React from "react";
import { LinkData } from "../../types";
import styles from "./PreviewCard.module.css";

interface PreviewCardProps {
  linkData: LinkData;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ linkData }) => {
  return (
    <a className={styles.preview} href={linkData.url}>
      <img src={linkData.image} alt={linkData.title} />
      <div>
        <h4>{linkData.title}</h4>
        <p>{linkData.description}</p>
      </div>
    </a>
  );
};

export default PreviewCard;
