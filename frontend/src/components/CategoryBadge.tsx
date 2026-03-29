import React from "react";
import styles from "../styles/CategoryBadge.module.css";
import { getCategoryColor } from "../utils/ticketUtils";

interface Props {
  category: string | null;
  /** "sm" for card chips, "md" (default) for detail views */
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: Props) {
  const color = getCategoryColor(category);
  return (
    <span
      className={`${styles.badge} ${styles[`color_${color}`]} ${
        size === "sm" ? styles.sm : ""
      }`}
    >
      {category || "General"}
    </span>
  );
}
