"use client";

import { useEffect, useState } from "react";
import GoshuinBookViewport from "./GoshuinBookViewport";
import type { GoshuinRecord } from "../../types/travel";
import { loadGoshuinImage } from "../../lib/goshuinStorage";

type Props = {
  records: GoshuinRecord[];
  onAdd: () => void;
  onDelete: (record: GoshuinRecord) => Promise<void>;
  disabled: boolean;
  error: string;
};

export default function GoshuinAlbum({
  records,
  onAdd,
  onDelete,
  disabled,
  error,
}: Props) {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      const entries = await Promise.all(
        records.map(async (record) => {
          try {
            return [
              record.id,
              await loadGoshuinImage(record.imageUrl),
            ] as const;
          } catch (err) {
            console.error("御朱印画像の読み込み失敗", err);
            return [record.id, ""] as const;
          }
        }),
      );

      if (!cancelled) {
        setImageUrls(Object.fromEntries(entries));
      }
    }

    void loadImages();

    return () => {
      cancelled = true;
    };
  }, [records]);

  useEffect(() => {
    setPage((current) =>
      Math.min(current, Math.max(0, records.length - 1)),
    );
  }, [records.length]);

  const record = records[page];

  return (
    <section
      style={styles.container}
      data-goshuin-gesture-version="2"
    >
      <h2 style={styles.title}>御朱印帳</h2>

      {error && <p role="alert">{error}</p>}

      {!opened ? (
        <div style={styles.coverArea}>
          <button
            type="button"
            onClick={() => setOpened(true)}
            style={styles.coverButton}
            aria-label="御朱印帳を開く"
          >
            <img
              src="/images/goshuin/goshuin-cover.png"
              alt="モフの御朱印帳の表紙"
              style={styles.coverImage}
            />
          </button>
          <p style={styles.guide}>表紙をタップして開く</p>
          <p style={styles.count}>保存済み：{records.length}件</p>
        </div>
      ) : (
        <>
          <div style={styles.toolbar}>
            <button
              type="button"
              onClick={() => setOpened(false)}
              style={styles.smallButton}
            >
              ← 表紙へ
            </button>

            <span style={styles.count}>
              {records.length ? `${page + 1} / ${records.length}` : "0 / 0"}
            </span>
          </div>

          <GoshuinBookViewport
            pageIndex={page}
            pageCount={records.length}
            onPageChange={setPage}
          >
            <div style={styles.book}>
              <img
                src="/images/goshuin/goshuin-open.png"
                alt="御朱印帳の見開き"
                style={styles.bookBackground}
              />

              <div style={styles.leftPage} data-goshuin-scroll>
                {record ? (
                  <div style={styles.pageContent}>
                    <strong style={styles.placeName}>
                      {record.placeName}
                    </strong>
                    <span style={styles.dateLabel}>参拝日</span>
                    <span style={styles.date}>{record.receivedAt}</span>
                    <span style={styles.memoLabel}>メモ</span>
                    <p style={styles.memo}>
                      {record.memo || "記録なし"}
                    </p>
                    {record.pawStamp && (
                      <span style={styles.paw}>🐾</span>
                    )}
                  </div>
                ) : (
                  <p style={styles.emptyMessage}>
                    まだ御朱印がありません
                  </p>
                )}
              </div>

              <div style={styles.rightPage}>
                {record && imageUrls[record.id] ? (
                  <img
                    src={imageUrls[record.id]}
                    alt={`${record.placeName}の御朱印`}
                    draggable={false}
                    style={styles.goshuinImage}
                  />
                ) : (
                  <span style={styles.emptyPhoto}>
                    {record ? "写真を読み込み中" : "御朱印を追加しよう"}
                  </span>
                )}
              </div>
            </div>
          </GoshuinBookViewport>

          {record && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => void onDelete(record)}
              style={styles.deleteButton}
            >
              この御朱印を削除
            </button>
          )}
        </>
      )}

      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        style={styles.addButton}
      >
        ＋ 御朱印を追加
      </button>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    margin: "4px 0 18px",
    fontSize: 24,
  },
  coverArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  coverButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    width: "min(100%, 360px)",
  },
  coverImage: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 12,
  },
  guide: {
    margin: "14px 0 4px",
    fontSize: 14,
  },
  count: {
    fontSize: 13,
    opacity: 0.75,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  book: {
    position: "relative",
    width: "100%",
    aspectRatio: "3 / 2",
    overflow: "hidden",
  },
  bookBackground: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    display: "block",
  },
  leftPage: {
    position: "absolute",
    left: "8%",
    top: "13%",
    width: "37%",
    height: "74%",
    overflow: "auto",
  },
  rightPage: {
    position: "absolute",
    left: "55%",
    top: "13%",
    width: "37%",
    height: "74%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pageContent: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    height: "100%",
    color: "#443326",
    fontSize: "clamp(9px, 2.4vw, 15px)",
  },
  placeName: {
    fontSize: "1.1em",
    overflowWrap: "anywhere",
  },
  dateLabel: {
    fontWeight: 700,
    marginTop: 5,
  },
  date: {
    fontSize: "0.95em",
  },
  memoLabel: {
    fontWeight: 700,
    marginTop: 5,
  },
  memo: {
    margin: 0,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
  paw: {
    fontSize: 20,
  },
  goshuinImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    userSelect: "none",
  },
  emptyMessage: {
    fontSize: 12,
    color: "#655343",
  },
  emptyPhoto: {
    fontSize: 11,
    color: "#655343",
    textAlign: "center",
  },
  smallButton: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #d8cbb8",
    background: "#fffaf1",
    color: "#443326",
    fontSize: 14,
    cursor: "pointer",
  },
  deleteButton: {
    display: "block",
    margin: "14px auto",
    padding: 8,
    border: "none",
    background: "transparent",
    color: "#9b2929",
    cursor: "pointer",
  },
  addButton: {
    width: "100%",
    padding: "12px 16px",
    marginTop: 18,
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
};
