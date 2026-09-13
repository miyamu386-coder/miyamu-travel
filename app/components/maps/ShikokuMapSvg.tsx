type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

const prefectures = [
  {
    id: "tokushima",
    name: "徳島県",
    d: "M 810.0 1608.0 L 796.0 1594.0 L 795.0 1594.0 L 794.0 1594.0 L 679.0 1594.0 L 678.0 1595.0 L 678.0 1636.0 L 678.0 1637.0 L 756.0 1715.0 L 810.0 1661.0 Z",
    x: 750,
    y: 1645,
  },
  {
    id: "kagawa",
    name: "香川県",
    d: "M 795.0 1593.0 L 748.0 1546.0 L 691.0 1546.0 L 654.0 1583.0 L 654.0 1593.0 L 655.0 1594.0 L 677.0 1594.0 L 678.0 1594.0 L 679.0 1594.0 L 794.0 1594.0 Z",
    x: 720,
    y: 1580,
  },
  {
    id: "ehime",
    name: "愛媛県",
    d: "M 569.0 1594.0 L 517.0 1542.0 L 509.0 1542.0 L 425.0 1626.0 L 425.0 1729.0 L 465.0 1769.0 L 466.0 1768.0 L 466.0 1722.0 L 551.0 1637.0 L 677.0 1637.0 L 678.0 1636.0 L 678.0 1595.0 L 677.0 1594.0 L 655.0 1594.0 L 654.0 1594.0 L 653.0 1594.0 Z",
    x: 535,
    y: 1640,
  },
  {
    id: "kochi",
    name: "高知県",
    d: "M 756.0 1715.0 L 678.0 1637.0 L 677.0 1637.0 L 551.0 1637.0 L 466.0 1722.0 L 466.0 1768.0 L 466.0 1769.0 L 466.0 1770.0 L 473.0 1777.0 L 525.0 1777.0 L 526.0 1776.0 L 526.0 1751.0 L 581.0 1696.0 L 641.0 1696.0 L 708.0 1763.0 Z",
    x: 610,
    y: 1725,
  },
] as const;

export default function ShikokuMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>四国地方</h3>

      <svg
        viewBox="390 1510 460 300"
        width="100%"
        role="img"
        aria-label="四国地方の地図"
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