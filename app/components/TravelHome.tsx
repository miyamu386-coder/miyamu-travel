"use client";

import { useState } from "react";
import { Capacitor, registerPlugin } from "@capacitor/core";
import styles from "./maps/JapanOverviewSvg.module.css";
import JapanMap from "./JapanMap";
import NaviWalkingMofu from "./NaviWalkingMofu";

type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

type Route = {
  mode: "walking" | "driving" | "transit";
  available: boolean;
  distance?: number;
  minutes?: number;
  error?: string;
};

const travelWatch = registerPlugin<{
  searchPlaces(options: { query: string }): Promise<{ places: Place[] }>;
  getRoutes(options: {
    latitude: number;
    longitude: number;
  }): Promise<{ routes: Route[] }>;
  startNavigation(options: {
    name: string;
    latitude: number;
    longitude: number;
  }): Promise<void>;
  stopNavigation(): Promise<void>;
  openWalkingMap(options: {
    name: string;
    latitude: number;
    longitude: number;
    mode: "walking" | "transit" | "driving";
  }): Promise<void>;
}>("TravelWatch");

export default function TravelHome() {
  const [naviOpen, setNaviOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [watchBusy, setWatchBusy] = useState(false);
  const [watchMessage, setWatchMessage] = useState("");

  const [travelingMode, setTravelingMode] = useState<
    "walking" | "transit" | "driving" | null
  >(null);
  const [travelingPlace, setTravelingPlace] = useState<Place | null>(null);
  const [travelingMinutes, setTravelingMinutes] = useState<number | null>(null);

  async function openMofuWalkingMap() {
    if (!travelingPlace) return;

    try {
      await travelWatch.openWalkingMap({
        name: travelingPlace.name,
        latitude: travelingPlace.latitude,
        longitude: travelingPlace.longitude,
        mode: travelingMode ?? "walking",
      });
    } catch (error) {
      console.error("Mofu map failed:", error);
      alert("モフの地図を開けませんでした。");
    }
  }

  function startIPhoneTrip(mode: "walking" | "transit" | "driving") {
    if (!selectedPlace) return;

    const route = routes.find((item) => item.mode === mode);

    setTravelingPlace(selectedPlace);
    setTravelingMode(mode);
    setTravelingMinutes(
      route?.available && typeof route.minutes === "number"
        ? route.minutes
        : null
    );
    setNaviOpen(false);
  }

  function finishIPhoneTrip() {
    setTravelingMode(null);
    setTravelingPlace(null);
    setTravelingMinutes(null);
  }

  async function startWatchNavigation() {
    if (!selectedPlace || watchBusy) return;

    setWatchBusy(true);
    setWatchMessage("");

    try {
      await travelWatch.startNavigation({
        name: selectedPlace.name,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });

      setWatchMessage(
        `⌚ ${selectedPlace.name}への徒歩ナビを開始したよ！`
      );
    } catch (error) {
      console.error("Watch navigation failed:", error);
      setWatchMessage("Watchナビを開始できませんでした。");
    } finally {
      setWatchBusy(false);
    }
  }

  async function stopWatchNavigation() {
    if (watchBusy) return;

    setWatchBusy(true);

    try {
      await travelWatch.stopNavigation();
      setWatchMessage("⌚ Watchナビを終了したよ。");
    } catch (error) {
      console.error("Watch navigation stop failed:", error);
      setWatchMessage("Watchナビを終了できませんでした。");
    } finally {
      setWatchBusy(false);
    }
  }

  function openAppleMaps(mode: "walking" | "transit" | "driving") {
    const place = travelingPlace ?? selectedPlace;
    if (!place) return;

    const directions = {
      walking: "w",
      transit: "r",
      driving: "d",
    };

    const destination = `${place.latitude},${place.longitude}`;

    const params = new URLSearchParams({
      daddr: destination,
      dirflg: directions[mode],
    });

    window.location.href = `https://maps.apple.com/?${params.toString()}`;
  }

  async function compareRoutes(place: Place) {
    setSelectedPlace(place);
    setRoutes([]);
    setLoadingRoutes(true);
    setMessage("");

    try {
      const result = await travelWatch.getRoutes({
        latitude: place.latitude,
        longitude: place.longitude,
      });

      setRoutes(result.routes);
    } catch (error) {
      console.error("Route search failed:", error);
      setMessage("経路を取得できませんでした。位置情報の許可を確認してね。");
    } finally {
      setLoadingRoutes(false);
    }
  }

  async function searchDestination() {
    const query = destination.trim();

    if (!query) {
      setMessage("行きたい場所を入力してね。");
      return;
    }

    setSearching(true);
    setMessage("");
    setPlaces([]);
    setSelectedPlace(null);
    setRoutes([]);

    try {
      if (Capacitor.getPlatform() !== "ios" ||
          !Capacitor.isPluginAvailable("TravelWatch")) {
        setMessage("検索はiPhoneアプリで利用できます。");
        return;
      }

      const result = await travelWatch.searchPlaces({ query });
      setPlaces(result.places);

      if (result.places.length === 0) {
        setMessage("見つからなかったよ。別の言葉で探してみてね。");
      }
    } catch (error) {
      console.error(error);
      setMessage("検索できませんでした。");
    } finally {
      setSearching(false);
    }
  }
  return (
    <section className={`travel-home ${styles.home}`}>
      <header className="travel-header">
        <h1>みやむTravel</h1>
        <p>モフ太郎と、日本を旅しよう。</p>
      </header>

      <JapanMap onOpenNavi={() => setNaviOpen(true)} />

      {travelingMode && travelingPlace && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="モフと移動中"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1001,
            background: "#f7faf8",
            color: "#243b32",
            overflowY: "auto",
            padding: "max(24px, env(safe-area-inset-top)) 20px 30px",
            textAlign: "center",
          }}
        >
          <h2>🐾 モフと移動中！</h2>

          <NaviWalkingMofu />

          <div style={{
            margin: "20px auto",
            padding: 20,
            maxWidth: 420,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 18px #00000012",
          }}>
            <p>📍 目的地</p>
            <h3>{travelingPlace.name}</h3>
            <p>{travelingPlace.address}</p>

            <p style={{ marginTop: 18 }}>
              {travelingMode === "walking"
                ? "🚶 徒歩モフ"
                : travelingMode === "transit"
                  ? "🚃 電車モフ"
                  : "🚗 車モフ"}
            </p>

            <p>
              {travelingMinutes !== null
                ? `出発前の所要時間目安：約${travelingMinutes}分`
                : "所要時間はAppleマップで確認してね"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void openMofuWalkingMap();
            }}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 420,
              margin: "12px auto",
              padding: 16,
              borderRadius: 14,
              background: "#dff3eb",
              border: "1px solid #91cdb5",
              fontWeight: "bold",
            }}
          >
            🐾 モフの地図を開く
          </button>

          <button
            type="button"
            onClick={finishIPhoneTrip}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 420,
              margin: "12px auto",
              padding: 16,
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #bbb",
            }}
          >
            🛑 旅を終了
          </button>

          <p style={{ fontSize: 12, marginTop: 20 }}>
            ※ 現在地の追跡・到着の自動判定は未対応です。
          </p>
        </div>
      )}

      {naviOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ナビモフの目的地検索"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          <div style={{
            background: "#fff",
            color: "#222",
            borderRadius: 20,
            padding: 24,
            width: "100%",
            maxWidth: 420, maxHeight: "calc(100dvh - 180px)", overflowY: "auto", overscrollBehavior: "contain",
          }}>
            <h2>🐾 ……今日はどこに行く？</h2>

            <NaviWalkingMofu />

            <label htmlFor="navi-destination">
              行きたい場所を入力
            </label>

            <input
              id="navi-destination"
              type="search"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="施設名・駅・住所など"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 8,
                fontSize: 16,
                border: "1px solid #aaa",
                borderRadius: 10,
              }}
            />

            <button
              type="button"
              disabled={searching}
              onClick={() => void searchDestination()}
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 10,
                background: "#e7f6f3",
                border: "1px solid #7aa",
              }}
            >
              {searching ? "検索中…" : "🔎 目的地を検索"}
            </button>

            {message && <p role="status">{message}</p>}

            {places.length > 0 && (
              <div style={{
                marginTop: 16,
                maxHeight: 250,
                overflowY: "auto",
              }}>
                {places.map((place, index) => (
                  <button
                    key={`${place.latitude}-${place.longitude}-${index}`}
                    type="button"
                    onClick={() => void compareRoutes(place)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: 12,
                      marginBottom: 8,
                      borderRadius: 10,
                      border: selectedPlace === place
                        ? "2px solid #168c7c"
                        : "1px solid #ddd",
                      background: selectedPlace === place
                        ? "#e7f6f3"
                        : "#fff",
                    }}
                  >
                    <strong>{place.name}</strong>
                    <br />
                    <small>{place.address}</small>
                  </button>
                ))}
              </div>
            )}

            {loadingRoutes && (
              <p role="status" style={{ marginTop: 12 }}>
                🐾 モフが経路を調べているよ…
              </p>
            )}

            {routes.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h3>🐈 どうやって行く？</h3>
                {([
                  ["walking", "🚶 徒歩モフ"],
                  ["transit", "🚃 電車モフ"],
                  ["driving", "🚗 車モフ"],
                ] as const).map(([mode, label]) => {
                  const route = routes.find((item) => item.mode === mode);

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => startIPhoneTrip(mode)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: 12,
                        marginBottom: 8,
                        borderRadius: 12,
                        background: "#f0f8f5",
                        border: "1px solid #d8e8e2",
                        cursor: "pointer",
                      }}
                    >
                      <strong>{label}</strong>
                      <p style={{ margin: "6px 0" }}>
                        {route?.available
                          ? `${route.minutes}分・${(
                              (route.distance ?? 0) / 1000
                            ).toFixed(1)}km`
                          : mode === "transit"
                            ? "Appleマップで電車・バスの経路を確認"
                            : "経路を取得できませんでした"}
                      </p>
                      <small>🐾 タップしてモフと出発！</small>
                    </button>
                  );
                })}
              </div>
            )}

            {selectedPlace && (
              <div style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 10,
                background: "#f0f8f5",
              }}>
                <strong>📍 {selectedPlace.name}</strong>
                <p>{selectedPlace.address}</p>
                <small>目的地を選択したよ！</small>

                <button
                  type="button"
                  disabled={watchBusy}
                  onClick={() => void startWatchNavigation()}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 12,
                    background: "#dff3eb",
                    border: "1px solid #91cdb5",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ⌚ この目的地でWatchナビ開始
                </button>

                <button
                  type="button"
                  disabled={watchBusy}
                  onClick={() => void stopWatchNavigation()}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 8,
                    padding: 10,
                    borderRadius: 12,
                  }}
                >
                  🛑 Watchナビ終了
                </button>

                {watchMessage && (
                  <p role="status">{watchMessage}</p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setNaviOpen(false)}
              style={{ marginTop: 12, padding: 12 }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </section>
  );
}