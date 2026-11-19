import type { PrefectureId } from "../../types/travel";
import JapanOverviewArtwork from "./JapanOverviewArtwork";

type Props = {
  visitedIds: ReadonlySet<PrefectureId>;
  hokkaidoComplete: boolean;
  onSelectRegion: (
    region:
      | "hokkaido"
      | "tohoku"
      | "kanto"
      | "chubu"
      | "kinki"
      | "chugoku"
      | "shikoku"
      | "kyushu"
  ) => void;
};

export default function JapanOverviewSvg({
  onSelectRegion,
  visitedIds,
  hokkaidoComplete,
}: Props) {
  return (
    <div className="japan-overview">
      <JapanOverviewArtwork visitedIds={visitedIds} hokkaidoComplete={hokkaidoComplete} />

      <button
        className="map-hotspot hotspot-hokkaido"
        onClick={() => onSelectRegion("hokkaido")}
      >
        北海道
      </button>

      <button
        className="map-hotspot hotspot-tohoku"
        onClick={() => onSelectRegion("tohoku")}
      >
        東北
      </button>

      <button
        className="map-hotspot hotspot-kanto"
        onClick={() => onSelectRegion("kanto")}
      >
        関東
      </button>

      <button
        className="map-hotspot hotspot-chubu"
        onClick={() => onSelectRegion("chubu")}
      >
        中部
      </button>

      <button
        className="map-hotspot hotspot-kinki"
        onClick={() => onSelectRegion("kinki")}
      >
        近畿
      </button>

      <button
        className="map-hotspot hotspot-chugoku"
        onClick={() => onSelectRegion("chugoku")}
      >
        中国
      </button>

      <button
        className="map-hotspot hotspot-shikoku"
        onClick={() => onSelectRegion("shikoku")}
      >
        四国
      </button>

      <button
        className="map-hotspot hotspot-kyushu"
        onClick={() => onSelectRegion("kyushu")}
      >
        九州・沖縄
      </button>
    </div>
  );
}