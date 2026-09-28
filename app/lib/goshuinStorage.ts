import type {
  GoshuinRecord,
} from "../types/travel";

import {
  Directory,
  Encoding,
  Filesystem,
} from "@capacitor/filesystem";
import {
  Capacitor,
} from "@capacitor/core";

const GOSHUIN_DIRECTORY = "goshuin";

const GOSHUIN_RECORDS_FILE =
  "goshuin-records.json";

/**
 * Data URLの御朱印画像を
 * アプリ専用領域へ保存する
 */
export async function saveGoshuinImage(
  dataUrl: string,
): Promise<string> {
  const base64Data =
    dataUrl.split(",")[1];

  if (!base64Data) {
    throw new Error(
      "御朱印画像のデータがありません。",
    );
  }

  const fileName =
    `${crypto.randomUUID()}.jpeg`;

  const path =
    `${GOSHUIN_DIRECTORY}/${fileName}`;

  await Filesystem.writeFile({
    path,
    data: base64Data,
    directory: Directory.Data,
    recursive: true,
  });

  return path;
}
/**
 * 御朱印記録の一覧を保存する
 */
export async function saveGoshuinRecords(
  records: GoshuinRecord[],
): Promise<void> {
  await Filesystem.writeFile({
  path: GOSHUIN_RECORDS_FILE,
  data: JSON.stringify(
    records,
    null,
    2,
  ),
  directory: Directory.Data,
  encoding: Encoding.UTF8,
});
}
/**
 * 保存済みの御朱印記録を読み込む
 */
export async function loadGoshuinRecords(): Promise<
  GoshuinRecord[]
> {
  try {
    const result =
      await Filesystem.readFile({
        path: GOSHUIN_RECORDS_FILE,
        directory: Directory.Data,
       encoding: Encoding.UTF8,
      });

    if (typeof result.data !== "string") {
      return [];
    }

    return JSON.parse(
      result.data,
    ) as GoshuinRecord[];
  } catch {
    // 初回起動など、まだ保存ファイルがない場合
    return [];
  }
}
/**
 * 保存済みの御朱印画像を
 * 表示用URLとして取得する
 */
export async function loadGoshuinImage(
  path: string,
): Promise<string> {
  const result =
    await Filesystem.getUri({
      path,
      directory: Directory.Data,
    });

  return Capacitor.convertFileSrc(
  result.uri,
);
}