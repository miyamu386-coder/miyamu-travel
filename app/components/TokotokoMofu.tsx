"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TokotokoMofu.module.css";

type SaveMoment = {
  kind: "photo" | "goshuin";
  previewSrc?: string;
  showStamp?: boolean;
};

const eventName = "miyamu-travel:mofu-save";
const duration = 4500;
const spriteSrc = "/mofu/tokotoko-sprites.png";

export function playTokotokoMofu(moment: SaveMoment) {
  window.dispatchEvent(new CustomEvent<SaveMoment>(eventName, { detail: moment }));
}

export default function TokotokoMofu() {
  const [moment, setMoment] = useState<(SaveMoment & { id: number }) | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    let timer: number | undefined;
    const sprite = new Image();
    sprite.src = spriteSrc;

    function show(event: Event) {
      const { detail } = event as CustomEvent<SaveMoment>;
      window.clearTimeout(timer);
      setMoment({ ...detail, id: ++sequence.current });
      timer = window.setTimeout(() => setMoment(null), duration);
    }

    window.addEventListener(eventName, show);
    return () => {
      window.removeEventListener(eventName, show);
      window.clearTimeout(timer);
    };
  }, []);

  if (!moment) return null;

  return createPortal(
    <div className={styles.overlay} key={moment.id}>
      <div className={styles.card}>
        <div className={styles.status} role="status">
          {moment.kind === "photo" ? "写真を保存しました" : "御朱印を保存しました"}
        </div>
        {moment.previewSrc && (
          // The saved image can be a local data URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.preview} src={moment.previewSrc} alt="" />
        )}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.walker}><div className={styles.mofu} /></div>
          {moment.showStamp !== false && (
            <svg className={styles.paw} viewBox="0 0 64 64" width="58" height="58">
    <circle cx="32" cy="32" r="29" fill="#fff5e9" stroke="currentColor" strokeWidth="2.5" />
    <ellipse cx="18" cy="27" rx="4" ry="6" transform="rotate(-24 18 27)" fill="currentColor" />
    <ellipse cx="27" cy="20" rx="4" ry="6" transform="rotate(-9 27 20)" fill="currentColor" />
    <ellipse cx="37" cy="20" rx="4" ry="6" transform="rotate(9 37 20)" fill="currentColor" />
    <ellipse cx="46" cy="27" rx="4" ry="6" transform="rotate(24 46 27)" fill="currentColor" />
    <path d="M32 31c-4 0-6 4-9 7-5 5-3 12 3 12 2 0 4-2 6-2s4 2 6 2c6 0 8-7 3-12-3-3-5-7-9-7Z" fill="currentColor" />
            </svg>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
