"use client";

import PrefectureMapSvg from "../maps/PrefectureMapSvg";
import { VisitRecordList } from "../visits/VisitRecordList";

import type {
    PrefectureId,
    VisitRecord,
} from "../../types/travel";

type Props = {
    prefectureId: PrefectureId;
    visits: VisitRecord[];
    onAddVisit: () => void;
};

export default function PrefectureDetailView({
    prefectureId,
    visits,
    onAddVisit,
}: Props) {
    return (
        <section className="prefecture-detail">
            <PrefectureMapSvg
                prefectureId={prefectureId}
            />

            <VisitRecordList
                prefectureId={prefectureId}
                visits={visits}
            />

            <button
                type="button"
                className="prefecture-add-button"
                onClick={onAddVisit}
            >
                ＋ 訪問記録を追加
            </button>
        </section>
    );
}