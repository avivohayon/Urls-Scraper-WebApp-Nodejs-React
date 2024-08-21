import React, { useState } from "react";
import { LinkData } from "../../types";
import Form from "../Form";
import PreviewCard from "../PreviewCard";
import styles from "./LinkPreview.module.css";

const LinkPreview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPreviews = async (urls: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8008/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });
      if (!res.ok) {
        // throw new Error(`HTTP error! status: ${res.status}`);
        if (res.status === 400) {
          throw new Error("Bad Request: Please check the input URLs.");
        } else if (res.status === 500) {
          throw new Error("Server Error: Something went wrong on our end.");
        } else {
          throw new Error(`Unexpected error: ${res.statusText}`);
        }
        const errorData = await res.json();
        throw new Error(`Error ${errorData.status}: ${errorData.message}`);
      }
      const data: LinkData[] = await res.json();
      if (data.length === 0) {
        throw new Error("No metadata found for the provided URLs.");
      }

      setLinks(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching link previews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Link Previewer</h1>
      <Form onSubmit={fetchPreviews} />
      {loading && <h3>Fetching link previews... 🤔🤔🤔</h3>}
      {error && <h3 className={styles.error}>{error}</h3>} {/* Display error */}
      <div className={styles.previews}>
        {links.map((linkData) => (
          <PreviewCard key={linkData.url} linkData={linkData} />
        ))}
      </div>
    </div>
  );
};

export default LinkPreview;
