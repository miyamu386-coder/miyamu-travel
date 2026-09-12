type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

export default function HokkaidoMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>北海道地方</h3>

      <svg
        viewBox="1420 0 590 480"
        width="100%"
        role="img"
        aria-label="北海道の地図"
      >
        <path
          d="
            M 1866.0 195.0
            L 1671.0 0.0
            L 1611.0 0.0
            L 1602.0 9.0
            L 1602.0 169.0
            L 1581.0 190.0
            L 1581.0 244.0
            L 1532.0 293.0
            L 1478.0 293.0
            L 1471.0 300.0
            L 1471.0 399.0
            L 1441.0 429.0
            L 1441.0 434.0
            L 1472.0 465.0
            L 1481.0 465.0
            L 1510.0 436.0
            L 1570.0 436.0
            L 1571.0 435.0
            L 1571.0 419.0
            L 1550.0 398.0
            L 1535.0 398.0
            L 1529.0 392.0
            L 1529.0 365.0
            L 1529.0 364.0
            L 1530.0 364.0
            L 1583.0 364.0
            L 1620.0 401.0
            L 1655.0 366.0
            L 1663.0 366.0
            L 1761.0 464.0
            L 1790.0 464.0
            L 1894.0 360.0
            L 1986.0 360.0
            L 1987.0 359.0
            L 1987.0 340.0
            L 1969.0 322.0
            L 1969.0 238.0
            L 1988.0 219.0
            L 1988.0 202.0
            L 1981.0 195.0
            Z
          "
          fill="#e8e8e8"
          stroke="#333"
          strokeWidth="2"
          strokeLinejoin="round"
          onClick={() =>
            onSelectPrefecture("hokkaido")
          }
          style={{ cursor: "pointer" }}
        />

        <text
          x="1710"
          y="250"
          textAnchor="middle"
          fontSize="28"
          pointerEvents="none"
        >
          北海道
        </text>
      </svg>
    </div>
  );
}