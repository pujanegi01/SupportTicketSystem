import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../features/tickets/ticketSlice";
import { Ticket } from "../types/ticket";
import { RootState, AppDispatch } from "../app/store";
import {
  computeTicketStats,
  buildCategoryFilters,
  filterTickets,
} from "../utils/ticketUtils";
import Loader from "../components/Loader";
import Error from "../components/Error";
import CategoryBadge from "../components/CategoryBadge";
import TagList from "../components/TagList";
import AiPanel from "../components/AiPanel";
import styles from "../styles/Dashboard.module.css";

// ── Stat row ──────────────────────────────────────────────────────────────
function StatsRow({ tickets }: { tickets: Ticket[] }) {
  const s = computeTicketStats(tickets);
  const stats = [
    { label: "Total Tickets", value: s.total,         icon: "🎫", accent: false },
    { label: "AI Processed",  value: s.aiProcessed,   icon: "✨", accent: true  },
    { label: "AI Failed",     value: s.aiFailed,      icon: "⚠️", accent: false },
    { label: "Categories",    value: s.categoryCount, icon: "🏷️", accent: false },
  ];

  return (
    <div className={styles.statsRow}>
      {stats.map((s) => (
        <div key={s.label} className={`${styles.statCard} ${s.accent ? styles.statCardAccent : ""}`}>
          <span className={styles.statIcon}>{s.icon}</span>
          <span className={styles.statValue}>{s.value}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Ticket card ───────────────────────────────────────────────────────────
function TicketCard({ ticket }: { ticket: Ticket }) {
  const navigate = useNavigate();

  return (
    <article className={styles.card} onClick={() => navigate(`/ticket/${ticket.id}`)}>
      <div className={styles.cardHeader}>
        <span className={styles.cardId}>#{ticket.id}</span>
        <CategoryBadge category={ticket.category} size="sm" />
      </div>

      <h3 className={styles.cardTitle}>{ticket.title}</h3>
      <p className={styles.cardDesc}>{ticket.description}</p>

      <AiPanel ticket={ticket} variant="chip" />
      <TagList tags={ticket.tags} maxVisible={3} />

      <div className={styles.cardFooter}>
        <span className={styles.viewLink}>
          View Details
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tickets, loading, error } = useSelector((s: RootState) => s.tickets);

  const [search, setSearch]     = useState("");
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => { dispatch(getTickets()); }, [dispatch]);

  const allCats  = buildCategoryFilters(tickets);
  const filtered = filterTickets(tickets, search, activeCat);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Support Tickets</h1>
          <p className={styles.pageSub}>Manage and track all customer support requests</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => navigate("/create")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Ticket
        </button>
      </div>

      {tickets.length > 0 && <StatsRow tickets={tickets} />}

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, description or AI summary…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch("")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.filterTabs}>
          {allCats.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterTab} ${activeCat === cat ? styles.filterTabActive : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {!loading && !error && tickets.length > 0 && (
        <p className={styles.resultCount}>
          {filtered.length === tickets.length
            ? `${tickets.length} ticket${tickets.length !== 1 ? "s" : ""}`
            : `${filtered.length} of ${tickets.length} tickets`}
        </p>
      )}

      {loading && <Loader text="Fetching tickets…" fullPage />}
      {error && !loading && <Error message={error} onRetry={() => dispatch(getTickets())} />}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3>{search || activeCat !== "all" ? "No tickets match your filters" : "No tickets yet"}</h3>
          <p>{search || activeCat !== "all" ? "Try adjusting your search or filter" : "Create your first ticket to get started"}</p>
          {!search && activeCat === "all" && (
            <button className={styles.btnPrimary} onClick={() => navigate("/create")}>Create First Ticket</button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>
      )}
    </div>
  );
}
