import React from "react";
import styles from "../styles/common.module.css";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

export default function Loader({ text, size = "md", fullPage = false }: LoaderProps) {
  return (
    <div className={`${styles.loaderWrap} ${fullPage ? styles.loaderFullPage : ""}`}>
      <div className={`${styles.spinner} ${styles[`spinner_${size}`]}`}>
        <div className={styles.spinnerRing} />
        <div className={styles.spinnerDot} />
      </div>
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  );
}