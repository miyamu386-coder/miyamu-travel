"use client";

import { useState } from "react";
import GoshuinBookViewport from "../goshuin/GoshuinBookViewport";
import type { TravelPhoto } from "../../lib/photoStorage";
import LandscapeShortEditor from "./LandscapeShortEditor";
import styles from "./LandscapeAlbum.module.css";

type Props = {
  albumTitle: string;
  photos: TravelPhoto[];
  urls: Record<string, string>;
  loaded: boolean;
  busy: boolean;
  onRemove: (photo: TravelPhoto) => Promise<void>;
};

export default function LandscapeAlbumBook({ albumTitle, photos, urls, loaded, busy, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const count = Math.ceil(photos.length / 2);
  const page = Math.max(0, Math.min(index, count - 1));
  const spread = photos.slice(page * 2, page * 2 + 2);
  const available = photos.filter((photo) => urls[photo.id]).length;

  function closeBook() {
    setOpen(false);
    setEditing(false);
  }

  return (
    <section className={styles.album} aria-label={albumTitle}>
      {editing ? (
        <LandscapeShortEditor photos={photos} urls={urls} onClose={() => setEditing(false)} />
      ) : (
        <div className={styles.shortEntry}>
          <button type="button" className={styles.shortButton}
            disabled={!loaded || busy || available < 2} onClick={() => setEditing(true)}>
            ショート動画を作る
          </button>
          {(!loaded || available < 2) && (
            <p role="status">{!loaded ? "写真を読み込み中…" : photos.length < 2
              ? `このアルバムに写真をあと${2 - photos.length}枚保存すると作れます。`
              : `表示できる写真が${available}枚です。動画には2枚必要です。`}</p>
          )}
        </div>
      )}
      {!editing && (!open ? (
        <button type="button" className={styles.cover} aria-label={`${albumTitle}を開く`} onClick={() => setOpen(true)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/landscape-album/landscape-album-cover.png" alt="" />
          <span>{albumTitle}</span>
        </button>
      ) : (
        <>
          <div className={styles.bar}>
            <button type="button" onClick={closeBook}>← 表紙へ</button>
            <span aria-live="polite">{count ? page + 1 : 0} / {count}</span>
          </div>
          <GoshuinBookViewport pageIndex={page} pageCount={count} onPageChange={setIndex}>
            <div className={styles.spread} style={{
              backgroundImage: 'url("/images/landscape-album/landscape-album-open.png")',
            }}>
              {[0, 1].map((side) => {
                const photo = spread[side];
                if (!photo) return null;
                return (
                  <figure key={photo.id} className={side === 0 ? styles.left : styles.right}>
                    {urls[photo.id] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={urls[photo.id]} alt={photo.title} draggable={false} />
                    ) : <span>{loaded ? "画像を表示できません" : "読み込み中…"}</span>}
                    <figcaption>
                      <strong title={photo.title}>{photo.title}</strong>
                      {photo.takenAt && <time>{photo.takenAt}</time>}
                    </figcaption>
                  </figure>
                );
              })}
              {!spread.length && <p className={styles.empty}>{loaded ? "まだ写真がありません" : "読み込み中…"}</p>}
            </div>
          </GoshuinBookViewport>
          {spread.length > 0 && (
            <div className={styles.details}>
              {spread.map((photo) => (
                <details key={photo.id}>
                  <summary>{photo.title}</summary>
                  {photo.takenAt && <p>{photo.takenAt}</p>}
                  {photo.memo && <p className={styles.memo}>{photo.memo}</p>}
                  <button type="button" disabled={busy || editing} onClick={() => {
                    setIndex(page);
                    void onRemove(photo);
                  }}>削除</button>
                </details>
              ))}
            </div>
          )}
        </>
      ))}
    </section>
  );
}
