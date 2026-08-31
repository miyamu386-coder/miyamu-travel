"use client";

import { useState } from "react";
import JapanOverviewSvg from "./maps/JapanOverviewSvg";
import KantoMapSvg from "./maps/KantoMapSvg";

type RegionId =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kinki"
  | "chugoku"
  | "shikoku"
  | "kyushu";

type Region = {
  id: RegionId;
  name: string;
};

const regions: Region[] = [
  { id: "hokkaido", name: "北海道" },
  { id: "tohoku", name: "東北" },
  { id: "kanto", name: "関東" },
  { id: "chubu", name: "中部" },
  { id: "kinki", name: "近畿" },
  { id: "chugoku", name: "中国" },
  { id: "shikoku", name: "四国" },
  { id: "kyushu", name: "九州・沖縄" },
];

export default function JapanMap() {
  const [selectedRegion, setSelectedRegion] =
    useState<RegionId | null>(null);

  const [selectedPrefecture, setSelectedPrefecture] =
    useState<string | null>(null);

  const selectedRegionData = regions.find(
    (region) => region.id === selectedRegion
  );

  if (selectedPrefecture) {
    return (
      <section className="japan-map">
        <button
          className="map-back-button"
          onClick={() => setSelectedPrefecture(null)}
        >
          ← 関東
        </button>

        <h2>{selectedPrefecture}</h2>

        <div className="region-detail">
          <p>
            この都県のスポットをここに表示します。
          </p>
        </div>
      </section>
    );
  }

  if (selectedRegionData) {
    return (
      <section className="japan-map">
        <button
          className="map-back-button"
          onClick={() => setSelectedRegion(null)}
        >
          ← 日本全国
        </button>

        <h2>{selectedRegionData.name}</h2>

        <div className="region-detail">
          {selectedRegion === "kanto" ? (
            <KantoMapSvg
              onSelectPrefecture={
                setSelectedPrefecture
              }
            />
          ) : (
            <p>
              {selectedRegionData.name}の地図を
              ここに表示します。
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="japan-map">
      <JapanOverviewSvg
        onSelectRegion={setSelectedRegion}
      />
    </section>
  );
}