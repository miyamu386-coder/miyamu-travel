type PrefectureId =
    | "hokkaido"
    | "aomori"
    | "iwate"
    | "miyagi"
    | "akita"
    | "yamagata"
    | "fukushima"
    | "ibaraki"
    | "tochigi"
    | "gunma"
    | "saitama"
    | "chiba"
    | "tokyo"
    | "kanagawa";

type Props = {
    prefectureId: PrefectureId;
};

type PrefectureMapData = {
    name: string;
    viewBox: string;
    symbol: string;
    symbolName: string;
    symbolX: number;
    symbolY: number;
    symbolImage?: string;
    shape: React.ReactNode;
};

const mapStyle = {
    fill: "#e8e8e8",
    stroke: "#333",
    strokeWidth: 1,
    strokeLinejoin: "round" as const,
};

const symbolTextStyle = {
    fontSize: 7,
    textAnchor: "middle" as const,
    pointerEvents: "none" as const,
};

const symbolNameStyle = {
    fontSize: 4,
    textAnchor: "middle" as const,
    fill: "#222",
    pointerEvents: "none" as const,
};

const prefectureMaps: Record<
    PrefectureId,
    PrefectureMapData
> = {
    hokkaido: {
        name: "北海道",
        viewBox: "0 0 160 120",
        symbol: "",
        symbolName: "北海道",
        symbolX: 80,
        symbolY: 60,
        symbolImage:
            "/travel/symbols/hokkaido.webp",
        shape: (
            <path
                d="
                    M20 50
                    L35 35
                    L55 25
                    L75 28
                    L90 20
                    L105 28
                    L115 40
                    L135 45
                    L145 60
                    L130 70
                    L115 72
                    L105 85
                    L85 90
                    L70 82
                    L55 90
                    L40 80
                    L25 70
                    Z
                "
                style={mapStyle}
            />
        ),
    },
    aomori: {
        name: "青森県",
        viewBox: "1400 460 340 250",
        symbol: "",
        symbolName: "青森",
        symbolX: 1565,
        symbolY: 585,
        symbolImage:
            "/travel/symbols/aomori.webp",
        shape: (
            <path
                d="M 1664.0 514.0 L 1626.0 476.0 L 1569.0 476.0 L 1562.0 483.0 L 1562.0 513.0 L 1569.0 520.0 L 1602.0 520.0 L 1603.0 520.0 L 1603.0 521.0 L 1603.0 571.0 L 1598.0 576.0 L 1530.0 576.0 L 1529.0 576.0 L 1529.0 575.0 L 1529.0 523.0 L 1523.0 517.0 L 1478.0 517.0 L 1470.0 525.0 L 1470.0 573.0 L 1417.0 626.0 L 1417.0 647.0 L 1418.0 648.0 L 1556.0 648.0 L 1563.0 655.0 L 1563.0 690.0 L 1564.0 691.0 L 1571.0 691.0 L 1615.0 647.0 L 1717.0 647.0 L 1718.0 646.0 L 1664.0 592.0 Z"
                style={mapStyle}
            />
        ),
    },

    iwate: {
        name: "岩手県",
        viewBox: "1540 625 200 240",
        symbol: "",
        symbolName: "岩手",
        symbolX: 1640,
        symbolY: 755,
        symbolImage:
            "/travel/symbols/iwate.webp",
        shape: (
            <path
                d="M 1719.0 648.0 L 1718.0 647.0 L 1717.0 647.0 L 1615.0 647.0 L 1571.0 691.0 L 1564.0 691.0 L 1563.0 692.0 L 1563.0 841.0 L 1564.0 842.0 L 1718.0 842.0 L 1719.0 841.0 Z"
                style={mapStyle}
            />
        ),
    },

    miyagi: {
        name: "宮城県",
        viewBox: "1540 820 200 200",
        symbol: "",
        symbolName: "宮城",
        symbolX: 1635,
        symbolY: 925,
        symbolImage:
            "/travel/symbols/miyagi.webp",
        shape: (
            <path
                d="M 1719.0 843.0 L 1718.0 842.0 L 1564.0 842.0 L 1563.0 843.0 L 1563.0 860.0 L 1563.0 861.0 L 1563.0 862.0 L 1563.0 997.0 L 1564.0 998.0 L 1690.0 998.0 L 1691.0 997.0 L 1691.0 933.0 L 1719.0 905.0 Z"
                style={mapStyle}
            />
        ),
    },

    akita: {
        name: "秋田県",
        viewBox: "1375 625 210 260",
        symbol: "",
        symbolName: "秋田",
        symbolX: 1485,
        symbolY: 760,
        symbolImage:
            "/travel/symbols/akita.webp",
        shape: (
            <path
                d="M 1563.0 655.0 L 1556.0 648.0 L 1418.0 648.0 L 1417.0 649.0 L 1417.0 699.0 L 1416.0 700.0 L 1416.0 701.0 L 1397.0 720.0 L 1397.0 745.0 L 1417.0 765.0 L 1417.0 860.0 L 1418.0 861.0 L 1562.0 861.0 L 1563.0 860.0 L 1563.0 843.0 L 1563.0 842.0 L 1563.0 841.0 L 1563.0 692.0 L 1563.0 691.0 L 1563.0 690.0 Z"
                style={mapStyle}
            />
        ),
    },

    yamagata: {
        name: "山形県",
        viewBox: "1395 840 190 215",
        symbol: "",
        symbolName: "山形",
        symbolX: 1490,
        symbolY: 945,
        symbolImage:
            "/travel/symbols/yamagata.webp",
        shape: (
            <path
                d="M 1563.0 862.0 L 1562.0 861.0 L 1418.0 861.0 L 1417.0 862.0 L 1417.0 940.0 L 1418.0 941.0 L 1449.0 941.0 L 1454.0 946.0 L 1454.0 1029.0 L 1455.0 1030.0 L 1562.0 1030.0 L 1563.0 1029.0 L 1563.0 999.0 L 1563.0 998.0 L 1563.0 997.0 Z"
                style={mapStyle}
            />
        ),
    },

    fukushima: {
        name: "福島県",
        viewBox: "1390 975 325 190",
        symbol: "",
        symbolName: "福島",
        symbolX: 1555,
        symbolY: 1085,
        symbolImage:
            "/travel/symbols/fukushima.webp",
        shape: (
            <path
                d="M 1691.0 999.0 L 1690.0 998.0 L 1564.0 998.0 L 1563.0 999.0 L 1563.0 1029.0 L 1563.0 1030.0 L 1562.0 1030.0 L 1455.0 1030.0 L 1454.0 1030.0 L 1413.0 1071.0 L 1413.0 1140.0 L 1414.0 1141.0 L 1498.0 1141.0 L 1499.0 1140.0 L 1499.0 1129.0 L 1505.0 1123.0 L 1612.0 1123.0 L 1617.0 1128.0 L 1617.0 1141.0 L 1618.0 1142.0 L 1690.0 1142.0 L 1691.0 1141.0 Z"
                style={mapStyle}
            />
        ),
    },

    gunma: {
        name: "群馬県",
        viewBox: "-5 -5 75 80",
        symbol: "♨️",
        symbolName: "草津温泉・湯畑",
        symbolX: 32,
        symbolY: 32,
        symbolImage:
            "/travel/symbols/gunma.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    tochigi: {
        name: "栃木県",
        viewBox: "-5 -5 60 75",
        symbol: "💧",
        symbolName: "華厳の滝",
        symbolX: 27,
        symbolY: 31,
        symbolImage:
            "/travel/symbols/tochigi.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    ibaraki: {
        name: "茨城県",
        viewBox: "-5 -5 70 90",
        symbol: "🌼",
        symbolName: "国営ひたち海浜公園",
        symbolX: 40,
        symbolY: 38,
        symbolImage:
            "/travel/symbols/ibaraki.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    saitama: {
        name: "埼玉県",
        viewBox: "-5 -5 70 45",
        symbol: "🏯",
        symbolName: "川越・時の鐘",
        symbolX: 30,
        symbolY: 18,
        symbolImage:
            "/travel/symbols/saitama.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    chiba: {
        name: "千葉県",
        viewBox: "-5 -5 70 90",
        symbol: "🌴",
        symbolName: "房総・海",
        symbolX: 31,
        symbolY: 38,
        symbolImage:
            "/travel/symbols/chiba.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    tokyo: {
        name: "東京都",
        viewBox: "-5 -5 60 40",
        symbol: "🗼",
        symbolName: "東京タワー",
        symbolX: 24,
        symbolY: 13,
        symbolImage:
            "/travel/symbols/tokyo.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },

    kanagawa: {
        name: "神奈川県",
        viewBox: "-5 -5 55 50",
        symbol: "",
        symbolName: "神奈川",
        symbolX: 29,
        symbolY: 14,
        symbolImage:
            "/travel/symbols/kanagawa.webp",
        shape: (
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
                style={mapStyle}
            />
        ),
    },
};

export default function PrefectureMapSvg({
    prefectureId,
}: Props) {
    const prefecture =
        prefectureMaps[prefectureId];

    return (
        <div className="prefecture-map">
            <h3>{prefecture.name}</h3>

            <div className="prefecture-map-stage">
                <svg
                    viewBox={prefecture.viewBox}
                    width="100%"
                    role="img"
                    aria-label={`${prefecture.name}の地図`}
                >
                    {prefecture.shape}

                    {!prefecture.symbolImage && (
                        <>
                            <text
                                x={prefecture.symbolX}
                                y={prefecture.symbolY}
                                style={symbolTextStyle}
                            >
                                {prefecture.symbol}
                            </text>

                            <text
                                x={prefecture.symbolX}
                                y={prefecture.symbolY + 7}
                                style={symbolNameStyle}
                            >
                                {prefecture.symbolName}
                            </text>
                        </>
                    )}
                </svg>

                {prefecture.symbolImage && (
                    <div className="prefecture-popup-wrap">
                        <img
                            src={prefecture.symbolImage}
                            alt={prefecture.symbolName}
                            className="prefecture-popup-symbol"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}