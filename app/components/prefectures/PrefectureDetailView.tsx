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
    onEditVisit: (visit: VisitRecord) => void;
    onDeleteVisit: (visitId: string) => void;
};

export default function PrefectureDetailView({
    prefectureId,
    visits,
    onAddVisit,
    onEditVisit,
    onDeleteVisit,
}: Props) {
    return (
        <section className="prefecture-detail">
            <PrefectureMapSvg
                prefectureId={prefectureId}
            />

           <VisitRecordList
    prefectureId={prefectureId}
    visits={visits}
    onEditVisit={onEditVisit}
    onDeleteVisit={onDeleteVisit}
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