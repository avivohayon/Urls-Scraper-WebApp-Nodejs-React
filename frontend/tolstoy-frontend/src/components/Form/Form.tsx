import React, { useState } from "react";
import styles from "./Form.module.css";

interface FormProps {
  onSubmit: (urls: string[]) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const urls = text.split(/\s+|,\s*/).filter(Boolean);
    onSubmit(urls);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
