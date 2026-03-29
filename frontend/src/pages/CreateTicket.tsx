import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../features/tickets/ticketSlice";
import { AppDispatch, RootState } from "../app/store";
import Error from "../components/Error";
import PageBreadcrumb from "../components/PageBreadcrumb";
import styles from "../styles/CreateTicket.module.css";

export default function CreateTicket() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.tickets);

  const [title, setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched]   = useState({ title: false, description: false });

  const titleErr = touched.title && !title.trim() ? "Title is required" : "";
  const descErr  = touched.description && !description.trim() ? "Description is required" : "";
  const isValid  = title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, description: true });
    if (!isValid || loading) return;
    const result = await dispatch(
      addTicket({ title: title.trim(), description: description.trim() })
    );
    if (addTicket.fulfilled.match(result)) {
      navigate(`/ticket/${result.payload.id}`);
    }
  };

  const handleBlur = (field: "title" | "description") =>
    setTouched((p) => ({ ...p, [field]: true }));

  return (
    <div className={styles.page}>
      <PageBreadcrumb
        backTo="/"
        backLabel="Dashboard"
        crumbs={[{ label: "New Ticket" }]}
        disabled={loading}
      />

      <div className={styles.layout}>
        {/* ── Form ── */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <div className={styles.formCardIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div>
              <h1 className={styles.formTitle}>Create New Ticket</h1>
              <p className={styles.formSub}>
                Our AI will automatically analyze, categorize and summarize your ticket.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <div className={`${styles.fieldGroup} ${titleErr ? styles.fieldError : ""}`}>
              <label htmlFor="title" className={styles.label}>
                Title <span className={styles.required}>*</span>
              </label>
              <input
                id="title"
                type="text"
                className={styles.input}
                placeholder="Brief, descriptive title for the issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur("title")}
                disabled={loading}
                maxLength={200}
                autoFocus
              />
              <div className={styles.fieldMeta}>
                {titleErr ? <span className={styles.errorText}>{titleErr}</span> : <span />}
                <span className={styles.charCount}>{title.length}/200</span>
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${descErr ? styles.fieldError : ""}`}>
              <label htmlFor="description" className={styles.label}>
                Description <span className={styles.required}>*</span>
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Describe the issue in detail. Include steps to reproduce, expected vs actual behaviour, error messages, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                disabled={loading}
                maxLength={2000}
                rows={7}
              />
              <div className={styles.fieldMeta}>
                {descErr ? <span className={styles.errorText}>{descErr}</span> : <span />}
                <span className={styles.charCount}>{description.length}/2000</span>
              </div>
            </div>

            {error && <Error message={error} inline />}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.btnSubmit}
                disabled={loading || !isValid}
              >
                {loading ? (
                  <><span className={styles.btnSpinner} />Processing with AI…</>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Create Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Info Panel ── */}
        <div className={styles.infoPanel}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>AI Processing</h3>
            <p className={styles.infoDesc}>After you submit, the AI will automatically:</p>
            <ul className={styles.infoList}>
              {["Generate a concise summary", "Classify the category", "Extract relevant tags"].map((item) => (
                <li key={item}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tipsCard}>
            <h3 className={styles.tipsTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
              </svg>
              Tips for best results
            </h3>
            <ul className={styles.tipsList}>
              {[
                "Be specific — vague titles get vague summaries",
                "Include error messages verbatim",
                "Describe steps to reproduce",
                "Mention affected users or scope",
              ].map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
