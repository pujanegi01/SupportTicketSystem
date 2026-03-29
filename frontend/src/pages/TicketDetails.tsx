import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../features/tickets/ticketSlice";
import { RootState, AppDispatch } from "../app/store";
import Loader from "../components/Loader";
import Error from "../components/Error";
import CategoryBadge from "../components/CategoryBadge";
import TagList from "../components/TagList";
import AiPanel from "../components/AiPanel";
import PageBreadcrumb from "../components/PageBreadcrumb";
import { isAiFailed, parseTags } from "../utils/ticketUtils";
import styles from "../styles/TicketDetails.module.css";

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedTicket: ticket, loading, error } = useSelector(
    (s: RootState) => s.tickets
  );

  useEffect(() => {
    if (id) dispatch(getTicket(Number(id)));
  }, [id, dispatch]);

  const failed = ticket ? isAiFailed(ticket) : false;
  const tags   = parseTags(ticket?.tags);

  return (
    <div className={styles.page}>
      <PageBreadcrumb
        backTo="/"
        backLabel="All Tickets"
        crumbs={[{ label: ticket ? `Ticket #${ticket.id}` : "Loading…" }]}
      />

      {loading && <Loader text="Loading ticket…" fullPage />}

      {error && !loading && (
        <Error
          message={error}
          onRetry={() => id && dispatch(getTicket(Number(id)))}
        />
      )}

      {!loading && !error && ticket && (
        <div className={styles.layout}>
          {/* ── Main ── */}
          <div className={styles.main}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <span className={styles.ticketIdBadge}>#{ticket.id}</span>
                <CategoryBadge category={ticket.category} />
              </div>
              <h1 className={styles.title}>{ticket.title}</h1>
            </div>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Description
              </h2>
              <div className={styles.descBlock}>
                <p>{ticket.description}</p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                AI Analysis
              </h2>
              <AiPanel ticket={ticket} variant="detail" />
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>Ticket Info</h3>
              <div className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Ticket ID</span>
                  <span className={styles.infoValue}>#{ticket.id}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Category</span>
                  <CategoryBadge category={ticket.category} />
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>AI Status</span>
                  <span className={`${styles.statusDot} ${failed ? styles.statusFail : styles.statusOk}`}>
                    {failed ? "Failed" : "Processed"}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Tags</span>
                  <span className={styles.infoValue}>{tags.length || "—"}</span>
                </div>
              </div>
            </div>

            {tags.length > 0 && (
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Tags</h3>
                <div style={{ marginTop: 10 }}>
                  <TagList tags={ticket.tags} />
                </div>
              </div>
            )}

            <button className={styles.backBtnFull} onClick={() => navigate("/")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
