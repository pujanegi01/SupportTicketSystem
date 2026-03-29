import { Ticket } from "../types/ticket";

// Category → colour token
const CATEGORY_COLOR_MAP: Record<string, string> = {
  bug:     "red",
  feature: "blue",
  support: "green",
  billing: "yellow",
  unknown: "gray",
  general: "purple",
};

/**
 * Returns a colour token (e.g. "red", "blue") for a given category string.
 * Falls back to "purple" for unmapped values.
 */
export function getCategoryColor(category: string | null): string {
  const key = (category || "general").toLowerCase().trim();
  return CATEGORY_COLOR_MAP[key] ?? "purple";
}

// ── Tag helpers ───────────────────────────────────────────────────────────

/**
 * Splits a comma-separated tags string into a clean array.
 * Returns [] if tags is null/undefined/empty.
 */
export function parseTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// ── AI status helpers ─────────────────────────────────────────────────────

/**
 * Returns true if the AI processing failed for this ticket.
 * Centralises the "AI failed" / "unknown" check so it never diverges.
 */
export function isAiFailed(ticket: Pick<Ticket, "summary" | "category">): boolean {
  return ticket.summary === "AI failed" || ticket.category === "unknown";
}

// ── Stat helpers ──────────────────────────────────────────────────────────

export interface TicketStats {
  total: number;
  aiProcessed: number;
  aiFailed: number;
  categoryCount: number;
}

/**
 * Derives dashboard stat counts from the ticket list.
 */
export function computeTicketStats(tickets: Ticket[]): TicketStats {
  const categories = new Set(tickets.map((t) => t.category || "General"));
  return {
    total:         tickets.length,
    aiProcessed:   tickets.filter((t) => t.summary && !isAiFailed(t)).length,
    aiFailed:      tickets.filter((t) => isAiFailed(t)).length,
    categoryCount: categories.size,
  };
}

// ── Filter helpers ────────────────────────────────────────────────────────

/**
 * Returns unique lowercase category slugs from a ticket list,
 * prefixed with "all" for the filter tabs.
 */
export function buildCategoryFilters(tickets: Ticket[]): string[] {
  const cats = Array.from(
    new Set(tickets.map((t) => (t.category || "general").toLowerCase()))
  );
  return ["all", ...cats];
}

/**
 * Filters a ticket list by search string and active category tab.
 */
export function filterTickets(
  tickets: Ticket[],
  search: string,
  activeCat: string
): Ticket[] {
  const q = search.toLowerCase();
  return tickets.filter((t) => {
    const matchSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.summary || "").toLowerCase().includes(q);

    const matchCat =
      activeCat === "all" ||
      (t.category || "general").toLowerCase() === activeCat;

    return matchSearch && matchCat;
  });
}