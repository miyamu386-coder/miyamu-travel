"use client";

import { useEffect, useState } from "react";
import JapanOverviewSvg from "./maps/JapanOverviewSvg";
import TohokuMapSvg from "./maps/TohokuMapSvg";
import KantoMapSvg from "./maps/KantoMapSvg";
import ChubuMapSvg from "./maps/ChubuMapSvg";
import KinkiMapSvg from "./maps/KinkiMapSvg";
import ChugokuMapSvg from "./maps/ChugokuMapSvg";
import ShikokuMapSvg from "./maps/ShikokuMapSvg";
import KyushuMapSvg from "./maps/KyushuMapSvg";
import PrefectureDetailView from "./prefectures/PrefectureDetailView";
import { VisitRecordForm } from "./visits/VisitRecordForm";

import type {
  PrefectureId,
  VisitRecord,
} from "../types/travel";

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
    useState<PrefectureId | null>(null);

  const [visits, setVisits] =
    useState<VisitRecord[]>([]);
  const [hasLoadedVisits, setHasLoadedVisits] =
  useState(false);

useEffect(() => {
  const savedVisits = localStorage.getItem(
    "miyamu-travel-visits"
  );

  if (savedVisits) {
    try {
      const parsedVisits =
        JSON.parse(savedVisits) as VisitRecord[];

      setVisits(parsedVisits);
    } catch {
      console.error(
        "訪問記録の読み込みに失敗しました"
      );
    }
  }

  setHasLoadedVisits(true);
}, []);

useEffect(() => {
  if (!hasLoadedVisits) {
    return;
  }

  localStorage.setItem(
    "miyamu-travel-visits",
    JSON.stringify(visits)
  );
}, [visits, hasLoadedVisits]);

  const [isVisitFormOpen, setIsVisitFormOpen] =
    useState(false);
  const [editingVisit, setEditingVisit] =
    useState<VisitRecord | null>(null);

  const selectedRegionData = regions.find(
    (region) => region.id === selectedRegion
  );

  if (selectedPrefecture) {
    return (
      <section className="japan-map">
        <button
          className="map-back-button"
          onClick={() =>
            setSelectedPrefecture(null)
          }
        >
          ← {selectedRegionData?.name}
        </button>

        <div className="region-detail">
          <PrefectureDetailView
            prefectureId={selectedPrefecture}
            visits={visits}
            onAddVisit={() => {
              setEditingVisit(null);
              setIsVisitFormOpen(true);
            }}
            onEditVisit={(visit) => {
              setEditingVisit(visit);
              setIsVisitFormOpen(true);
            }}
            onDeleteVisit={(visitId) => {
              const targetVisit = visits.find(
                (visit) => visit.id === visitId
              );

              if (!targetVisit) {
                return;
              }

              const shouldDelete = window.confirm(
                `「${targetVisit.name}」の訪問記録を削除しますか？`
              );

              if (!shouldDelete) {
                return;
              }

              setVisits((currentVisits) =>
                currentVisits.filter(
                  (visit) => visit.id !== visitId
                )
              );
            }}
          />
        </div>
        {isVisitFormOpen && (
          <VisitRecordForm
            prefectureId={selectedPrefecture}
            initialVisit={editingVisit}
            onSave={(visit) => {
              if (editingVisit) {
                setVisits((currentVisits) =>
                  currentVisits.map((currentVisit) =>
                    currentVisit.id === visit.id
                      ? visit
                      : currentVisit
                  )
                );
              } else {
                setVisits((currentVisits) => [
                  ...currentVisits,
                  visit,
                ]);
              }

              setEditingVisit(null);
              setIsVisitFormOpen(false);
            }}
            onCancel={() => {
              setEditingVisit(null);
              setIsVisitFormOpen(false);
            }}
          />
        )}
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
            onSelectPrefecture={(prefectureId) => {
              setSelectedPrefecture(
                prefectureId as PrefectureId
              );
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="japan-map">
      <JapanOverviewSvg
  onSelectRegion={(regionId) => {
    setSelectedRegion(regionId);

    if (regionId === "hokkaido") {
      setSelectedPrefecture("hokkaido");
    }
  }}
/>
    </section>
  );
}