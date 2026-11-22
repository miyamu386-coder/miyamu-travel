"use client";

import styles from "./NaviWalkingMofu.module.css";

type Props = {
  mode?: "walking" | "transit" | "driving";
};

export default function NaviWalkingMofu({
  mode = "walking",
}: Props) {
  const label =
    mode === "driving"
      ? "車で移動するモフ"
      : mode === "transit"
        ? "電車で移動するモフ"
        : "トコトコ歩くモフ";

  return (
    <div className={styles.scene}>
      <div
        className={styles.mofu}
        data-mode={mode}
        role="img"
        aria-label={label}
      />
    </div>
  );
}
