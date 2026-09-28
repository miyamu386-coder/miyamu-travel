"use client";

import {
    useEffect,
    useState,
} from "react";

import type {
    GoshuinRecord,
} from "../../types/travel";
import {
    loadGoshuinImage,
} from "../../lib/goshuinStorage";

type Props = {
    records: GoshuinRecord[];
    onAdd: () => void;
};

export default function GoshuinAlbum({
    records,
    onAdd,
}: Props) {
    const [imageUrls, setImageUrls] =
        useState<Record<string, string>>({});

    useEffect(() => {
        const loadImages = async () => {
            const entries =
                await Promise.all(
                    records.map(
                        async (record) => {
                            const url =
                                await loadGoshuinImage(
                                    record.imageUrl,
                                );

                            return [
                                record.id,
                                url,
                            ] as const;
                        },
                    ),
                );

            setImageUrls(
                Object.fromEntries(entries),
            );
        };

        void loadImages();
    }, [records]);


    return (
        <section style={styles.container}>
            <h2 style={styles.title}>
                御朱印帳
            </h2>
            <button
                type="button"
                onClick={onAdd}
                style={styles.addButton}
            >
                ＋ 御朱印を追加
            </button>

            {records.length === 0 ? (
                <div style={styles.empty}>
                    <div style={styles.emptyIcon}>
                        🐾
                    </div>

                    <p>
                        まだ御朱印がありません
                    </p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {records.map((record) => (
                        <article
                            key={record.id}
                            style={styles.card}
                        >
                            {imageUrls[record.id] ? (
                                <img
                                    src={imageUrls[record.id]}
                                    alt={`${record.placeName}の御朱印`}
                                    style={styles.image}
                                />
                            ) : (
                                <div style={styles.imagePlaceholder}>
                                    📖
                                </div>
                            )}

                            <strong>
                                {record.placeName}
                            </strong>

                            <span style={styles.date}>
                                {record.receivedAt}
                            </span>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

const styles: Record<
    string,
    React.CSSProperties
> = {
    container: {
        padding: 16,
        paddingBottom: 100,
    },

    title: {
        margin: "4px 0 18px",
        fontSize: 24,
    },
    addButton: {
        width: "100%",
        padding: "12px 16px",
        marginBottom: 18,
        border: "none",
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
    },

    empty: {
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
    },

    emptyIcon: {
        fontSize: 42,
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: 12,
    },

    card: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    image: {
        width: "100%",
        aspectRatio: "3 / 4",
        objectFit: "cover",
        borderRadius: 14,
        display: "block",
    },

    imagePlaceholder: {
        aspectRatio: "3 / 4",
        borderRadius: 14,
        background: "#f1eee7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
    },

    date: {
        fontSize: 12,
        opacity: 0.6,
    },
};