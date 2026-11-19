"use client";

import { useEffect, useState } from "react";
import { playTokotokoMofu } from "../TokotokoMofu";
import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";
import {
  deleteTravelPhotoImage,
  getTravelPhotoUrl,
  loadTravelPhotos,
  saveTravelPhotoImage,
  saveTravelPhotos,
  type TravelPhoto,
} from "../../lib/photoStorage";

export default function PhotoAlbum() {
  const [photos, setPhotos] = useState<TravelPhoto[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [imageData, setImageData] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const records = await loadTravelPhotos();

        if (!active) return;

        setPhotos(records);

        const resolved: Record<string, string> = {};

        for (const photo of records) {
          try {
            resolved[photo.id] = await getTravelPhotoUrl(
              photo.imagePath
            );
          } catch (error) {
            console.error("画像の読み込み失敗", error);
          }
        }

        if (active) setUrls(resolved);
      } catch (error) {
        console.error(error);
        if (active) {
          setError("写真記録を読み込めませんでした。");
        }
      } finally {
        if (active) setLoaded(true);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  async function choosePhoto(source: CameraSource) {
    try {
      setError("");

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source,
        correctOrientation: true,
      });

      if (photo.dataUrl) {
        setImageData(photo.dataUrl);
      }
    } catch (error) {
      console.log("撮影・選択を終了しました", error);
    }
  }

  async function addPhoto() {
    if (!imageData || !title.trim() || !loaded || busy) return;

    setBusy(true);
    setError("");

    let imagePath = "";

    try {
      imagePath = await saveTravelPhotoImage(imageData);

      const record: TravelPhoto = {
        id: crypto.randomUUID(),
        title: title.trim(),
        prefectureId: "",
        takenAt,
        memo: memo.trim(),
        imagePath,
        createdAt: new Date().toISOString(),
      };

      const next = [...photos, record];

      await saveTravelPhotos(next);

      setPhotos(next);
      setUrls((current) => ({
        ...current,
        [record.id]: imageData,
      }));

      setImageData(null);
      setTitle("");
      setTakenAt("");
      setMemo("");
    } catch (error) {
      console.error(error);
      setError("写真を保存できませんでした。");

      if (imagePath) {
        try {
          await deleteTravelPhotoImage(imagePath);
        } catch (cleanupError) {
          console.error(cleanupError);
        }
      }
      return;
    } finally {
      setBusy(false);
    }

    playTokotokoMofu({ kind: "photo", previewSrc: imageData });
  }

  async function removePhoto(photo: TravelPhoto) {
    if (!loaded || busy) return;

    if (!window.confirm(`「${photo.title}」を削除しますか？`)) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const next = photos.filter((item) => item.id !== photo.id);

      // 先に一覧を保存し、成功したら画像を削除する
      await saveTravelPhotos(next);

      setPhotos(next);

      setUrls((current) => {
        const updated = { ...current };
        delete updated[photo.id];
        return updated;
      });

      try {
        await deleteTravelPhotoImage(photo.imagePath);
      } catch (cleanupError) {
        console.error("画像ファイルの削除失敗", cleanupError);
      }
    } catch (error) {
      console.error(error);
      setError("写真を削除できませんでした。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section style={{ padding: 20, paddingBottom: 110 }}>
      <h2>🖼️ 旅の写真</h2>
      <p>旅の思い出をアルバムに残そう！</p>

      {error && <p role="alert">{error}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button
          type="button"
          disabled={busy || !loaded}
          onClick={() => void choosePhoto(CameraSource.Camera)}
        >
          📷 撮影
        </button>

        <button
          type="button"
          disabled={busy || !loaded}
          onClick={() => void choosePhoto(CameraSource.Photos)}
        >
          🖼️ 写真を選ぶ
        </button>
      </div>

      {imageData && (
        <div style={{ marginTop: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageData}
            alt="追加する写真"
            style={{ width: "100%", maxWidth: 400 }}
          />

          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <input
              placeholder="写真のタイトル"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label>
              撮影日
              <input
                type="date"
                value={takenAt}
                onChange={(event) => setTakenAt(event.target.value)}
              />
            </label>

            <textarea
              placeholder="旅のメモ"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
            />

            <button
              type="button"
              disabled={busy || !title.trim()}
              onClick={() => void addPhoto()}
            >
              🐾 写真を保存
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => setImageData(null)}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 32 }}>
        保存した写真（{photos.length}件）
      </h3>

      {!loaded ? (
        <p>読み込み中...</p>
      ) : photos.length === 0 ? (
        <p>まだ写真がありません。</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
            marginTop: 16,
          }}
        >
          {photos.map((photo) => (
            <article
              key={photo.id}
              style={{
                padding: 12,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 16,
              }}
            >
              {urls[photo.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urls[photo.id]}
                  alt={photo.title}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <p>画像を表示できません</p>
              )}

              <h4>{photo.title}</h4>
              {photo.takenAt && <p>{photo.takenAt}</p>}
              {photo.memo && <p>{photo.memo}</p>}

              <button
                type="button"
                disabled={busy}
                onClick={() => void removePhoto(photo)}
              >
                削除
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
