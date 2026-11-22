"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { watch } from "../lib/travelWatch";

export default function NaviMofuButton() {
  const [available, setAvailable] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setAvailable(Capacitor.getPlatform() === "ios" && Capacitor.isPluginAvailable("TravelWatch"));
  }, []);

  if (!available) return null;

  async function run(action: "startNavigation" | "stopNavigation") {
    setBusy(true);
    try {
      if (action === "startNavigation") {
        setMessage("目的地を選択してから、モフと出発してね！");
      } else {
        await watch.stopNavigation();
        setMessage("案内を終了しました。");
      }
    } catch {
      setMessage("ナビモフを起動できませんでした。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ margin: "12px auto", padding: "0 16px", maxWidth: 520, textAlign: "center" }}>
      <button type="button" disabled={busy} onClick={() => void run("startNavigation")}>
        🐾 ナビモフを開始
      </button>{" "}
      <button type="button" disabled={busy} onClick={() => void run("stopNavigation")}>
        案内終了
      </button>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
