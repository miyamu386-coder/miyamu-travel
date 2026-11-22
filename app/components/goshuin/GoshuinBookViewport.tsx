"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import styles from "./GoshuinBookViewport.module.css";

type Point = { x: number; y: number };
type View = Point & { scale: number };
type Gesture =
    | { type: "swipe"; start: Point; scroll: HTMLElement | null; scrollTop: number }
    | { type: "pan"; start: Point; view: View }
    | { type: "pinch"; center: Point; distance: number; view: View }
    | { type: "idle" };
type Turn = { direction: -1 | 1; page: ReactNode };

type Props = {
    children: ReactNode;
    pageIndex: number;
    pageCount: number;
    onPageChange: (index: number) => void;
};

const NORMAL: View = { x: 0, y: 0, scale: 1 };
const MAX_SCALE = 4;
const TURN_MS = 360;

function measure(points: Map<number, Point>) {
    const [first, second] = [...points.values()];
    return {
        center: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
        distance: Math.max(1, Math.hypot(first.x - second.x, first.y - second.y)),
    };
}

function clamp(value: number, extent: number) {
    return Math.max(-extent, Math.min(extent, value));
}

export default function GoshuinBookViewport({
    children, pageIndex, pageCount, onPageChange,
}: Props) {
    const [view, setView] = useState<View>(NORMAL);
    const [turn, setTurn] = useState<Turn | null>(null);
    const currentView = useRef<View>(NORMAL);
    const points = useRef(new Map<number, Point>());
    const gesture = useRef<Gesture>({ type: "idle" });
    const lastTap = useRef<{ time: number; point: Point } | null>(null);

    useEffect(() => {
        if (!turn) return;
        const timer = window.setTimeout(() => setTurn(null), TURN_MS);
        return () => window.clearTimeout(timer);
    }, [turn]);

    function changeView(next: View, viewport: HTMLElement) {
        const { clientWidth, clientHeight } = viewport;
        currentView.current = {
            scale: next.scale,
            x: clamp(next.x, clientWidth * (next.scale - 1) / 2),
            y: clamp(next.y, clientHeight * (next.scale - 1) / 2),
        };
        setView(currentView.current);
    }

    function reset() {
        currentView.current = NORMAL;
        setView(NORMAL);
    }

    function go(direction: -1 | 1) {
        const next = pageIndex + direction;
        if (turn || next < 0 || next >= pageCount) return;
        reset();
        lastTap.current = null;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTurn({ direction, page: children });
        }
        onPageChange(next);
    }

    function point(event: PointerEvent<HTMLDivElement>): Point {
        const bounds = event.currentTarget.getBoundingClientRect();
        return {
            x: event.clientX - bounds.left - bounds.width / 2,
            y: event.clientY - bounds.top - bounds.height / 2,
        };
    }

    function onDown(event: PointerEvent<HTMLDivElement>) {
        if (event.button !== 0 || turn || points.current.size >= 2) return;
        const start = point(event);
        event.currentTarget.setPointerCapture(event.pointerId);
        points.current.set(event.pointerId, start);
        const view = currentView.current;
        if (points.current.size === 2) {
            lastTap.current = null;
            gesture.current = { type: "pinch", ...measure(points.current), view };
        } else {
            const scroll = event.target instanceof Element
                ? event.target.closest<HTMLElement>("[data-goshuin-scroll]")
                : null;
            gesture.current = view.scale > 1
                ? { type: "pan", start, view }
                : { type: "swipe", start, scroll, scrollTop: scroll?.scrollTop ?? 0 };
        }
    }

    function onMove(event: PointerEvent<HTMLDivElement>) {
        if (!points.current.has(event.pointerId)) return;
        const now = point(event);
        points.current.set(event.pointerId, now);

        const mode = gesture.current;
        if (mode.type === "pinch") {
            const { center, distance } = measure(points.current);
            const scale = Math.min(MAX_SCALE, Math.max(1, mode.view.scale * distance / mode.distance));
            const ratio = scale / mode.view.scale;
            changeView({
                scale,
                x: center.x - (mode.center.x - mode.view.x) * ratio,
                y: center.y - (mode.center.y - mode.view.y) * ratio,
            }, event.currentTarget);
        } else if (mode.type === "swipe" && mode.scroll) {
            const dy = now.y - mode.start.y;
            if (Math.abs(dy) > Math.abs(now.x - mode.start.x)) {
                mode.scroll.scrollTop = mode.scrollTop - dy;
            }
        } else if (mode.type === "pan") {
            changeView({
                scale: mode.view.scale,
                x: mode.view.x + now.x - mode.start.x,
                y: mode.view.y + now.y - mode.start.y,
            }, event.currentTarget);
        }
    }

    function finish(event: PointerEvent<HTMLDivElement>, cancelled: boolean) {
        if (!points.current.delete(event.pointerId)) return;
        const mode = gesture.current;
        const remaining = points.current.values().next().value;
        const view = currentView.current;
        gesture.current = remaining && view.scale > 1
            ? { type: "pan", start: remaining, view }
            : { type: "idle" };

        if (cancelled || remaining || (mode.type !== "swipe" && mode.type !== "pan")) {
            lastTap.current = null;
            return;
        }

        if (mode.type === "swipe" && view.scale === 1) {
            const end = point(event);
            const dx = end.x - mode.start.x;
            const dy = end.y - mode.start.y;
            if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                go(dx < 0 ? 1 : -1);
                return;
            }
        }

        const end = point(event);
        if (Math.hypot(end.x - mode.start.x, end.y - mode.start.y) > 12) {
            lastTap.current = null;
            return;
        }
        const now = Date.now();
        const last = lastTap.current;
        if (last && now - last.time < 350 &&
            Math.hypot(end.x - last.point.x, end.y - last.point.y) < 36) {
            lastTap.current = null;
            if (view.scale > 1) reset();
            else changeView({ scale: 2, x: -end.x, y: -end.y }, event.currentTarget);
        } else {
            lastTap.current = { time: now, point: end };
        }
    }

    return (
        <div>
            <div
                className={styles.viewport}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={(event) => finish(event, false)}
                onPointerCancel={(event) => finish(event, true)}
                onLostPointerCapture={(event) => finish(event, true)}
                onDragStart={(event) => event.preventDefault()}
            >
                <div style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
                    {children}
                </div>
                {turn && (
                    <div aria-hidden="true" inert className={styles.previous}>
                        <div className={turn.direction === 1 ? styles.stillLeft : styles.stillRight}>
                            <div className={styles.oldSpread}>{turn.page}</div>
                        </div>
                        <div className={turn.direction === 1 ? styles.sheetNext : styles.sheetPrevious}>
                            <div className={styles.oldSpread}>{turn.page}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.controls}>
                <button type="button" onClick={() => go(-1)} disabled={pageIndex === 0 || !!turn}>前へ</button>
                <button
                    type="button"
                    onClick={() => {
                        if (view.scale > 1) reset();
                        else {
                            currentView.current = { x: 0, y: 0, scale: 2 };
                            setView(currentView.current);
                        }
                    }}
                    disabled={!!turn}
                >
                    {view.scale > 1 ? "等倍に戻す" : "拡大"}
                </button>
                <button type="button" onClick={() => go(1)} disabled={pageIndex + 1 >= pageCount || !!turn}>次へ</button>
            </div>
        </div>
    );
}
