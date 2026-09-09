type Props = {
  onSelectPrefecture: (
    prefectureId: string
  ) => void;
};

const mapStyle = {
  fill: "#e8e8e8",
  stroke: "#333",
  strokeWidth: 1,
  strokeLinejoin: "round" as const,
  cursor: "pointer",
};

const textStyle = {
  fontSize: 6,
  textAnchor: "middle" as const,
  pointerEvents: "none" as const,
  fill: "#222",
};

export default function KantoMapSvg({
  onSelectPrefecture,
}: Props) {
  return (
    <div className="region-map">
      <h3>関東地方</h3>

      <svg
        viewBox="800 400 145 165"
        width="100%"
        role="img"
        aria-label="関東地方の地図"
      >
        {/* 群馬県 */}
        <g
          transform="translate(806.51001 415.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("gunma")
          }
        >
          <polygon
            points="
              64 52
              54 54
              48 50
              37 48
              32 58
              16 67
              12 65
              12 59
              9 56
              12 55
              10 49
              13 47
              12 41
              3 41
              0 36
              1 29
              6 25
              5 23
              14 20
              26 14
              26 11
              29 10
              28 5
              32 4
              34 0
              41 7
              49 9
              47 12
              50 14
              47 17
              46 26
              54 29
              48 42
              53 49
              62 48
            "
          />
        </g>

        {/* 栃木県 */}
        <g
          transform="translate(852.51001 408.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("tochigi")
          }
        >
          <polygon
            points="
              19 60
              18 59
              16 55
              7 56
              2 49
              8 36
              0 33
              1 24
              4 21
              1 19
              3 16
              28 0
              40 3
              46 7
              47 13
              47 24
              48 27
              45 29
              47 39
              44 46
              33 48
              30 53
              27 53
              26 57
            "
          />
        </g>

        {/* 茨城県 */}
        <g
          transform="translate(871.51001 420.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("ibaraki")
          }
        >
          <polygon
            points="
              5 54
              2 55
              0 48
              7 45
              8 41
              11 41
              14 36
              25 34
              28 27
              26 17
              29 15
              28 12
              28 1
              38 10
              44 4
              44 0
              54 5
              46 29
              47 35
              44 42
              46 52
              51 61
              49 63
              51 66
              52 62
              60 74
              42 62
              42 65
              24 69
              13 64
            "
          />
        </g>

        {/* 埼玉県 */}
        <g
          transform="translate(822.51001 463.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("saitama")
          }
        >
          <polygon
            points="
              48 4
              49 5
              51 12
              54 11
              60 24
              60 31
              54 29
              52 31
              48 30
              42 33
              42 29
              35 32
              30 28
              15 24
              12 27
              1 24
              0 19
              16 10
              21 0
              32 2
              38 6
            "
          />
        </g>

        {/* 千葉県 */}
        <g
          transform="translate(876.51001 474.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("chiba")
          }
        >
          <polygon
            points="
              5 29
              7 25
              6 20
              6 13
              0 0
              8 10
              19 15
              37 11
              37 8
              55 20
              55 24
              45 24
              34 35
              32 57
              19 61
              7 75
              0 71
              5 69
              3 66
              4 63
              3 58
              5 53
              1 49
              4 45
              7 46
              7 42
              13 39
              18 33
              11 26
              6 30
            "
          />
        </g>

        {/* 東京都 */}
        <g
          transform="translate(834.51001 487.634125)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("tokyo")
          }
        >
          <path
            d="
              M48 7
              L49 12
              L47 16
              L41 15
              L43 19
              L39 20
              L43 20
              L43 23
              L29 16
              L26 18
              L29 20
              L27 20
              L27 25
              L23 20
              L9 14
              L4 11
              L0 3
              L3 0
              L18 4
              L23 8
              L30 5
              L30 9
              L36 6
              L40 7
              L42 5
              Z
            "
          />
        </g>

        {/* 神奈川県 */}
        <g
          transform="translate(833.51001 501.634094)"
          style={mapStyle}
          onClick={() =>
            onSelectPrefecture("kanagawa")
          }
        >
          <polygon
            points="
              10 0
              24 6
              28 11
              28 6
              30 6
              27 4
              30 2
              44 9
              40 13
              36 12
              39 16
              36 16
              36 23
              42 26
              38 30
              39 33
              35 33
              36 28
              33 24
              26 22
              15 25
              11 28
              12 34
              10 34
              4 30
              4 17
              0 17
              9 9
            "
          />
        </g>

        {/* 都県名 */}

        <text
          x="834"
          y="454"
          style={textStyle}
        >
          群馬
        </text>

        <text
          x="878"
          y="440"
          style={textStyle}
        >
          栃木
        </text>

        <text
          x="900"
          y="468"
          style={textStyle}
        >
          茨城
        </text>

        <text
          x="854"
          y="483"
          style={textStyle}
        >
          埼玉
        </text>

        <text
          x="856"
          y="503"
          style={textStyle}
        >
          東京
        </text>

        <text
          x="852"
          y="522"
          style={textStyle}
        >
          神奈川
        </text>

        <text
          x="900"
          y="514"
          style={textStyle}
        >
          千葉
        </text>
      </svg>
    </div>
  );
}