"use client";

import {
  useEffect,
  useState,
} from "react";
import TravelHome from "./components/TravelHome";
import TravelDiaryPage from "./components/diary/TravelDiaryPage";
import PhotoAlbum from "./components/photos/PhotoAlbum";
import SpotsPage from "./components/spots/SpotsPage";
import TravelTabBar from "./components/TravelTabBar";
import GoshuinRecordForm from "./components/goshuin/GoshuinRecordForm";
import GoshuinAlbum from "./components/goshuin/GoshuinAlbum";
import { prefectures } from "./data/prefectures";
import {
  loadGoshuinRecords,
  saveGoshuinRecords,
} from "./lib/goshuinStorage";
import type {
  GoshuinRecord,
} from "./types/travel";

export default function Home() {
  const [tab, setTab] = useState("home");

  const [isAddingGoshuin, setIsAddingGoshuin] =
    useState(false);

  const [goshuinRecords, setGoshuinRecords] =
    useState<GoshuinRecord[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      const records =
        await loadGoshuinRecords();

      setGoshuinRecords(records);
    };

    void loadRecords();
  }, []);

  return (
    <main>
      {tab === "home" && <TravelHome />}
      {tab === "diary" && <TravelDiaryPage />}
      {tab === "album" && <PhotoAlbum />}
      {tab === "spots" && <SpotsPage />}
      {tab === "goshuin" && (
        isAddingGoshuin ? (
          <GoshuinRecordForm
            prefectures={prefectures}
            onSave={async (record) => {
              const nextRecords = [
                ...goshuinRecords,
                record,
              ];

              await saveGoshuinRecords(
                nextRecords,
              );

              setGoshuinRecords(
                nextRecords,
              );

              setIsAddingGoshuin(false);
            }}
          />
        ) : (
          <GoshuinAlbum
            records={goshuinRecords}
            onAdd={() =>
              setIsAddingGoshuin(true)
            }
          />
        )
      )}


      <TravelTabBar
        currentTab={tab}
        onChange={setTab}
      />
    </main>
  );
}
