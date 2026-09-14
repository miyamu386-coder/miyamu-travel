"use client";

import PrefectureMapSvg from "../maps/PrefectureMapSvg";
import { SpotList } from "../spots/SpotList";

import type {
    PrefectureId,
    TravelSpot,
} from "../../types/travel";

type Props = {
    prefectureId: PrefectureId;
    spots: TravelSpot[];
    onAddSpot: () => void;
};

export default function PrefectureDetailView({
    prefectureId,
    spots,
    onAddSpot,
}: Props) {

    return (
        <section className="prefecture-detail">
            <PrefectureMapSvg
                prefectureId={prefectureId}
            />

            <button
                type="button"
                className="prefecture-add-button"
                onClick={onAddSpot}
            >
                ＋ 訪問記録を追加
            </button>
            <SpotList
                prefectureId={prefectureId}
                spots={spots}
            />
        </section>
    );
}