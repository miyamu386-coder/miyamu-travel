"use client";

import { syncTravelWatchVisits } from "../../lib/travelWatch";
import { useEffect, useState } from "react";
import TouristSpotList from "./TouristSpotList";
import type {
  PrefectureId,
  VisitRecord,
} from "../../types/travel";

type Region = {
  name: string;
  prefectures: {
    id: PrefectureId;
    name: string;
  }[];
};

const regions: Region[] = [
  {
    name: "北海道",
    prefectures: [
      { id: "hokkaido", name: "北海道" },
    ],
  },
  {
    name: "東北",
    prefectures: [
      { id: "aomori", name: "青森県" },
      { id: "iwate", name: "岩手県" },
      { id: "miyagi", name: "宮城県" },
      { id: "akita", name: "秋田県" },
      { id: "yamagata", name: "山形県" },
      { id: "fukushima", name: "福島県" },
    ],
  },
  {
    name: "関東",
    prefectures: [
      { id: "ibaraki", name: "茨城県" },
      { id: "tochigi", name: "栃木県" },
      { id: "gunma", name: "群馬県" },
      { id: "saitama", name: "埼玉県" },
      { id: "chiba", name: "千葉県" },
      { id: "tokyo", name: "東京都" },
      { id: "kanagawa", name: "神奈川県" },
    ],
  },
  {
    name: "中部",
    prefectures: [
      { id: "niigata", name: "新潟県" },
      { id: "toyama", name: "富山県" },
      { id: "ishikawa", name: "石川県" },
      { id: "fukui", name: "福井県" },
      { id: "yamanashi", name: "山梨県" },
      { id: "nagano", name: "長野県" },
      { id: "gifu", name: "岐阜県" },
      { id: "shizuoka", name: "静岡県" },
      { id: "aichi", name: "愛知県" },
    ],
  },
  {
    name: "近畿",
    prefectures: [
      { id: "mie", name: "三重県" },
      { id: "shiga", name: "滋賀県" },
      { id: "kyoto", name: "京都府" },
      { id: "osaka", name: "大阪府" },
      { id: "hyogo", name: "兵庫県" },
      { id: "nara", name: "奈良県" },
      { id: "wakayama", name: "和歌山県" },
    ],
  },
  {
    name: "中国",
    prefectures: [
      { id: "tottori", name: "鳥取県" },
      { id: "shimane", name: "島根県" },
      { id: "okayama", name: "岡山県" },
      { id: "hiroshima", name: "広島県" },
      { id: "yamaguchi", name: "山口県" },
    ],
  },
  {
    name: "四国",
    prefectures: [
      { id: "tokushima", name: "徳島県" },
      { id: "kagawa", name: "香川県" },
      { id: "ehime", name: "愛媛県" },
      { id: "kochi", name: "高知県" },
    ],
  },
  {
    name: "九州・沖縄",
    prefectures: [
      { id: "fukuoka", name: "福岡県" },
      { id: "saga", name: "佐賀県" },
      { id: "nagasaki", name: "長崎県" },
      { id: "kumamoto", name: "熊本県" },
      { id: "oita", name: "大分県" },
      { id: "miyazaki", name: "宮崎県" },
      { id: "kagoshima", name: "鹿児島県" },
      { id: "okinawa", name: "沖縄県" },
    ],
  },
];

export default function SpotsPage() {
  const [selectedRegion, setSelectedRegion] =
    useState<Region | null>(null);

  const [selectedPrefecture, setSelectedPrefecture] =
    useState<PrefectureId | null>(null);

  const [visits, setVisits] =
    useState<VisitRecord[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "miyamu-travel-visits"
      );

      if (!saved) return;

      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setVisits(parsed as VisitRecord[]);
      }
    } catch (error) {
      console.error("訪問記録の読み込み失敗", error);
    }
  }, []);

  const prefecture = selectedRegion?.prefectures.find(
    (item) => item.id === selectedPrefecture
  );

  return (
    <section
      className="spot-list"
      style={{ padding: "20px" }}
    >
      <h2>📍 観光スポット</h2>
      <p>モフ太郎と日本全国を旅しよう！</p>

      {selectedPrefecture ? (
        <>
          <button
            type="button"
            onClick={() => setSelectedPrefecture(null)}
          >
            ← 都道府県一覧へ
          </button>

          <h3 style={{ marginTop: 24 }}>
            🗾 {prefecture?.name}
          </h3>

          <TouristSpotList
            key={selectedPrefecture}
            prefectureId={selectedPrefecture}
            onRecordVisit={(visit) => {
              try {
                const key = "miyamu-travel-visits";
                const saved = localStorage.getItem(key);
                const existing = saved === null ? [] : JSON.parse(saved);
                if (!Array.isArray(existing)) {
                  throw new Error("訪問記録の形式が正しくありません");
                }
                const nextVisits: VisitRecord[] = [...existing, visit];
                localStorage.setItem(key, JSON.stringify(nextVisits));
                void syncTravelWatchVisits();
                setVisits(nextVisits);
                return true;
              } catch (error) {
                console.error("訪問記録の保存失敗", error);
                window.alert("訪問記録を保存できませんでした。");
                return false;
              }
            }}
          />
        </>
      ) : selectedRegion ? (
        <>
          <button
            type="button"
            onClick={() => setSelectedRegion(null)}
          >
            ← 地方一覧へ
          </button>

          <h3 style={{ marginTop: 24 }}>
            {selectedRegion.name}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: 12,
              marginTop: 16,
            }}
          >
            {selectedRegion.prefectures.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSelectedPrefecture(item.id)
                }
                style={{
                  padding: 18,
                  borderRadius: 14,
                  border: "1px solid #ddd",
                  background: "#fff",
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 style={{ marginTop: 24 }}>
            🗾 地方を選ぶ
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: 12,
              marginTop: 16,
            }}
          >
            {regions.map((region) => (
              <button
                key={region.name}
                type="button"
                onClick={() =>
                  setSelectedRegion(region)
                }
                style={{
                  padding: 20,
                  borderRadius: 14,
                  border: "1px solid #ddd",
                  background: "#fff",
                }}
              >
                {region.name}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 32 }}>
            🐾 これまでの訪問記録
          </h3>

          {visits.length === 0 ? (
            <p>まだ訪問記録がありません。</p>
          ) : (
            <ul className="spot-list-items">
              {[...visits]
                .sort((a, b) =>
                  b.visitedAt.localeCompare(a.visitedAt)
                )
                .map((visit) => (
                  <li
                    key={visit.id}
                    className="spot-list-item"
                  >
                    <h4>{visit.name}</h4>
                    <time>{visit.visitedAt}</time>
                    {visit.memo && <p>{visit.memo}</p>}
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
