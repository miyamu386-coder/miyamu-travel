type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

const prefectures = [
  {
    id: "tottori",
    name: "鳥取県",
    d: "M 753.0 1319.0 L 752.0 1318.0 L 642.0 1318.0 L 641.0 1319.0 L 611.0 1349.0 L 611.0 1387.0 L 612.0 1388.0 L 626.0 1388.0 L 627.0 1388.0 L 628.0 1388.0 L 752.0 1388.0 L 753.0 1387.0 Z",
    x: 685,
    y: 1360,
  },
  {
    id: "shimane",
    name: "島根県",
    d: "M 641.0 1319.0 L 640.0 1318.0 L 466.0 1318.0 L 425.0 1359.0 L 425.0 1360.0 L 425.0 1383.0 L 430.0 1388.0 L 473.0 1388.0 L 474.0 1388.0 L 475.0 1388.0 L 610.0 1388.0 L 611.0 1387.0 L 611.0 1349.0 Z",
    x: 535,
    y: 1360,
  },
  {
    id: "okayama",
    name: "岡山県",
    d: "M 753.0 1389.0 L 752.0 1388.0 L 628.0 1388.0 L 627.0 1389.0 L 627.0 1515.0 L 628.0 1516.0 L 718.0 1516.0 L 753.0 1481.0 L 753.0 1480.0 Z",
    x: 690,
    y: 1455,
  },
  {
    id: "hiroshima",
    name: "広島県",
    d: "M 627.0 1389.0 L 626.0 1388.0 L 612.0 1388.0 L 611.0 1388.0 L 610.0 1388.0 L 475.0 1388.0 L 474.0 1389.0 L 474.0 1495.0 L 475.0 1496.0 L 502.0 1496.0 L 525.0 1519.0 L 615.0 1519.0 L 618.0 1516.0 L 626.0 1516.0 L 627.0 1515.0 Z",
    x: 555,
    y: 1455,
  },
  {
    id: "yamaguchi",
    name: "山口県",
    d: "M 425.0 1360.0 L 424.0 1359.0 L 350.0 1359.0 L 344.0 1365.0 L 303.0 1365.0 L 299.0 1369.0 L 299.0 1404.0 L 321.0 1426.0 L 341.0 1426.0 L 433.0 1518.0 L 452.0 1518.0 L 474.0 1496.0 L 474.0 1495.0 L 474.0 1389.0 L 473.0 1388.0 L 430.0 1388.0 L 425.0 1383.0 Z",
    x: 390,
    y: 1435,
  },
] as const;

export default function ChugokuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>中国地方</h3>

      <svg
        viewBox="270 1290 520 270"
        width="100%"
        role="img"
        aria-label="中国地方の地図"
      >
        {prefectures.map((prefecture) => (
          <g
            key={prefecture.id}
            onClick={() =>
              onSelectPrefecture(prefecture.id)
            }
            style={{ cursor: "pointer" }}
          >
            <path
              d={prefecture.d}
              fill="#e8e8e8"
              stroke="#333"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <text
              x={prefecture.x}
              y={prefecture.y}
              textAnchor="middle"
              fontSize="24"
              pointerEvents="none"
            >
              {prefecture.name.replace("県", "")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}