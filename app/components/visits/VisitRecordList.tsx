"use client";

import type { VisitRecord } from "../../types/travel";

type Props = {
    prefectureId: string;
    visits: VisitRecord[];
};

export function VisitRecordList({
    prefectureId,
    visits,
}: Props) {
    const prefectureVisits = visits.filter(
        (visit) =>
            visit.prefectureId === prefectureId
    );

    return (
        <section className="spot-list">
            <div className="spot-list-header">
                <div>
                    <h3>🐾 旅の記録</h3>
                    <p>この土地での思い出</p>
                </div>

                <span className="spot-list-count">
                    {prefectureVisits.length}件
                </span>
            </div>

            {prefectureVisits.length === 0 ? (
                <div className="spot-list-empty">
                    <div className="spot-list-empty-paw">
                        🐾
                    </div>

                    <p className="spot-list-empty-title">
                        まだ旅の記録がありません
                    </p>

                    <p className="spot-list-empty-description">
                        訪れた場所や思い出を記録すると、
                        <br />
                        ここに旅の足あとが残ります。
                    </p>
                </div>
            ) : (
                <ul className="spot-list-items">
                    {prefectureVisits.map((visit) => (
                        <li
                            key={visit.id}
                            className="spot-list-item"
                        >
                            <div className="spot-list-item-header">
                                <h4>{visit.name}</h4>

                                <time>
                                    {visit.visitedAt}
                                </time>
                            </div>

                            {visit.memo && (
                                <p>{visit.memo}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}