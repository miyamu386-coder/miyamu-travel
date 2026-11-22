"use client";

import { useState } from "react";
import type { Album } from "../../lib/landscapeAlbums";
import styles from "./LandscapeAlbum.module.css";

type Props = {
  albums: Album[];
  atShelf: boolean;
  firstPhotos: Record<string, string>;
  back: () => void;
  active: Album;
  disabled: boolean;
  select: (id: string) => void;
  save: (album: Album) => Promise<boolean>;
};

export default function AlbumPicker({ albums, active, atShelf, firstPhotos, back, disabled, select, save }: Props) {
  const [mode, setMode] = useState<"add" | "rename" | null>(null);
  const [name, setName] = useState("");
  return (
    <fieldset className={styles.picker} disabled={disabled}>
      <legend>{atShelf ? "マイアルバムの本棚" : active.title}</legend>
      {mode ? (
        <form onSubmit={async event => {
          event.preventDefault();
          if (!name.trim()) return;
          const id = mode === "add" ? crypto.randomUUID() : active.id;
          if (await save({ id, title: name.trim() })) setMode(null);
        }}>
          <label>アルバム名
            <input autoFocus required maxLength={40} value={name}
              onChange={event => setName(event.target.value)} />
          </label>
          <button disabled={!name.trim()}>{mode === "add" ? "作成" : "保存"}</button>
          <button type="button" onClick={() => setMode(null)}>キャンセル</button>
        </form>
      ) : (
        <>
          {atShelf ? (
            <>
              <div className={styles.shelves}>
                {Array.from({length: Math.ceil(albums.length / 3)}, (_, row) => (
                  <div className={styles.plank} key={row}>
                    {albums.slice(row * 3, row * 3 + 3).map(album => (
                      <button type="button" className={styles.shelfBook} key={album.id}
                        aria-label={`${album.title}の表紙を見る`} onClick={() => select(album.id)}>
                        {firstPhotos[album.id] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={firstPhotos[album.id]} alt="" />
                        )}
                        <span>{album.title}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => { setName(""); setMode("add"); }}>＋ アルバムを追加</button>
            </>
          ) : (
            <>
              <button type="button" onClick={back}>← 本棚へ</button>
              <button type="button" onClick={() => { setName(active.title); setMode("rename"); }}>名前を変更</button>
            </>
          )}
        </>
      )}
    </fieldset>
  );
}
