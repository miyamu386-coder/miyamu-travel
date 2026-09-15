export type PrefectureId =
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
  | "kanagawa"
  | "niigata"
  | "toyama"
  | "ishikawa"
  | "fukui"
  | "yamanashi"
  | "nagano"
  | "gifu"
  | "shizuoka"
  | "aichi"
  | "mie"
  | "shiga"
  | "kyoto"
  | "osaka"
  | "hyogo"
  | "nara"
  | "wakayama"
  | "tottori"
  | "shimane"
  | "okayama"
  | "hiroshima"
  | "yamaguchi"
  | "tokushima"
  | "kagawa"
  | "ehime"
  | "kochi"
  | "fukuoka"
  | "saga"
  | "nagasaki"
  | "kumamoto"
  | "oita"
  | "miyazaki"
  | "kagoshima"
  | "okinawa";

export type Prefecture = {
  id: PrefectureId;
  name: string;
  region: string;
};

export type VisitRecord = {
  id: string;
  prefectureId: PrefectureId;
  name: string;
  visitedAt: string;
  memo: string;
  photoUrl?: string;
};