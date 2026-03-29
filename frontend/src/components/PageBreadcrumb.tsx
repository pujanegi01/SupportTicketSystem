import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PageBreadcrumb.module.css";

interface Crumb {
  label: string;
  to?: string; // if omitted, renders as plain text (current page)
}

interface Props {
  crumbs: Crumb[];
  backTo: string;
  backLabel?: string;
  disabled?: boolean;
}

export default function PageBreadcrumb({
  crumbs,
  backTo,
  backLabel = "Back",
  disabled = false,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.topbar}>
      <button
        className={styles.backBtn}
        onClick={() => navigate(backTo)}
        disabled={disabled}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {backLabel}
      </button>

      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          <span className={styles.sep}>/</span>
          {crumb.to ? (
            <button
              className={styles.crumbLink}
              onClick={() => navigate(crumb.to!)}
            >
              {crumb.label}
            </button>
          ) : (
            <span className={styles.crumbCurrent}>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
