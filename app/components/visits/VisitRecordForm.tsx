"use client";

import { useState } from "react";

import type {
  PrefectureId,
  VisitRecord,
} from "../../types/travel";

type Props = {
  prefectureId: PrefectureId;
  initialVisit?: VisitRecord | null;
  onSave: (visit: VisitRecord) => void;
  onCancel: () => void;
};

export function VisitRecordForm({
  prefectureId,
  initialVisit = null,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(
    initialVisit?.name ?? ""
  );

  const [visitedAt, setVisitedAt] = useState(
    initialVisit?.visitedAt ?? ""
  );

  const [memo, setMemo] = useState(
    initialVisit?.memo ?? ""
  );

  const isEditing = initialVisit !== null;

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim() || !visitedAt) {
      return;
    }

    const visit: VisitRecord = {
      id:
        initialVisit?.id ??
        crypto.randomUUID(),
      prefectureId,
      name: name.trim(),
      visitedAt,
      memo: memo.trim(),
      ...(initialVisit?.photoUrl
        ? { photoUrl: initialVisit.photoUrl }
        : {}),
    };

    onSave(visit);
  };

  return (
    <div className="visit-form-overlay">
      <div className="visit-form-card">
        <div className="visit-form-header">
          <div>
            <h3>
              🐾{" "}
              {isEditing
                ? "訪問記録を編集"
                : "訪問記録を追加"}
            </h3>

            <p>
              {isEditing
                ? "旅の思い出を編集しよう"
                : "この土地での思い出を残そう"}
            </p>
          </div>

          <button
            type="button"
            className="visit-form-close"
            onClick={onCancel}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="visit-form-field">
            <span>訪れた場所</span>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="例：鶴岡八幡宮"
              required
            />
          </label>

          <label className="visit-form-field">
            <span>訪問日</span>

            <input
              type="date"
              value={visitedAt}
              onChange={(event) =>
                setVisitedAt(event.target.value)
              }
              required
            />
          </label>

          <label className="visit-form-field">
            <span>旅のメモ</span>

            <textarea
              value={memo}
              onChange={(event) =>
                setMemo(event.target.value)
              }
              placeholder="その日の思い出など"
              rows={4}
            />
          </label>

          <div className="visit-form-actions">
            <button
              type="button"
              onClick={onCancel}
            >
              キャンセル
            </button>

            <button type="submit">
              {isEditing
                ? "🐾 変更を保存"
                : "🐾 記録する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}