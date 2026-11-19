"use client";

import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";

import { getPhotoPrefecture } from "../../lib/photoPrefecture";

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
    onSave: (record: GoshuinRecord, previewSrc: string) => Promise<void>;
    onCancel?: () => void;
};

export default function GoshuinRecordForm({
    prefectures,
    initialPrefectureId,
    onSave,
    onCancel,
}: Props) {
    const [prefectureId, setPrefectureId] =
        useState<PrefectureId | "">(initialPrefectureId ?? "");
    const photoRequest = useRef(0);
    const prefectureRevision = useRef(0);

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

    const saving = useRef(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    const [imageUrl, setImageUrl] =
        useState("");

    useEffect(() => {
        if (initialPrefectureId) {
            setPrefectureId(initialPrefectureId);
        }
    }, [initialPrefectureId]);

    const selectPhoto = async (takenNow: boolean) => {
        const request = ++photoRequest.current;
        const revision = prefectureRevision.current;
        const image = await (takenNow ? takeGoshuinPhoto() : pickGoshuinPhoto());
        if (!image || request !== photoRequest.current) return;

        setImageUrl(image);
        const detected = await getPhotoPrefecture(image, takenNow);
        if (detected && request === photoRequest.current &&
            revision === prefectureRevision.current) {
            setPrefectureId(detected);
        }
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        if (saving.current) return;

        if (!placeName.trim()) {
            window.alert(
                "寺社名を入力してください。",
            );
            return;
        }

        if (!prefectureId) {
            window.alert("都道府県を選択してください。");
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

        saving.current = true;
        setIsSaving(true);
        setSaveError("");

        try {
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

            await onSave(record, imageUrl);

            setPlaceName("");
            setPlaceType("shrine");
            setReceivedAt("");
            setMemo("");
            setIsFavorite(false);
            setPawStamp(true);
            setImageUrl("");
        } catch (error) {
            console.error("御朱印の保存失敗", error);
            setSaveError("御朱印を保存できませんでした。");
        } finally {
            saving.current = false;
            setIsSaving(false);
        }
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
                        onClick={() => void selectPhoto(true)}
                        style={styles.photoButton}
                    >
                        📷 撮影する
                    </button>

                    <button
                        type="button"
                        onClick={() => void selectPhoto(false)}
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
                required
                onChange={(event) => {
                    prefectureRevision.current++;
                    setPrefectureId(event.target.value as PrefectureId | "");
                }}
                style={styles.input}
            >
                <option value="">都道府県を選択</option>
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
                disabled={isSaving}
                style={styles.saveButton}
            >
                {isSaving ? "保存中…" : "保存する"}
            </button>

            {saveError && <p role="alert">{saveError}</p>}

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