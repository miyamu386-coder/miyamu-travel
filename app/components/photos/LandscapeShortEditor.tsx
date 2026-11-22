"use client";

import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import type { TravelPhoto } from "../../lib/photoStorage";
import { createLandscapeShort, PHOTO_SECONDS, shareLandscapeShort, SHORT_LIMIT } from "../../lib/landscapeShort";
import styles from "./LandscapeAlbum.module.css";

type Props = { photos: TravelPhoto[]; urls: Record<string, string>; onClose: () => void };

export default function LandscapeShortEditor({ photos, urls, onClose }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState<number | null>(null);
  const [result, setResult] = useState<{ file: File; url: string }>();
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState("");
  const process = useRef<AbortController | null>(null);
  const resultUrl = useRef("");

  useEffect(() => () => {
    process.current?.abort();
    if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
  }, []);

  function discardPreview() {
    if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
    resultUrl.current = "";
    setResult(undefined);
    setError("");
  }

  function toggle(id: string) {
    discardPreview();
    setSelected((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : current.length < SHORT_LIMIT ? [...current, id] : current);
  }

  function move(index: number, direction: -1 | 1) {
    discardPreview();
    setSelected((current) => {
      const next = [...current];
      const target = index + direction;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function generate() {
    if (process.current) return;
    discardPreview();
    const controller = new AbortController();
    process.current = controller;
    setStep(0);
    try {
      const sequence = selected.map((id) => {
        const photo = photos.find((item) => item.id === id);
        if (!photo || !urls[id]) throw new Error("選んだ写真を読み込めませんでした。");
        return { imagePath: photo.imagePath, src: urls[id] };
      });
      const file = await createLandscapeShort(sequence, controller.signal, setStep);
      if (!controller.signal.aborted) {
        resultUrl.current = URL.createObjectURL(file);
        setResult({ file, url: resultUrl.current });
      }
    } catch (err) {
      if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "動画を作成できませんでした。");
    } finally {
      process.current = null;
      if (!controller.signal.aborted) setStep(null);
    }
  }

  async function share() {
    if (!result || sharing) return;
    setError("");
    setSharing(true);
    try {
      await shareLandscapeShort(result.file);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError(err instanceof Error ? err.message : "動画を共有できませんでした。");
      }
    } finally {
      setSharing(false);
    }
  }

  const working = step !== null || sharing;

  return (
    <section className={styles.editor} aria-label="ショート動画作成">
      <div className={styles.editorBar}>
        <h3>ショート動画</h3>
        <button type="button" onClick={onClose} disabled={sharing}>閉じる</button>
      </div>
      <p>写真を2〜{SHORT_LIMIT}枚選ぶ · {selected.length}枚・約{selected.length * PHOTO_SECONDS}秒</p>
      <div className={styles.pickGrid}>
        {photos.map((photo) => {
          const index = selected.indexOf(photo.id);
          return (
            <button key={photo.id} type="button" aria-pressed={index >= 0}
              disabled={working || !urls[photo.id] || (index < 0 && selected.length >= SHORT_LIMIT)}
              onClick={() => toggle(photo.id)}>
              {urls[photo.id] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={urls[photo.id]} alt="" loading="lazy" />
              )}
              <span>{index >= 0 ? `${index + 1}. ` : ""}{photo.title}</span>
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <ol className={styles.sequence} aria-label="再生順">
          {selected.map((id, index) => {
            const name = photos.find((photo) => photo.id === id)?.title ?? "写真";
            return (
              <li key={id}>
                <span>{name}</span>{" "}
                <button type="button" aria-label={`${name}を前へ`} disabled={working || index === 0}
                  onClick={() => move(index, -1)}>↑</button>{" "}
                <button type="button" aria-label={`${name}を後へ`} disabled={working || index === selected.length - 1}
                  onClick={() => move(index, 1)}>↓</button>
              </li>
            );
          })}
        </ol>
      )}
      <button type="button" disabled={working || selected.length < 2} onClick={() => void generate()}>
        プレビューを作る
      </button>
      {step !== null && <p role="status">{step === 0 ? "写真を準備中…" : `動画を作成中（${step} / ${selected.length}）`}</p>}
      {error && <p role="alert">{error}</p>}
      {result && (
        <div className={styles.result}>
          <video controls playsInline src={result.url} aria-label="ショート動画のプレビュー" />
          <div>
            <button type="button" disabled={sharing} onClick={() => void share()}>
              {Capacitor.isNativePlatform() ? "動画を保存・共有" : "動画を共有"}
            </button>
            {!Capacitor.isNativePlatform() && <a href={result.url} download={result.file.name}>動画を保存</a>}
          </div>
        </div>
      )}
    </section>
  );
}
