import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "../styles/Sidebar.module.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const tickets = useSelector((s: RootState) => s.tickets.tickets);
  const totalCount = tickets.length;
  const aiProcessed = tickets.filter((t) => t.summary && t.summary !== "AI failed").length;

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
          </svg>
        </div>
        <div>
          <span className={styles.brandName}>TicketFlow</span>
          <span className={styles.brandSub}>Support System</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className={styles.quickStats}>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{totalCount}</span>
          <span className={styles.statLbl}>Total</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statPill}>
          <span className={`${styles.statNum} ${styles.statNumGreen}`}>{aiProcessed}</span>
          <span className={styles.statLbl}>AI Done</span>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <p className={styles.navSection}>NAVIGATION</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
          }
        >
          <span className={styles.navIcon}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </span>
          <span className={styles.navLabel}>Dashboard</span>
          {totalCount > 0 && (
            <span className={styles.navBadge}>{totalCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
          }
        >
          <span className={styles.navIcon}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </span>
          <span className={styles.navLabel}>New Ticket</span>
        </NavLink>
      </nav>

      {/* Recent tickets */}
      {tickets.length > 0 && (
        <div className={styles.recentSection}>
          <p className={styles.navSection}>RECENT</p>
          <div className={styles.recentList}>
            {tickets.slice(0, 4).map((t) => (
              <button
                key={t.id}
                className={styles.recentItem}
                onClick={() => navigate(`/ticket/${t.id}`)}
              >
                <span className={styles.recentId}>#{t.id}</span>
                <span className={styles.recentTitle}>{t.title}</span>
                {t.category && (
                  <span className={styles.recentCat}>{t.category}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>A</div>
          <div>
            <span className={styles.userName}>Admin</span>
            <span className={styles.userRole}>Support Agent</span>
          </div>
          <div className={styles.onlineDot} />
        </div>
      </div>
    </aside>
  );
}