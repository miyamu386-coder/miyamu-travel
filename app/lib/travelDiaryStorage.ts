import {
  Directory,
  Encoding,
  Filesystem,
} from "@capacitor/filesystem";
import type { PrefectureId } from "../types/travel";

export type TravelDiaryEntry = {
  id: string;
  title: string;
  visitedAt: string;
  prefectureId: PrefectureId;
  body: string;
  createdAt: string;
  updatedAt: string;
};

const FILE_NAME = "travel-diary.json";

export async function loadTravelDiary(): Promise<
  TravelDiaryEntry[]
> {
  try {
    const result = await Filesystem.readFile({
      path: FILE_NAME,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    if (typeof result.data !== "string") {
      throw new Error("旅日記のデータ形式が不正です");
    }

    const parsed: unknown = JSON.parse(result.data);

    if (!Array.isArray(parsed)) {
      throw new Error("旅日記のデータ形式が不正です");
    }

    return parsed as TravelDiaryEntry[];
  } catch (error) {
    // 初回起動時のみ、未作成ファイルを空配列として扱う
    if (/does not exist|not found/i.test(String(error))) {
      return [];
    }

    throw error;
  }
}

export async function saveTravelDiary(
  entries: TravelDiaryEntry[]
): Promise<void> {
  await Filesystem.writeFile({
    path: FILE_NAME,
    data: JSON.stringify(entries, null, 2),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
}
