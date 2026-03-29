import React from "react";
import { Ticket } from "../types/ticket";
import CategoryBadge from "./CategoryBadge";
import TagList from "./TagList";
import styles from "../styles/AiPanel.module.css"
import { isAiFailed } from "../utils/ticketUtils";

// ── Shared star icon ──────────────────────────────────────────────────────
function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ── Chip variant (compact, for ticket cards) ──────────────────────────────
function ChipFailed() {
  return (
    <div className={styles.chipFailed}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      AI processing failed
    </div>
  );
}

function ChipSuccess({ summary }: { summary: string }) {
  return (
    <div className={styles.chip}>
      <span className={styles.chipLabel}>
        <StarIcon size={10} />
        AI Summary
      </span>
      <p className={styles.chipText}>{summary}</p>
    </div>
  );
}

// ── Detail variant (full panel for ticket detail page) ────────────────────
function DetailFailed() {
  return (
    <div className={styles.detailFailed}>
      <div className={styles.detailFailedHeader}>
        <div className={styles.detailFailedIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div>
          <p className={styles.detailFailedTitle}>AI Processing Failed</p>
          <p className={styles.detailFailedSub}>
            The AI could not process this ticket. Category and summary are unavailable.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailSuccess({ ticket }: { ticket: Ticket }) {
  return (
    <div className={styles.detailPanel}>
      {/* Glowing header */}
      <div className={styles.detailHeader}>
        <div className={styles.detailGlow} />
        <div className={styles.detailHeaderContent}>
          <div className={styles.detailStarIcon}>
            <StarIcon size={16} />
          </div>
          <span className={styles.detailTitle}>AI-Generated Insights</span>
          <span className={styles.detailSuccessBadge}>Processed</span>
        </div>
      </div>

      <div className={styles.detailBody}>
        {ticket.summary && (
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Summary</span>
            <p className={styles.fieldValue}>{ticket.summary}</p>
          </div>
        )}
        <div className={styles.detailGrid}>
          {ticket.category && (
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Category</span>
              <CategoryBadge category={ticket.category} />
            </div>
          )}
          {ticket.tags && (
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Tags</span>
              <TagList tags={ticket.tags} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Public API ────────────────────────────────────────────────────────────
interface Props {
  ticket: Ticket;
  variant: "chip" | "detail";
}

export default function AiPanel({ ticket, variant }: Props) {
  const failed = isAiFailed(ticket);

  if (variant === "chip") {
    if (failed) return <ChipFailed />;
    if (!ticket.summary) return null;
    return <ChipSuccess summary={ticket.summary} />;
  }

  // variant === "detail"
  return failed ? <DetailFailed /> : <DetailSuccess ticket={ticket} />;
}
