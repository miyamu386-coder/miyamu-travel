import type {
  PrefectureId,
} from "../../types/travel";

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
        viewBox: "1420 0 590 480",
        symbol: "",
        symbolName: "北海道",
        symbolX: 80,
        symbolY: 60,
        symbolImage:
            "/travel/symbols/hokkaido.webp",
        shape: (
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
    niigata: {
        name: "新潟県",
        viewBox: "1200 900 280 320",
        symbol: "",
        symbolName: "新潟",
        symbolX: 1335,
        symbolY: 1085,
        symbolImage:
            "/travel/symbols/niigata.webp",
        shape: (
            <path
                d="M 1283.0 927.0 L 1277.0 921.0 L 1272.0 921.0 L 1236.0 957.0 L 1236.0 963.0 L 1247.0 974.0 L 1247.0 984.0 L 1241.0 990.0 L 1241.0 993.0 L 1246.0 998.0 L 1249.0 998.0 L 1285.0 962.0 L 1285.0 956.0 L 1275.0 946.0 L 1275.0 941.0 L 1283.0 933.0 Z M 1454.0 946.0 L 1449.0 941.0 L 1418.0 941.0 L 1417.0 941.0 L 1246.0 1112.0 L 1216.0 1112.0 L 1215.0 1113.0 L 1215.0 1152.0 L 1216.0 1153.0 L 1307.0 1153.0 L 1354.0 1200.0 L 1413.0 1141.0 L 1413.0 1140.0 L 1413.0 1071.0 L 1454.0 1030.0 L 1454.0 1029.0 Z"
                style={mapStyle}
            />
        ),
    },

    toyama: {
        name: "富山県",
        viewBox: "1040 1085 200 170",
        symbol: "",
        symbolName: "富山",
        symbolX: 1135,
        symbolY: 1195,
        symbolImage:
            "/travel/symbols/toyama.webp",
        shape: (
            <path
                d="M 1107.0 1110.0 L 1106.0 1109.0 L 1066.0 1109.0 L 1061.0 1114.0 L 1061.0 1227.0 L 1062.0 1228.0 L 1188.0 1228.0 L 1189.0 1228.0 L 1190.0 1228.0 L 1214.0 1228.0 L 1215.0 1227.0 L 1215.0 1154.0 L 1215.0 1153.0 L 1215.0 1152.0 L 1215.0 1113.0 L 1214.0 1112.0 L 1193.0 1112.0 L 1155.0 1150.0 L 1108.0 1150.0 L 1107.0 1150.0 L 1107.0 1149.0 Z"
                style={mapStyle}
            />
        ),
    },

    ishikawa: {
        name: "石川県",
        viewBox: "960 995 230 280",
        symbol: "",
        symbolName: "石川",
        symbolX: 1065,
        symbolY: 1165,
        symbolImage:
            "/travel/symbols/ishikawa.webp",
        shape: (
            <path
                d="M 1160.0 1026.0 L 1155.0 1021.0 L 1081.0 1021.0 L 1035.0 1067.0 L 1035.0 1153.0 L 985.0 1203.0 L 986.0 1204.0 L 1003.0 1204.0 L 1045.0 1246.0 L 1060.0 1246.0 L 1061.0 1245.0 L 1061.0 1229.0 L 1061.0 1228.0 L 1061.0 1227.0 L 1061.0 1114.0 L 1066.0 1109.0 L 1106.0 1109.0 L 1107.0 1108.0 L 1107.0 1099.0 L 1160.0 1046.0 Z"
                style={mapStyle}
            />
        ),
    },

    fukui: {
        name: "福井県",
        viewBox: "850 1180 240 210",
        symbol: "",
        symbolName: "福井",
        symbolX: 980,
        symbolY: 1290,
        symbolImage:
            "/travel/symbols/fukui.webp",
        shape: (
            <path
                d="M 1045.0 1246.0 L 1003.0 1204.0 L 986.0 1204.0 L 985.0 1204.0 L 984.0 1204.0 L 926.0 1262.0 L 926.0 1301.0 L 876.0 1351.0 L 889.0 1364.0 L 911.0 1364.0 L 967.0 1308.0 L 1025.0 1308.0 L 1026.0 1308.0 L 1027.0 1308.0 L 1055.0 1308.0 L 1061.0 1302.0 L 1061.0 1247.0 L 1060.0 1246.0 Z"
                style={mapStyle}
            />
        ),
    },

    yamanashi: {
        name: "山梨県",
        viewBox: "1305 1320 180 150",
        symbol: "",
        symbolName: "山梨",
        symbolX: 1390,
        symbolY: 1395,
        symbolImage:
            "/travel/symbols/yamanashi.webp",
        shape: (
            <path
                d="M 1455.0 1345.0 L 1454.0 1344.0 L 1415.0 1344.0 L 1414.0 1344.0 L 1413.0 1344.0 L 1337.0 1344.0 L 1331.0 1350.0 L 1331.0 1410.0 L 1331.0 1411.0 L 1331.0 1412.0 L 1331.0 1436.0 L 1337.0 1442.0 L 1379.0 1442.0 L 1385.0 1436.0 L 1385.0 1425.0 L 1385.0 1424.0 L 1386.0 1424.0 L 1454.0 1424.0 L 1455.0 1423.0 L 1455.0 1392.0 L 1455.0 1391.0 L 1455.0 1390.0 Z"
                style={mapStyle}
            />
        ),
    },

    nagano: {
        name: "長野県",
        viewBox: "1160 1125 290 320",
        symbol: "",
        symbolName: "長野",
        symbolX: 1275,
        symbolY: 1315,
        symbolImage:
            "/travel/symbols/nagano.webp",
        shape: (
            <path
                d="M 1354.0 1200.0 L 1307.0 1153.0 L 1216.0 1153.0 L 1215.0 1154.0 L 1215.0 1227.0 L 1215.0 1228.0 L 1214.0 1228.0 L 1190.0 1228.0 L 1189.0 1229.0 L 1189.0 1410.0 L 1190.0 1411.0 L 1247.0 1411.0 L 1248.0 1411.0 L 1249.0 1411.0 L 1330.0 1411.0 L 1331.0 1410.0 L 1331.0 1350.0 L 1337.0 1344.0 L 1413.0 1344.0 L 1414.0 1343.0 L 1414.0 1309.0 L 1413.0 1308.0 L 1411.0 1308.0 L 1343.0 1240.0 L 1343.0 1211.0 Z"
                style={mapStyle}
            />
        ),
    },

    gifu: {
        name: "岐阜県",
        viewBox: "1000 1200 220 290",
        symbol: "",
        symbolName: "岐阜",
        symbolX: 1110,
        symbolY: 1355,
        symbolImage:
            "/travel/symbols/gifu.webp",
        shape: (
            <path
                d="M 1189.0 1229.0 L 1188.0 1228.0 L 1062.0 1228.0 L 1061.0 1229.0 L 1061.0 1245.0 L 1061.0 1246.0 L 1061.0 1247.0 L 1061.0 1302.0 L 1055.0 1308.0 L 1027.0 1308.0 L 1026.0 1309.0 L 1026.0 1379.0 L 1057.0 1410.0 L 1108.0 1461.0 L 1158.0 1411.0 L 1188.0 1411.0 L 1189.0 1410.0 Z"
                style={mapStyle}
            />
        ),
    },

    shizuoka: {
        name: "静岡県",
        viewBox: "1220 1385 300 240",
        symbol: "",
        symbolName: "静岡",
        symbolX: 1365,
        symbolY: 1505,
        symbolImage:
            "/travel/symbols/shizuoka.webp",
        shape: (
            <path
                d="M 1331.0 1412.0 L 1330.0 1411.0 L 1249.0 1411.0 L 1248.0 1412.0 L 1248.0 1537.0 L 1249.0 1538.0 L 1327.0 1538.0 L 1376.0 1489.0 L 1406.0 1489.0 L 1407.0 1489.0 L 1407.0 1490.0 L 1407.0 1585.0 L 1414.0 1592.0 L 1446.0 1592.0 L 1486.0 1552.0 L 1486.0 1484.0 L 1485.0 1483.0 L 1461.0 1483.0 L 1455.0 1477.0 L 1455.0 1425.0 L 1454.0 1424.0 L 1386.0 1424.0 L 1385.0 1425.0 L 1385.0 1436.0 L 1379.0 1442.0 L 1337.0 1442.0 L 1331.0 1436.0 Z"
                style={mapStyle}
            />
        ),
    },

    aichi: {
        name: "愛知県",
        viewBox: "1080 1385 200 180",
        symbol: "",
        symbolName: "愛知",
        symbolX: 1185,
        symbolY: 1495,
        symbolImage:
            "/travel/symbols/aichi.webp",
        shape: (
            <path
                d="M 1108.0 1461.0 L 1127.0 1480.0 L 1127.0 1485.0 L 1128.0 1486.0 L 1157.0 1486.0 L 1158.0 1486.0 L 1158.0 1487.0 L 1158.0 1537.0 L 1159.0 1538.0 L 1247.0 1538.0 L 1248.0 1537.0 L 1248.0 1412.0 L 1247.0 1411.0 L 1190.0 1411.0 L 1189.0 1411.0 L 1188.0 1411.0 L 1158.0 1411.0 Z"
                style={mapStyle}
            />
        ),
    },
        mie: {
        name: "三重県",
        viewBox: "980 1390 190 330",
        symbol: "",
        symbolName: "三重",
        symbolX: 1070,
        symbolY: 1560,
        symbolImage:
            "/travel/symbols/mie.webp",
        shape: (
            <path
                d="M 1108.0 1461.0 L 1057.0 1410.0 L 1009.0 1458.0 L 1009.0 1459.0 L 1009.0 1470.0 L 1010.0 1471.0 L 1017.0 1471.0 L 1031.0 1485.0 L 1031.0 1618.0 L 1001.0 1648.0 L 1036.0 1683.0 L 1079.0 1640.0 L 1140.0 1640.0 L 1141.0 1639.0 L 1141.0 1594.0 L 1103.0 1556.0 L 1103.0 1492.0 L 1109.0 1486.0 L 1126.0 1486.0 L 1127.0 1485.0 L 1127.0 1480.0 Z"
                style={mapStyle}
            />
        ),
    },

    shiga: {
        name: "滋賀県",
        viewBox: "900 1290 180 190",
        symbol: "",
        symbolName: "滋賀",
        symbolX: 990,
        symbolY: 1385,
        symbolImage:
            "/travel/symbols/shiga.webp",
        shape: (
            <path
                d="M 1026.0 1309.0 L 1025.0 1308.0 L 967.0 1308.0 L 911.0 1364.0 L 1005.0 1458.0 L 1008.0 1458.0 L 1009.0 1458.0 L 1057.0 1410.0 L 1026.0 1379.0 Z"
                style={mapStyle}
            />
        ),
    },

    kyoto: {
        name: "京都府",
        viewBox: "790 1290 240 210",
        symbol: "",
        symbolName: "京都",
        symbolX: 895,
        symbolY: 1400,
        symbolImage:
            "/travel/symbols/kyoto.webp",
        shape: (
            <path
                d="M 876.0 1351.0 L 843.0 1318.0 L 813.0 1318.0 L 812.0 1319.0 L 812.0 1372.0 L 872.0 1432.0 L 873.0 1432.0 L 918.0 1432.0 L 957.0 1471.0 L 958.0 1471.0 L 1008.0 1471.0 L 1009.0 1470.0 L 1009.0 1459.0 L 1008.0 1458.0 L 1005.0 1458.0 L 911.0 1364.0 L 889.0 1364.0 Z"
                style={mapStyle}
            />
        ),
    },

    osaka: {
        name: "大阪府",
        viewBox: "850 1410 130 180",
        symbol: "",
        symbolName: "大阪",
        symbolX: 920,
        symbolY: 1505,
        symbolImage:
            "/travel/symbols/osaka.webp",
        shape: (
            <path
                d="M 957.0 1471.0 L 918.0 1432.0 L 873.0 1432.0 L 872.0 1433.0 L 872.0 1480.0 L 873.0 1481.0 L 886.0 1481.0 L 909.0 1504.0 L 909.0 1516.0 L 886.0 1539.0 L 886.0 1568.0 L 887.0 1569.0 L 956.0 1569.0 L 957.0 1568.0 L 957.0 1472.0 Z"
                style={mapStyle}
            />
        ),
    },

    hyogo: {
        name: "兵庫県",
        viewBox: "730 1290 170 310",
        symbol: "",
        symbolName: "兵庫",
        symbolX: 810,
        symbolY: 1410,
        symbolImage:
            "/travel/symbols/hyogo.webp",
        shape: (
            <path
                d="M 812.0 1319.0 L 811.0 1318.0 L 754.0 1318.0 L 753.0 1319.0 L 753.0 1387.0 L 753.0 1388.0 L 753.0 1389.0 L 753.0 1480.0 L 754.0 1481.0 L 871.0 1481.0 L 872.0 1480.0 L 872.0 1433.0 L 872.0 1432.0 L 812.0 1372.0 Z M 854.0 1509.0 L 845.0 1500.0 L 801.0 1544.0 L 801.0 1549.0 L 822.0 1570.0 L 849.0 1543.0 L 849.0 1522.0 L 854.0 1517.0 Z"
                style={mapStyle}
            />
        ),
    },

    nara: {
        name: "奈良県",
        viewBox: "940 1450 120 220",
        symbol: "",
        symbolName: "奈良",
        symbolX: 995,
        symbolY: 1560,
        symbolImage:
            "/travel/symbols/nara.webp",
        shape: (
            <path
                d="M 1031.0 1485.0 L 1017.0 1471.0 L 1010.0 1471.0 L 1009.0 1471.0 L 1008.0 1471.0 L 958.0 1471.0 L 957.0 1472.0 L 957.0 1568.0 L 957.0 1569.0 L 957.0 1570.0 L 957.0 1643.0 L 962.0 1648.0 L 1001.0 1648.0 L 1031.0 1618.0 Z"
                style={mapStyle}
            />
        ),
    },

    wakayama: {
        name: "和歌山県",
        viewBox: "860 1540 200 210",
        symbol: "",
        symbolName: "和歌山",
        symbolX: 955,
        symbolY: 1650,
        symbolImage:
            "/travel/symbols/wakayama.webp",
        shape: (
            <path
                d="M 957.0 1570.0 L 956.0 1569.0 L 887.0 1569.0 L 886.0 1570.0 L 886.0 1655.0 L 953.0 1722.0 L 997.0 1722.0 L 1036.0 1683.0 L 1001.0 1648.0 L 962.0 1648.0 L 957.0 1643.0 Z"
                style={mapStyle}
            />
        ),
    },
        tottori: {
        name: "鳥取県",
        viewBox: "590 1290 190 130",
        symbol: "",
        symbolName: "鳥取",
        symbolX: 685,
        symbolY: 1360,
        symbolImage:
            "/travel/symbols/tottori.webp",
        shape: (
            <path
                d="M 753.0 1319.0 L 752.0 1318.0 L 642.0 1318.0 L 641.0 1319.0 L 611.0 1349.0 L 611.0 1387.0 L 612.0 1388.0 L 626.0 1388.0 L 627.0 1388.0 L 628.0 1388.0 L 752.0 1388.0 L 753.0 1387.0 Z"
                style={mapStyle}
            />
        ),
    },

    shimane: {
        name: "島根県",
        viewBox: "400 1290 270 130",
        symbol: "",
        symbolName: "島根",
        symbolX: 535,
        symbolY: 1360,
        symbolImage:
            "/travel/symbols/shimane.webp",
        shape: (
            <path
                d="M 641.0 1319.0 L 640.0 1318.0 L 466.0 1318.0 L 425.0 1359.0 L 425.0 1360.0 L 425.0 1383.0 L 430.0 1388.0 L 473.0 1388.0 L 474.0 1388.0 L 475.0 1388.0 L 610.0 1388.0 L 611.0 1387.0 L 611.0 1349.0 Z"
                style={mapStyle}
            />
        ),
    },

    okayama: {
        name: "岡山県",
        viewBox: "600 1360 180 190",
        symbol: "",
        symbolName: "岡山",
        symbolX: 690,
        symbolY: 1455,
        symbolImage:
            "/travel/symbols/okayama.webp",
        shape: (
            <path
                d="M 753.0 1389.0 L 752.0 1388.0 L 628.0 1388.0 L 627.0 1389.0 L 627.0 1515.0 L 628.0 1516.0 L 718.0 1516.0 L 753.0 1481.0 L 753.0 1480.0 Z"
                style={mapStyle}
            />
        ),
    },

    hiroshima: {
        name: "広島県",
        viewBox: "450 1360 210 190",
        symbol: "",
        symbolName: "広島",
        symbolX: 555,
        symbolY: 1455,
        symbolImage:
            "/travel/symbols/hiroshima.webp",
        shape: (
            <path
                d="M 627.0 1389.0 L 626.0 1388.0 L 612.0 1388.0 L 611.0 1388.0 L 610.0 1388.0 L 475.0 1388.0 L 474.0 1389.0 L 474.0 1495.0 L 475.0 1496.0 L 502.0 1496.0 L 525.0 1519.0 L 615.0 1519.0 L 618.0 1516.0 L 626.0 1516.0 L 627.0 1515.0 Z"
                style={mapStyle}
            />
        ),
    },

    yamaguchi: {
        name: "山口県",
        viewBox: "270 1330 230 220",
        symbol: "",
        symbolName: "山口",
        symbolX: 390,
        symbolY: 1435,
        symbolImage:
            "/travel/symbols/yamaguchi.webp",
        shape: (
            <path
                d="M 425.0 1360.0 L 424.0 1359.0 L 350.0 1359.0 L 344.0 1365.0 L 303.0 1365.0 L 299.0 1369.0 L 299.0 1404.0 L 321.0 1426.0 L 341.0 1426.0 L 433.0 1518.0 L 452.0 1518.0 L 474.0 1496.0 L 474.0 1495.0 L 474.0 1389.0 L 473.0 1388.0 L 430.0 1388.0 L 425.0 1383.0 Z"
                style={mapStyle}
            />
        ),
    },
        tokushima: {
        name: "徳島県",
        viewBox: "650 1570 190 180",
        symbol: "",
        symbolName: "徳島",
        symbolX: 750,
        symbolY: 1645,
        symbolImage:
            "/travel/symbols/tokushima.webp",
        shape: (
            <path
                d="M 810.0 1608.0 L 796.0 1594.0 L 795.0 1594.0 L 794.0 1594.0 L 679.0 1594.0 L 678.0 1595.0 L 678.0 1636.0 L 678.0 1637.0 L 756.0 1715.0 L 810.0 1661.0 Z"
                style={mapStyle}
            />
        ),
    },

    kagawa: {
        name: "香川県",
        viewBox: "630 1520 190 110",
        symbol: "",
        symbolName: "香川",
        symbolX: 720,
        symbolY: 1580,
        symbolImage:
            "/travel/symbols/kagawa.webp",
        shape: (
            <path
                d="M 795.0 1593.0 L 748.0 1546.0 L 691.0 1546.0 L 654.0 1583.0 L 654.0 1593.0 L 655.0 1594.0 L 677.0 1594.0 L 678.0 1594.0 L 679.0 1594.0 L 794.0 1594.0 Z"
                style={mapStyle}
            />
        ),
    },

    ehime: {
        name: "愛媛県",
        viewBox: "400 1510 310 290",
        symbol: "",
        symbolName: "愛媛",
        symbolX: 535,
        symbolY: 1640,
        symbolImage:
            "/travel/symbols/ehime.webp",
        shape: (
            <path
                d="M 569.0 1594.0 L 517.0 1542.0 L 509.0 1542.0 L 425.0 1626.0 L 425.0 1729.0 L 465.0 1769.0 L 466.0 1768.0 L 466.0 1722.0 L 551.0 1637.0 L 677.0 1637.0 L 678.0 1636.0 L 678.0 1595.0 L 677.0 1594.0 L 655.0 1594.0 L 654.0 1594.0 L 653.0 1594.0 Z"
                style={mapStyle}
            />
        ),
    },

    kochi: {
        name: "高知県",
        viewBox: "440 1610 350 200",
        symbol: "",
        symbolName: "高知",
        symbolX: 610,
        symbolY: 1725,
        symbolImage:
            "/travel/symbols/kochi.webp",
        shape: (
            <path
                d="M 756.0 1715.0 L 678.0 1637.0 L 677.0 1637.0 L 551.0 1637.0 L 466.0 1722.0 L 466.0 1768.0 L 466.0 1769.0 L 466.0 1770.0 L 473.0 1777.0 L 525.0 1777.0 L 526.0 1776.0 L 526.0 1751.0 L 581.0 1696.0 L 641.0 1696.0 L 708.0 1763.0 Z"
                style={mapStyle}
            />
        ),
    },
        fukuoka: {
        name: "福岡県",
        viewBox: "90 1390 240 210",
        symbol: "",
        symbolName: "福岡",
        symbolX: 200,
        symbolY: 1480,
        symbolImage:
            "/travel/symbols/fukuoka.webp",
        shape: (
            <path
                d="M 298.0 1452.0 L 264.0 1418.0 L 143.0 1418.0 L 125.0 1436.0 L 165.0 1476.0 L 165.0 1486.0 L 120.0 1531.0 L 120.0 1532.0 L 120.0 1537.0 L 146.0 1563.0 L 147.0 1563.0 L 148.0 1563.0 L 153.0 1563.0 L 180.0 1536.0 L 220.0 1536.0 L 221.0 1535.0 L 221.0 1529.0 Z"
                style={mapStyle}
            />
        ),
    },

    saga: {
        name: "佐賀県",
        viewBox: "20 1410 180 160",
        symbol: "",
        symbolName: "佐賀",
        symbolX: 105,
        symbolY: 1490,
        symbolImage:
            "/travel/symbols/saga.webp",
        shape: (
            <path
                d="M 165.0 1476.0 L 125.0 1436.0 L 87.0 1474.0 L 45.0 1474.0 L 44.0 1475.0 L 44.0 1483.0 L 92.0 1531.0 L 93.0 1531.0 L 119.0 1531.0 L 120.0 1531.0 L 165.0 1486.0 Z"
                style={mapStyle}
            />
        ),
    },

    nagasaki: {
        name: "長崎県",
        viewBox: "-10 1440 150 210",
        symbol: "",
        symbolName: "長崎",
        symbolX: 55,
        symbolY: 1550,
        symbolImage:
            "/travel/symbols/nagasaki.webp",
        shape: (
            <path
                d="M 44.0 1475.0 L 43.0 1474.0 L 14.0 1474.0 L 13.0 1475.0 L 13.0 1579.0 L 45.0 1611.0 L 102.0 1611.0 L 106.0 1607.0 L 106.0 1575.0 L 101.0 1570.0 L 93.0 1570.0 L 92.0 1570.0 L 92.0 1569.0 L 92.0 1532.0 L 92.0 1531.0 L 44.0 1483.0 Z"
                style={mapStyle}
            />
        ),
    },

    kumamoto: {
        name: "熊本県",
        viewBox: "80 1510 200 240",
        symbol: "",
        symbolName: "熊本",
        symbolX: 190,
        symbolY: 1620,
        symbolImage:
            "/travel/symbols/kumamoto.webp",
        shape: (
            <path
                d="M 248.0 1540.0 L 244.0 1536.0 L 222.0 1536.0 L 221.0 1536.0 L 220.0 1536.0 L 180.0 1536.0 L 153.0 1563.0 L 148.0 1563.0 L 147.0 1564.0 L 147.0 1645.0 L 111.0 1681.0 L 112.0 1682.0 L 179.0 1682.0 L 215.0 1718.0 L 248.0 1685.0 L 248.0 1588.0 L 248.0 1587.0 L 248.0 1586.0 Z"
                style={mapStyle}
            />
        ),
    },

    oita: {
        name: "大分県",
        viewBox: "190 1420 210 210",
        symbol: "",
        symbolName: "大分",
        symbolX: 305,
        symbolY: 1540,
        symbolImage:
            "/travel/symbols/oita.webp",
        shape: (
            <path
                d="M 361.0 1515.0 L 298.0 1452.0 L 221.0 1529.0 L 221.0 1535.0 L 222.0 1536.0 L 244.0 1536.0 L 248.0 1540.0 L 248.0 1586.0 L 249.0 1587.0 L 360.0 1587.0 L 361.0 1586.0 Z"
                style={mapStyle}
            />
        ),
    },

    miyazaki: {
        name: "宮崎県",
        viewBox: "190 1550 210 280",
        symbol: "",
        symbolName: "宮崎",
        symbolX: 305,
        symbolY: 1670,
        symbolImage:
            "/travel/symbols/miyazaki.webp",
        shape: (
            <path
                d="M 361.0 1588.0 L 360.0 1587.0 L 249.0 1587.0 L 248.0 1588.0 L 248.0 1685.0 L 215.0 1718.0 L 291.0 1794.0 L 314.0 1771.0 L 314.0 1672.0 L 361.0 1625.0 Z"
                style={mapStyle}
            />
        ),
    },

    kagoshima: {
        name: "鹿児島県",
        viewBox: "80 1650 250 230",
        symbol: "",
        symbolName: "鹿児島",
        symbolX: 190,
        symbolY: 1770,
        symbolImage:
            "/travel/symbols/kagoshima.webp",
        shape: (
            <path
                d="M 215.0 1718.0 L 179.0 1682.0 L 112.0 1682.0 L 111.0 1682.0 L 110.0 1683.0 L 110.0 1827.0 L 115.0 1832.0 L 164.0 1832.0 L 169.0 1827.0 L 169.0 1759.0 L 174.0 1754.0 L 204.0 1754.0 L 209.0 1759.0 L 209.0 1839.0 L 214.0 1844.0 L 241.0 1844.0 L 291.0 1794.0 Z"
                style={mapStyle}
            />
        ),
    },

    okinawa: {
        name: "沖縄県",
        viewBox: "-20 1850 150 180",
        symbol: "",
        symbolName: "沖縄",
        symbolX: 50,
        symbolY: 1940,
        symbolImage:
            "/travel/symbols/okinawa.webp",
        shape: (
            <path
                d="M 94.0 1894.0 L 83.0 1883.0 L 75.0 1883.0 L 57.0 1901.0 L 48.0 1901.0 L 42.0 1895.0 L 39.0 1895.0 L 28.0 1906.0 L 28.0 1913.0 L 33.0 1918.0 L 33.0 1928.0 L 1.0 1960.0 L 1.0 1993.0 L 7.0 1999.0 L 24.0 1999.0 L 27.0 1996.0 L 27.0 1968.0 L 94.0 1901.0 Z"
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
            if (!prefecture) {
        return (
            <div className="prefecture-map">
                <h3>準備中</h3>
            </div>
        );
    }

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