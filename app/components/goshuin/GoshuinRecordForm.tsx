"use client";

import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import type {
    GoshuinPlaceType,
    GoshuinRecord,
    Prefecture,
    PrefectureId,
} from "../../types/travel";

import {
    pickGoshuinPhoto,
    takeGoshuinPhoto,
} from "../../lib/goshuinCamera";

import {
    saveGoshuinImage,
} from "../../lib/goshuinStorage";


type Props = {
    prefectures: Prefecture[];
    initialPrefectureId?: PrefectureId;
    onSave: (record: GoshuinRecord) => void;
    onCancel?: () => void;
};

export default function GoshuinRecordForm({
    prefectures,
    initialPrefectureId,
    onSave,
    onCancel,
}: Props) {
    const [prefectureId, setPrefectureId] =
        useState<PrefectureId>(
            initialPrefectureId ??
            prefectures[0]?.id ??
            "hokkaido",
        );

    const [placeName, setPlaceName] =
        useState("");

    const [placeType, setPlaceType] =
        useState<GoshuinPlaceType>("shrine");

    const [receivedAt, setReceivedAt] =
        useState("");

    const [memo, setMemo] =
        useState("");

    const [isFavorite, setIsFavorite] =
        useState(false);

    const [pawStamp, setPawStamp] =
        useState(true);

    const [imageUrl, setImageUrl] =
        useState("");

    useEffect(() => {
        if (initialPrefectureId) {
            setPrefectureId(initialPrefectureId);
        }
    }, [initialPrefectureId]);

    const handleTakePhoto = async () => {
        const image =
            await takeGoshuinPhoto();

        if (image) {
            setImageUrl(image);
        }
    };

    const handlePickPhoto = async () => {
        const image =
            await pickGoshuinPhoto();

        if (image) {
            setImageUrl(image);
        }
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!placeName.trim()) {
            window.alert(
                "寺社名を入力してください。",
            );
            return;
        }

        if (!receivedAt) {
            window.alert(
                "御朱印をいただいた日を入力してください。",
            );
            return;
        }

        if (!imageUrl) {
            window.alert(
                "御朱印の画像を選択してください。",
            );
            return;
        }

        const savedImagePath =
            await saveGoshuinImage(
                imageUrl,
            );

        const now =
            new Date().toISOString();

        const record: GoshuinRecord = {
            id: crypto.randomUUID(),
            prefectureId,
            placeName:
                placeName.trim(),
            placeType,
            receivedAt,
            imageUrl: savedImagePath,
            memo: memo.trim(),
            isFavorite,
            pawStamp,
            createdAt: now,
            updatedAt: now,
        };

        onSave(record);

        setPlaceName("");
        setPlaceType("shrine");
        setReceivedAt("");
        setMemo("");
        setIsFavorite(false);
        setPawStamp(true);
        setImageUrl("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={styles.form}
        >
            <h2 style={styles.title}>
                御朱印を記録
            </h2>

            <label style={styles.label}>
                御朱印
            </label>

            <div style={styles.imageArea}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="御朱印プレビュー"
                        style={styles.preview}
                    />
                ) : (
                    <div style={styles.imagePlaceholder}>
                        <span style={styles.cameraIcon}>
                            📷
                        </span>

                        <span>
                            御朱印の写真を追加
                        </span>
                    </div>
                )}

                <div style={styles.photoButtons}>
                    <button
                        type="button"
                        onClick={handleTakePhoto}
                        style={styles.photoButton}
                    >
                        📷 撮影する
                    </button>

                    <button
                        type="button"
                        onClick={handlePickPhoto}
                        style={styles.photoButton}
                    >
                        🖼️ 写真から選ぶ
                    </button>
                </div>

                {imageUrl && (
                    <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        style={styles.removePhotoButton}
                    >
                        写真を削除
                    </button>
                )}
            </div>


            <label style={styles.label}>
                寺社名
            </label>

            <input
                type="text"
                value={placeName}
                onChange={(event) =>
                    setPlaceName(
                        event.target.value,
                    )
                }
                placeholder="例：鶴岡八幡宮"
                style={styles.input}
            />

            <label style={styles.label}>
                種類
            </label>

            <div
                style={
                    styles.segmentContainer
                }
            >
                <button
                    type="button"
                    onClick={() =>
                        setPlaceType("shrine")
                    }
                    style={{
                        ...styles.segmentButton,
                        ...(placeType ===
                            "shrine"
                            ? styles.segmentActive
                            : {}),
                    }}
                >
                    ⛩ 神社
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setPlaceType("temple")
                    }
                    style={{
                        ...styles.segmentButton,
                        ...(placeType ===
                            "temple"
                            ? styles.segmentActive
                            : {}),
                    }}
                >
                    卍 お寺
                </button>
            </div>

            <label style={styles.label}>
                都道府県
            </label>

            <select
                value={prefectureId}
                onChange={(event) =>
                    setPrefectureId(
                        event.target
                            .value as PrefectureId,
                    )
                }
                style={styles.input}
            >
                {prefectures.map(
                    (prefecture) => (
                        <option
                            key={prefecture.id}
                            value={prefecture.id}
                        >
                            {prefecture.name}
                        </option>
                    ),
                )}
            </select>

            <label style={styles.label}>
                いただいた日
            </label>

            <input
                type="date"
                value={receivedAt}
                onChange={(event) =>
                    setReceivedAt(
                        event.target.value,
                    )
                }
                style={styles.input}
            />

            <label style={styles.label}>
                メモ
            </label>

            <textarea
                value={memo}
                onChange={(event) =>
                    setMemo(
                        event.target.value,
                    )
                }
                placeholder="御朱印や参拝の思い出など"
                style={styles.textarea}
            />

            <label
                style={styles.switchRow}
            >
                <span>お気に入り</span>

                <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={(event) =>
                        setIsFavorite(
                            event.target.checked,
                        )
                    }
                />
            </label>

            <label
                style={styles.switchRow}
            >
                <span>
                    モフ太郎の肉球スタンプ
                </span>

                <input
                    type="checkbox"
                    checked={pawStamp}
                    onChange={(event) =>
                        setPawStamp(
                            event.target.checked,
                        )
                    }
                />
            </label>

            <button
                type="submit"
                style={styles.saveButton}
            >
                保存する
            </button>

            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    style={
                        styles.cancelButton
                    }
                >
                    キャンセル
                </button>
            )}
        </form>
    );
}

const styles: Record<
    string,
    React.CSSProperties
> = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 16,
        paddingBottom: 40,
    },

    title: {
        margin: "4px 0 10px",
        fontSize: 22,
    },

    label: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: 700,
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        borderRadius: 12,
        border:
            "1px solid rgba(0,0,0,0.15)",
        background: "#fff",
        fontSize: 16,
    },

    textarea: {
        width: "100%",
        minHeight: 100,
        boxSizing: "border-box",
        padding: 14,
        borderRadius: 12,
        border:
            "1px solid rgba(0,0,0,0.15)",
        resize: "vertical",
        fontSize: 16,
    },

    imageArea: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },

    photoButtons: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
    },

    photoButton: {
        padding: 12,
        borderRadius: 12,
        border:
            "1px solid rgba(0,0,0,0.12)",
        background: "#fff",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
    },

    removePhotoButton: {
        padding: 10,
        border: "none",
        background: "transparent",
        fontSize: 14,
        cursor: "pointer",
    },

    imagePlaceholder: {
        height: 210,
        borderRadius: 18,
        border:
            "2px dashed rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background:
            "rgba(255,255,255,0.65)",
    },

    cameraIcon: {
        fontSize: 34,
    },

    preview: {
        display: "block",
        width: "100%",
        maxHeight: 360,
        objectFit: "contain",
        borderRadius: 18,
        background: "#f4f4f4",
    },

    segmentContainer: {
        display: "grid",
        gridTemplateColumns:
            "1fr 1fr",
        gap: 8,
    },

    segmentButton: {
        padding: 12,
        borderRadius: 12,
        border:
            "1px solid rgba(0,0,0,0.12)",
        background: "#fff",
        fontSize: 15,
        cursor: "pointer",
    },

    segmentActive: {
        fontWeight: 700,
        background:
            "rgba(255,220,130,0.45)",
    },

    switchRow: {
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        padding: "12px 4px",
        fontWeight: 600,
    },

    saveButton: {
        marginTop: 10,
        padding: 14,
        border: "none",
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
    },

    cancelButton: {
        padding: 12,
        borderRadius: 14,
        border:
            "1px solid rgba(0,0,0,0.12)",
        background: "#fff",
        fontSize: 15,
        cursor: "pointer",
    },
};