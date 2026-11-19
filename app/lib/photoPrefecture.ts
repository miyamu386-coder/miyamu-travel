import { prefectures } from "../data/prefectures";
import type { PrefectureId } from "../types/travel";

type Coordinates = { latitude: number; longitude: number };
type Ring = [number, number][];
type Polygon = Ring[];
type Boundary = {
  properties: { shapeISO: string };
  geometry: { type: "Polygon"; coordinates: Polygon }
    | { type: "MultiPolygon"; coordinates: Polygon[] };
};

let boundaryRequest: Promise<Boundary[]> | undefined;

function loadBoundaries() {
  boundaryRequest ??= fetch("/geo/japan-adm1.geojson")
    .then(async (response) => {
      if (!response.ok) throw new Error("都道府県境界を読み込めません");
      const data: { features: Boundary[] } = await response.json();
      return data.features;
    })
    .catch((error: unknown) => {
      boundaryRequest = undefined;
      throw error;
    });
  return boundaryRequest;
}

function insideRing({ latitude, longitude }: Coordinates, ring: Ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[j];
    const [x2, y2] = ring[i];
    if ((y1 > latitude) !== (y2 > latitude) &&
        longitude < x1 + (x2 - x1) * (latitude - y1) / (y2 - y1)) {
      inside = !inside;
    }
  }
  return inside;
}

export function locatePrefecture(point: Coordinates, boundaries: Boundary[]) {
  if (!Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) return;
  const matches = boundaries.filter(({ geometry }) => {
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polygons.some(([outer, ...holes]) =>
      outer && insideRing(point, outer) && !holes.some((hole) => insideRing(point, hole)),
    );
  });
  if (matches.length === 1) {
    return prefectures.find(({ code }) => code === matches[0].properties.shapeISO)?.id;
  }
}

async function readPhotoCoordinates(dataUrl: string): Promise<Coordinates | undefined> {
  try {
    const { gps } = await import("exifr");
    const image = await fetch(dataUrl);
    return await gps(new Uint8Array(await image.arrayBuffer()));
  } catch {
    return undefined;
  }
}

function getCurrentCoordinates(): Promise<Coordinates | undefined> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(undefined);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords.accuracy <= 10_000 ? coords : undefined),
      () => resolve(undefined),
      { timeout: 5000, maximumAge: 0 },
    );
  });
}

export async function getPhotoPrefecture(
  dataUrl: string,
  takenNow: boolean,
): Promise<PrefectureId | undefined> {
  try {
    const point = await readPhotoCoordinates(dataUrl) ??
      (takenNow ? await getCurrentCoordinates() : undefined);
    if (point) return locatePrefecture(point, await loadBoundaries());
  } catch {
    // Manual selection is still available if location lookup fails.
  }
}
