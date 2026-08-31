"use client";

import { useState } from "react";
import TravelHome from "./components/TravelHome";
import TravelTabBar from "./components/TravelTabBar";

export default function Home() {
  const [tab, setTab] = useState("home");

  return (
    <main>
      {tab === "home" && <TravelHome />}

      <TravelTabBar
        currentTab={tab}
        onChange={setTab}
      />
    </main>
  );
}