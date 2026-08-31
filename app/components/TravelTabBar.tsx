type Props = {
  currentTab: string;
  onChange: (tab: string) => void;
};

export default function TravelTabBar({
  currentTab,
  onChange,
}: Props) {
  const tabs = [
    { id: "home", icon: "🏠", label: "ホーム" },
    { id: "spots", icon: "📍", label: "スポット" },
    { id: "goshuin", icon: "🐾", label: "御朱印帳" },
    { id: "album", icon: "🖼️", label: "写真" },
    { id: "diary", icon: "📖", label: "旅日記" },
  ];

  return (
    <nav className="travel-tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={
            currentTab === tab.id
              ? "travel-tab active"
              : "travel-tab"
          }
          onClick={() => onChange(tab.id)}
        >
          <span className="travel-tab-icon">
            {tab.icon}
          </span>

          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}