"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TableViewer({
  tables,
  initialTable,
  initialData,
  initialError,
}: any) {
  const supabase = createClient();

  const [selectedTable, setSelectedTable] = useState(initialTable);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialError);

  const loadTable = async (table: string) => {
    setSelectedTable(table);

    const { data, error } = await supabase
      .from(table)
      .select("*");

    setData(data || []);
    setError(error?.message || null);
  };

  return (
    <div style={styles.page}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Tables</h2>

        {tables.map((t: string) => {
          const active = selectedTable === t;

          return (
            <button
              key={t}
              onClick={() => loadTable(t)}
              style={{
                ...styles.tableButton,
                ...(active ? styles.tableButtonActive : {}),
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div style={styles.main}>
        
        <div style={styles.header}>
          <h1 style={styles.title}>{selectedTable}</h1>
          <p style={styles.subtitle}>
            {data?.length ?? 0} rows
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <div style={styles.grid}>
          {data?.map((item: any) => (
            <div key={item.id} style={styles.card}>
              {Object.entries(item).map(([k, v]) => (
                <div key={k} style={styles.row}>
                  <span style={styles.key}>{k}</span>
                  <span style={styles.value}>
                    {String(v)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    height: "100vh",
    background: "#0f0f12",
    color: "#e5e5e5",
    fontFamily: "system-ui, sans-serif",
  },

  /* Sidebar */
  sidebar: {
    width: 240,
    padding: 16,
    borderRight: "1px solid #222",
    background: "#121218",
  },

  sidebarTitle: {
    fontSize: 14,
    marginBottom: 12,
    color: "#aaa",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  tableButton: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 6,
    textAlign: "left",
    background: "transparent",
    border: "1px solid transparent",
    color: "#bbb",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  tableButtonActive: {
    background: "#1f1f2a",
    border: "1px solid #333",
    color: "#fff",
  },

  /* Main */
  main: {
    flex: 1,
    padding: 24,
    overflowY: "auto",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    margin: 0,
    fontSize: 24,
  },

  subtitle: {
    margin: 0,
    color: "#888",
    fontSize: 13,
  },

  /* Error */
  errorBox: {
    padding: 12,
    background: "#2a1a1a",
    border: "1px solid #553",
    borderRadius: 8,
    color: "#ff6b6b",
    marginBottom: 16,
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 12,
  },

  card: {
    background: "#16161d",
    border: "1px solid #262636",
    borderRadius: 12,
    padding: 14,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    fontSize: 13,
  },

  key: {
    color: "#888",
    marginRight: 10,
  },

  value: {
    color: "#eaeaea",
    textAlign: "right",
    wordBreak: "break-word",
  },
};