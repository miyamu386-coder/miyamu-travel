import type { PrefectureId } from "../types/travel";

export type TouristSpot = {
  id: string;
  prefectureId: PrefectureId;
  name: string;
  area: string;
  category: string;
  description: string;
};

export const touristSpots: TouristSpot[] = [
  {
    id: "yokohama-red-brick",
    prefectureId: "kanagawa",
    name: "横浜赤レンガ倉庫",
    area: "横浜市",
    category: "歴史・観光",
    description:
      "歴史ある赤レンガの建物を活用した、横浜港周辺の観光スポット。",
  },
  {
    id: "yokohama-chinatown",
    prefectureId: "kanagawa",
    name: "横浜中華街",
    area: "横浜市",
    category: "グルメ・街歩き",
    description:
      "中華料理店や商店が集まる、横浜を代表する観光エリア。",
  },
  {
    id: "tsurugaoka-hachimangu",
    prefectureId: "kanagawa",
    name: "鶴岡八幡宮",
    area: "鎌倉市",
    category: "神社",
    description:
      "鎌倉の歴史と深く結びついた神社。鎌倉観光の代表的な場所。",
  },
  {
    id: "enoshima",
    prefectureId: "kanagawa",
    name: "江の島",
    area: "藤沢市",
    category: "自然・観光",
    description:
      "湘南の海に浮かぶ島。神社や展望スポット、海の景色を楽しめる。",
  },
  {
    id: "hakone-jinja",
    prefectureId: "kanagawa",
    name: "箱根神社",
    area: "箱根町",
    category: "神社",
    description:
      "芦ノ湖の近くに鎮座する神社。自然豊かな箱根の名所。",
  },
  {
    id: "odawara-castle",
    prefectureId: "kanagawa",
    name: "小田原城",
    area: "小田原市",
    category: "城・歴史",
    description:
      "戦国時代の北条氏ゆかりの城。小田原の歴史を知ることができる。",
  },
];
