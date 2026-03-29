import React from "react";
import styles from "../styles/common.module.css";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
  inline?: boolean;
}

export default function Error({ message, onRetry, inline = false }: ErrorProps) {
  return (
    <div className={`${styles.errorBox} ${inline ? styles.errorInline : ""}`}>
      <div className={styles.errorIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="0.5" fill="currentColor" />
        </svg>
      </div>
      <span className={styles.errorMessage}>{message}</span>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Retry
        </button>
      )}
    </div>
  );
}