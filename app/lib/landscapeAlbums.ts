import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export type Album = { id: string; title: string };
export const firstAlbum: Album = { id: "first", title: "風景アルバム" };
const path = "landscape-albums-v1.json";
const directory = Directory.Data;

export async function loadAlbums(): Promise<Album[]> {
  try {
    const result = await Filesystem.readFile({ path, directory, encoding: Encoding.UTF8 });
    const albums = JSON.parse(String(result.data));
    if (!Array.isArray(albums) || albums[0]?.id !== firstAlbum.id ||
        !albums.every(a => typeof a?.id === "string" && typeof a.title === "string" && a.title.trim())) {
      throw new Error("アルバムの一覧を読み込めませんでした");
    }
    return albums;
  } catch (e) {
    if ((e as {code?: string})?.code === "OS-PLUG-FILE-0008" ||
        /does not exist|not found|不存在/i.test(String(e))) return [firstAlbum];
    throw e;
  }
}

export async function saveAlbums(albums: Album[]) {
  await Filesystem.writeFile({path, directory, encoding: Encoding.UTF8, data: JSON.stringify(albums)});
}
