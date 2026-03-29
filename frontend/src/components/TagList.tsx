import React from "react";
import { parseTags } from "../utils/ticketUtils";
import styles from "../styles/TagList.module.css";

interface Props {
  tags: string | null | undefined;
  /** Max visible before "+N more". Default: show all */
  maxVisible?: number;
}

export default function TagList({ tags, maxVisible }: Props) {
  const parsed = parseTags(tags);
  if (parsed.length === 0) return null;

  const visible = maxVisible ? parsed.slice(0, maxVisible) : parsed;
  const overflow = maxVisible ? parsed.length - maxVisible : 0;

  return (
    <div className={styles.wrap}>
      {visible.map((tag, i) => (
        <span key={i} className={styles.tag}>
          {tag}
        </span>
      ))}
      {overflow > 0 && (
        <span className={`${styles.tag} ${styles.more}`}>+{overflow}</span>
      )}
    </div>
  );
}
