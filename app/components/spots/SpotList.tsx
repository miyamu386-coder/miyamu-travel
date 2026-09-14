"use client";

import type { TravelSpot } from "../../types/travel";

type Props = {
    prefectureId: string;
    spots: TravelSpot[];
};

export function SpotList({
    prefectureId,
    spots,
}: Props) {
    const prefectureSpots = spots.filter(
        (spot) =>
            spot.prefectureId === prefectureId
    );

    if (prefectureSpots.length === 0) {
        return (
            <section className="spot-list">
                <h3>旅の記録</h3>

                <p className="spot-list-empty">
                    まだ訪問記録がありません。
                </p>
            </section>
        );
    }

    return (
        <section className="spot-list">
            <h3>旅の記録</h3>

            <ul>
                {prefectureSpots.map((spot) => (
                    <li key={spot.id}>
                        <h4>{spot.name}</h4>
                        <time>{spot.visitedAt}</time>

                        {spot.memo && (
                            <p>{spot.memo}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}