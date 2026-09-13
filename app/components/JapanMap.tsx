"use client";

import { useState } from "react";
import JapanOverviewSvg from "./maps/JapanOverviewSvg";
import PrefectureMapSvg from "./maps/PrefectureMapSvg";
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
type RegionMapId = Exclude<RegionId, "hokkaido">;

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

  if (selectedRegion === "hokkaido" && !selectedPrefecture) {
    return (
      <section className="japan-map">
        <button
          className="map-back-button"
          onClick={() => setSelectedRegion(null)}
        >
          ← 日本全国
        </button>

        <div className="region-detail">
          <PrefectureMapSvg prefectureId="hokkaido" />
        </div>
      </section>
    );
  }

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
  | "aomori"
  | "iwate"
  | "miyagi"
  | "akita"
  | "yamagata"
  | "fukushima"
  | "ibaraki"
  | "tochigi"
  | "gunma"
  | "saitama"
  | "chiba"
  | "tokyo"
  | "kanagawa"
  | "niigata"
  | "toyama"
  | "ishikawa"
  | "fukui"
  | "yamanashi"
  | "nagano"
  | "gifu"
  | "shizuoka"
  | "aichi"
  | "mie"
  | "shiga"
  | "kyoto"
  | "osaka"
  | "hyogo"
  | "nara"
  | "wakayama"
  | "tottori"
  | "shimane"
  | "okayama"
  | "hiroshima"
  | "yamaguchi"
  | "tokushima"
  | "kagawa"
  | "ehime"
  | "kochi"
  | "fukuoka"
  | "saga"
  | "nagasaki"
  | "kumamoto"
  | "oita"
  | "miyazaki"
  | "kagoshima"
  | "okinawa"
}

          />
        </div>
      </section>
    );
  }

  if (selectedRegionData && selectedRegion !== "hokkaido") {
    const RegionMap =
      regionMapComponents[selectedRegion as RegionMapId];

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