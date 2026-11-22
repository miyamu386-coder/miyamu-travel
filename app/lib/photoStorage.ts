import {
  Directory,
  Encoding,
  Filesystem,
} from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

export type TravelPhoto = {
  albumId?: string;
  id: string;
  title: string;
  prefectureId: string;
  takenAt: string;
  memo: string;
  imagePath: string;
  createdAt: string;
};

const PHOTO_FILE = "travel-photos.json";

export async function saveTravelPhotoImage(
  dataUrl: string
): Promise<string> {
  const base64 = dataUrl.split(",")[1];

  if (!base64) {
    throw new Error("画像データがありません");
  }

  const path = `travel-photos/${crypto.randomUUID()}.jpeg`;

  await Filesystem.writeFile({
    path,
    data: base64,
    directory: Directory.Data,
    recursive: true,
  });

  return path;
}

export async function saveTravelPhotos(
  photos: TravelPhoto[]
): Promise<void> {
  await Filesystem.writeFile({
    path: PHOTO_FILE,
    data: JSON.stringify(photos, null, 2),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
}

export async function loadTravelPhotos(): Promise<
  TravelPhoto[]
> {
  try {
    const result = await Filesystem.readFile({
      path: PHOTO_FILE,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    if (typeof result.data !== "string") {
      return [];
    }

    const parsed: unknown = JSON.parse(result.data);

    if (!Array.isArray(parsed)) {
      throw new Error("写真記録の形式が不正です");
    }

    return parsed as TravelPhoto[];
  } catch (error) {
    const message = String(error);

    if (/does not exist|not found|不存在/i.test(message)) {
      return [];
    }

    throw error;
  }
}

export async function getTravelPhotoUrl(
  path: string
): Promise<string> {
  if (!Capacitor.isNativePlatform()) {
    const result = await Filesystem.readFile({
      path,
      directory: Directory.Data,
    });

    if (typeof result.data !== "string") {
      throw new Error("画像データを読み込めません");
    }

    return `data:image/jpeg;base64,${result.data}`;
  }

  const result = await Filesystem.getUri({
    path,
    directory: Directory.Data,
  });

  return Capacitor.convertFileSrc(result.uri);
}

export async function deleteTravelPhotoImage(
  path: string
): Promise<void> {
  await Filesystem.deleteFile({
    path,
    directory: Directory.Data,
  });
}
