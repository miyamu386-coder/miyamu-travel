"use client";

import { useEffect, useState } from "react";
import TravelDiaryBook from "./TravelDiaryBook";
import bookStyles from "./TravelDiaryBook.module.css";
import {
  loadTravelDiary,
  saveTravelDiary,
  type TravelDiaryEntry,
} from "../../lib/travelDiaryStorage";
import type { PrefectureId } from "../../types/travel";

const prefectures: { id: PrefectureId; name: string }[] = [
  { id: "hokkaido", name: "北海道" },
  { id: "aomori", name: "青森県" },
  { id: "iwate", name: "岩手県" },
  { id: "miyagi", name: "宮城県" },
  { id: "akita", name: "秋田県" },
  { id: "yamagata", name: "山形県" },
  { id: "fukushima", name: "福島県" },
  { id: "ibaraki", name: "茨城県" },
  { id: "tochigi", name: "栃木県" },
  { id: "gunma", name: "群馬県" },
  { id: "saitama", name: "埼玉県" },
  { id: "chiba", name: "千葉県" },
  { id: "tokyo", name: "東京都" },
  { id: "kanagawa", name: "神奈川県" },
  { id: "niigata", name: "新潟県" },
  { id: "toyama", name: "富山県" },
  { id: "ishikawa", name: "石川県" },
  { id: "fukui", name: "福井県" },
  { id: "yamanashi", name: "山梨県" },
  { id: "nagano", name: "長野県" },
  { id: "gifu", name: "岐阜県" },
  { id: "shizuoka", name: "静岡県" },
  { id: "aichi", name: "愛知県" },
  { id: "mie", name: "三重県" },
  { id: "shiga", name: "滋賀県" },
  { id: "kyoto", name: "京都府" },
  { id: "osaka", name: "大阪府" },
  { id: "hyogo", name: "兵庫県" },
  { id: "nara", name: "奈良県" },
  { id: "wakayama", name: "和歌山県" },
  { id: "tottori", name: "鳥取県" },
  { id: "shimane", name: "島根県" },
  { id: "okayama", name: "岡山県" },
  { id: "hiroshima", name: "広島県" },
  { id: "yamaguchi", name: "山口県" },
  { id: "tokushima", name: "徳島県" },
  { id: "kagawa", name: "香川県" },
  { id: "ehime", name: "愛媛県" },
  { id: "kochi", name: "高知県" },
  { id: "fukuoka", name: "福岡県" },
  { id: "saga", name: "佐賀県" },
  { id: "nagasaki", name: "長崎県" },
  { id: "kumamoto", name: "熊本県" },
  { id: "oita", name: "大分県" },
  { id: "miyazaki", name: "宮崎県" },
  { id: "kagoshima", name: "鹿児島県" },
  { id: "okinawa", name: "沖縄県" },
];

export default function TravelDiaryPage() {
  const [entries, setEntries] = useState<TravelDiaryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [visitedAt, setVisitedAt] = useState("");
  const [prefectureId, setPrefectureId] =
    useState<PrefectureId>("kanagawa");
  const [body, setBody] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const saved = await loadTravelDiary();
        if (active) setEntries(saved);
      } catch (error) {
        console.error(error);
        if (active) setError("旅日記を読み込めませんでした。");
      } finally {
        if (active) setLoaded(true);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setVisitedAt("");
    setPrefectureId("kanagawa");
    setBody("");
    setFormOpen(false);
  }

  function startEdit(entry: TravelDiaryEntry) {
    setEditingId(entry.id);
    setTitle(entry.title);
    setVisitedAt(entry.visitedAt);
    setPrefectureId(entry.prefectureId);
    setBody(entry.body);
    setFormOpen(true);
  }

  async function handleSave() {
    if (!loaded) {
      setError("旅日記の読み込みが完了していません。");
      return;
    }

    if (busy) {
      return;
    }

    if (!title.trim()) {
      setError("タイトルを入力してください。");
      return;
    }

    if (!visitedAt) {
      setError("訪問日を入力してください。");
      return;
    }

    if (!body.trim()) {
      setError("旅の思い出を入力してください。");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const now = new Date().toISOString();
      const existing = entries.find(
        (entry) => entry.id === editingId
      );

      const entry: TravelDiaryEntry = {
        id: existing?.id ?? crypto.randomUUID(),
        title: title.trim(),
        visitedAt,
        prefectureId,
        body: body.trim(),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };

      const next = existing
        ? entries.map((item) =>
            item.id === existing.id ? entry : item
          )
        : [...entries, entry];

      await saveTravelDiary(next);
      setEntries(next);
      resetForm();
    } catch (error) {
      console.error(error);
      setError("旅日記を保存できませんでした。");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(entry: TravelDiaryEntry) {
    if (!loaded || busy) return;

    if (!window.confirm(`「${entry.title}」を削除しますか？`)) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const next = entries.filter(
        (item) => item.id !== entry.id
      );

      await saveTravelDiary(next);
      setEntries(next);

      if (editingId === entry.id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setError("旅日記を削除できませんでした。");
    } finally {
      setBusy(false);
    }
  }

  const sortedEntries = [...entries].sort((a, b) =>
    b.visitedAt.localeCompare(a.visitedAt)
  );

  return (
    <section style={{ padding: 20, paddingBottom: 110 }}>
      <h2>旅日記</h2>

      {error && <p role="alert">{error}</p>}

      {!formOpen ? (
        <button
          type="button"
          disabled={!loaded || busy || Boolean(error)}
          onClick={() => setFormOpen(true)}
          style={{ marginTop: 20 }}
        >
          ＋ 新しい旅日記
        </button>
      ) : (
        <div
          className={bookStyles.form}
          style={{
            display: "grid",
            gap: 14,
            marginTop: 20,
            padding: 18,
            border: "1px solid #ddd",
            borderRadius: 16,
            background: "#fff",
          }}
        >
          <label>
            タイトル
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <label>
            訪問日
            <input
              type="date"
              value={visitedAt}
              onChange={(event) => setVisitedAt(event.target.value)}
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <label>
            都道府県
            <select
              value={prefectureId}
              onChange={(event) =>
                setPrefectureId(event.target.value as PrefectureId)
              }
              style={{ display: "block", width: "100%" }}
            >
              {prefectures.map((prefecture) => (
                <option key={prefecture.id} value={prefecture.id}>
                  {prefecture.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            旅の思い出
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={6}
              style={{ display: "block", width: "100%" }}
            />
          </label>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleSave()}
            >
              🐾 保存
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={resetForm}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      <div hidden={formOpen}>
        <TravelDiaryBook
          entries={sortedEntries}
          loaded={loaded}
          busy={busy}
          placeName={(entry) => prefectures.find((item) => item.id === entry.prefectureId)?.name ?? entry.prefectureId}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
