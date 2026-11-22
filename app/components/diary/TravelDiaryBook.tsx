"use client";

import { useState } from "react";
import type { TravelDiaryEntry } from "../../lib/travelDiaryStorage";
import styles from "./TravelDiaryBook.module.css";

type Props = {
  entries: TravelDiaryEntry[];
  loaded: boolean;
  busy: boolean;
  placeName: (entry: TravelDiaryEntry) => string;
  onEdit: (entry: TravelDiaryEntry) => void;
  onDelete: (entry: TravelDiaryEntry) => Promise<void>;
};

export default function TravelDiaryBook({
  entries, loaded, busy, placeName, onEdit, onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [contents, setContents] = useState(false);
  const selected = entries.findIndex((entry) => entry.id === entryId);
  const index = Math.max(selected, 0);
  const entry = entries[index];

  function read(id: string) {
    setEntryId(id);
    setContents(false);
  }

  if (!open) {
    return (
      <button type="button" className={styles.cover} onClick={() => setOpen(true)} aria-label="旅日記を開く">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/travel-diary/travel-diary-cover.png" alt="" />
        <span>旅日記</span>
      </button>
    );
  }

  return (
    <div className={styles.book}>
      <div className={styles.bar}>
        <button type="button" onClick={() => setOpen(false)}>← 表紙へ</button>
        <button type="button" disabled={!entry} onClick={() => setContents(!contents)} aria-expanded={contents}>
          {contents ? "日記に戻る" : "目次"}
        </button>
      </div>
      {!loaded ? (
        <p role="status">読み込み中…</p>
      ) : !entry ? (
        <p>まだ旅日記がありません。</p>
      ) : contents ? (
        <ol className={styles.contents}>
          {entries.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => read(item.id)}>
                <strong>{item.title}</strong>
                <time dateTime={item.visitedAt}>{item.visitedAt}</time>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <>
          <article className={styles.paper} key={entry.id}>
            <p className={styles.meta}>
              <time dateTime={entry.visitedAt}>{entry.visitedAt}</time>
              <span>{placeName(entry)}</span>
            </p>
            <h3>{entry.title}</h3>
            <p className={styles.body}>{entry.body}</p>
          </article>
          <div className={styles.bar}>
            <button type="button" disabled={index === 0} onClick={() => read(entries[index - 1].id)}>前へ</button>
            <span aria-live="polite">{index + 1} / {entries.length}</span>
            <button type="button" disabled={index >= entries.length - 1} onClick={() => read(entries[index + 1].id)}>次へ</button>
          </div>
          <div className={styles.actions}>
            <button type="button" disabled={busy} onClick={() => onEdit(entry)}>編集</button>
            <button type="button" disabled={busy} onClick={() => void onDelete(entry)}>削除</button>
          </div>
        </>
      )}
    </div>
  );
}
