import React from "react";
import LinkPreview from "./components/LinkPreview";
import styles from "./styles/App.module.css";
import "./styles/animations.css"; // Global animations
import logo from "./assets/logo.svg";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <LinkPreview />
      </header>
    </div>
  );
};

export default App;
