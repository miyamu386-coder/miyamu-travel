"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import TokotokoMofu, { playTokotokoMofu } from "./components/TokotokoMofu";
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
  removeGoshuinRecord,
  saveGoshuinRecords,
} from "./lib/goshuinStorage";
import type {
  GoshuinRecord,
} from "./types/travel";

export default function Home() {
  const [tab, setTab] = useState("home");
  const writeInProgress = useRef(false);
  const [goshuinLoaded, setGoshuinLoaded] = useState(false);
  const [deletingGoshuin, setDeletingGoshuin] = useState(false);
  const [goshuinDeleteError, setGoshuinDeleteError] = useState("");

  const [isAddingGoshuin, setIsAddingGoshuin] =
    useState(false);

  const [goshuinRecords, setGoshuinRecords] =
    useState<GoshuinRecord[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      const records =
        await loadGoshuinRecords();

      setGoshuinRecords(records);
      setGoshuinLoaded(true);
    };

    void loadRecords();
  }, []);

  async function deleteGoshuin(record: GoshuinRecord) {
    if (!goshuinLoaded || writeInProgress.current) return;
    if (!window.confirm(`「${record.placeName}」の御朱印を削除しますか？`)) return;

    writeInProgress.current = true;
    setDeletingGoshuin(true);
    setGoshuinDeleteError("");
    try {
      setGoshuinRecords(await removeGoshuinRecord(goshuinRecords, record));
    } catch (error) {
      console.error("御朱印の削除失敗", error);
      setGoshuinDeleteError("御朱印を削除できませんでした。");
    } finally {
      writeInProgress.current = false;
      setDeletingGoshuin(false);
    }
  }

  return (
    <main>
      <TokotokoMofu />
      {tab === "home" && <TravelHome />}
      {tab === "diary" && <TravelDiaryPage />}
      {tab === "album" && <PhotoAlbum />}
      {tab === "spots" && <SpotsPage />}
      {tab === "goshuin" && (
        isAddingGoshuin ? (
          <GoshuinRecordForm
            prefectures={prefectures}
            onSave={async (record, previewSrc) => {
              const nextRecords = [
                ...goshuinRecords,
                record,
              ];

              if (!goshuinLoaded || writeInProgress.current) {
                throw new Error("御朱印帳を処理中です。");
              }
              writeInProgress.current = true;
              try {
                await saveGoshuinRecords(nextRecords);
              } finally {
                writeInProgress.current = false;
              }

              setGoshuinRecords(
                nextRecords,
              );

              setIsAddingGoshuin(false);
              playTokotokoMofu({
                kind: "goshuin",
                previewSrc,
                showStamp: record.pawStamp,
              });
            }}
          />
        ) : (
          <GoshuinAlbum
            records={goshuinRecords}
            disabled={!goshuinLoaded || deletingGoshuin}
            error={goshuinDeleteError}
            onDelete={deleteGoshuin}
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
