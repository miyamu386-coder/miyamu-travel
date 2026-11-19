"use client";

import { useState } from "react";
import {
  touristSpots,
  type TouristSpot,
} from "../../data/touristSpots";
import { nationalTouristSpots } from "../../data/nationalTouristSpots";
import type { PrefectureId, VisitRecord } from "../../types/travel";
import { VisitRecordForm } from "../visits/VisitRecordForm";

type Props = {
  prefectureId: PrefectureId;
  onRecordVisit?: (visit: VisitRecord) => boolean;
};

export default function TouristSpotList({
  prefectureId,
  onRecordVisit,
}: Props) {
  const [selectedSpot, setSelectedSpot] =
    useState<TouristSpot | null>(null);

  const [isVisitFormOpen, setIsVisitFormOpen] = useState(false);
  const [visitMessage, setVisitMessage] = useState("");

  const spots = [...touristSpots, ...nationalTouristSpots].filter(
    (spot) => spot.prefectureId === prefectureId
  );

  if (selectedSpot) {
    return (
      <section style={{ marginTop: 24 }}>
        <button
          type="button"
          onClick={() => {
            setSelectedSpot(null);
            setVisitMessage("");
          }}
        >
          ← スポット一覧へ
        </button>

        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 18,
            background: "#fff",
          }}
        >
          <h3>{selectedSpot.name}</h3>

          <p>📍 {selectedSpot.area}</p>
          <p>🏷️ {selectedSpot.category}</p>

          <p style={{ marginTop: 20 }}>
            {selectedSpot.description}
          </p>

          {onRecordVisit && (
            <button
              type="button"
              onClick={() => {
                setVisitMessage("");
                setIsVisitFormOpen(true);
              }}
            >
              🐾 行った！
            </button>
          )}
          {visitMessage && <p role="status">{visitMessage}</p>}
        </div>

        {isVisitFormOpen && onRecordVisit && (
          <VisitRecordForm
            prefectureId={prefectureId}
            initialName={selectedSpot.name}
            onSave={(visit) => {
              if (onRecordVisit(visit)) {
                setIsVisitFormOpen(false);
                setVisitMessage("訪問を記録しました。");
              }
            }}
            onCancel={() => setIsVisitFormOpen(false)}
          />
        )}
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h3>🐾 観光スポット一覧</h3>

      {spots.length === 0 ? (
        <p style={{ marginTop: 16 }}>
          この都道府県の観光スポットは
          これから追加していきます。
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 12,
            marginTop: 16,
          }}
        >
          {spots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelectedSpot(spot)}
              style={{
                textAlign: "left",
                padding: 20,
                borderRadius: 16,
                border: "1px solid #ddd",
                background: "#fff",
              }}
            >
              <strong>{spot.name}</strong>

              <p style={{ marginTop: 8 }}>
                📍 {spot.area}
              </p>

              <small>{spot.category}</small>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
