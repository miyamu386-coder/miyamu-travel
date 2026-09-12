"use client";

import { useState } from "react";
import JapanOverviewSvg from "./maps/JapanOverviewSvg";
import PrefectureMapSvg from "./maps/PrefectureMapSvg";
import HokkaidoMapSvg from "./maps/HokkaidoMapSvg";
import TohokuMapSvg from "./maps/TohokuMapSvg";
import KantoMapSvg from "./maps/KantoMapSvg";
import ChubuMapSvg from "./maps/ChubuMapSvg";
import KinkiMapSvg from "./maps/KinkiMapSvg";
import ChugokuMapSvg from "./maps/ChugokuMapSvg";
import ShikokuMapSvg from "./maps/ShikokuMapSvg";
import KyushuMapSvg from "./maps/KyushuMapSvg";

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

const regionMapComponents = {
  hokkaido: HokkaidoMapSvg,
  tohoku: TohokuMapSvg,
  kanto: KantoMapSvg,
  chubu: ChubuMapSvg,
  kinki: KinkiMapSvg,
  chugoku: ChugokuMapSvg,
  shikoku: ShikokuMapSvg,
  kyushu: KyushuMapSvg,
};

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
          ← {selectedRegionData?.name}
        </button>

        <div className="region-detail">
          <PrefectureMapSvg
            prefectureId={
              selectedPrefecture as
              | "hokkaido"
              | "ibaraki"
              | "tochigi"
              | "gunma"
              | "saitama"
              | "chiba"
              | "tokyo"
              | "kanagawa"
            }
          />
        </div>
      </section>
    );
  }

  if (selectedRegionData) {
    const RegionMap =
      regionMapComponents[selectedRegionData.id];

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
          <RegionMap
            onSelectPrefecture={
              setSelectedPrefecture
            }
          />
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