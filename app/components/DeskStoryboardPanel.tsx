// app/components/DeskStoryboardPanel.tsx
import { useMemo, useRef } from "react";
import {
    MotionConfig,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
    Variants,
} from "framer-motion";

/**
 * 参考イメージ（セピア基調）に沿った3ステップ演出:
 * 0–2.5s: 机の上に山盛り（微振動）
 * 2.5–5.0s: 歯車が回り、紙が処理レールに乗って右へ
 * 5.0–8.0s: 整理された成果（書類/フォルダ/モニター）& チェック軌跡 → ループ
 */

type Props = {
    cycleMs?: number; // 既定 8000ms
    className?: string;
    headline?: string;
    subline?: string;
};

export default function DeskStoryboardPanel({
    cycleMs = 8000,
    className = "",
    headline = "AIで「机の上」が片づき、作業がサクサク進む",
    subline = "混乱を整理し、業務スピードを加速。",
}: Props) {
    const reduce = useReducedMotion();

    // ===== パレット（セピア調） =====
    const PAL = {
        bg: "#F3E3C8", // 背景
        desk: "#E8D2B4",
        stroke: "#6B4F35",
        sheet: "#FFF8EC",
        folder: "#E1C59C",
        monitor: "#EAD9BE",
        accent: "#AC8C62", // ライン/強調
    };

    // ===== 視差（軽め） =====
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
    const px = useTransform(sx, (v) => v * 8);
    const py = useTransform(sy, (v) => v * 8);
    const tiltX = useTransform(sy, (v) => v * -2.5);
    const tiltY = useTransform(sx, (v) => v * 2.5);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        mx.set((x - 0.5) * 2);
        my.set((y - 0.5) * 2);
    };

    const T = (n: number) => (n * cycleMs) / 1000;

    // ===== 紙の山（安定再現用のシード乱数） =====
    const piles = useMemo(() => {
        const seed = 17;
        const rnd = (i: number) => {
            const x = Math.sin(i * 9301 + seed * 49297) * 233280;
            return x - Math.floor(x);
        };
        // 3山：左から大・中・小（量感の差で"処理しきれない"を演出）
        const baseX = [0, 70, 130];
        return baseX.map((bx, p) => {
            const n = 8 + Math.floor(rnd(p) * 5); // 8..12枚
            return Array.from({ length: n }).map((_, i) => ({
                x: bx + (rnd(p * 100 + i) * 14 - 7),
                y: i * 12 + (rnd(p * 200 + i) * 3 - 1.5),
                r: rnd(p * 300 + i) * 10 - 5,
                z: i,
            }));
        });
    }, []);

    // ===== Variants =====
    // スキャンライン（2.5→3.6s 付近をピーク）
    const scan: Variants = reduce
        ? {}
        : {
            run: {
                x: ["-15%", "110%"],
                opacity: [0, 1, 0],
                transition: {
                    times: [0.31, 0.45, 0.46], // 2.5s ~ 3.6s
                    duration: T(1),
                    ease: "linear",
                    repeat: Infinity,
                },
            },
        };

    // 紙の山：後半で高さが目に見えて減る
    const pileWrap: Variants = reduce
        ? {}
        : {
            run: {
                scaleY: [1, 1, 0.6],
                transition: {
                    times: [0, 0.83, 1], // 6.6s付近から縮退
                    duration: T(1),
                    ease: "easeInOut",
                    repeat: Infinity,
                },
            },
        };
    const wiggle: Variants = reduce
        ? {}
        : {
            run: (i: number) => ({
                y: [0, jitter(i, 1.2), 0],
                rotateZ: [0, jitter(i, 0.8), 0],
                transition: { duration: T(0.5), repeat: Infinity, ease: "easeInOut" },
            }),
        };
    function jitter(i: number, amp = 1) {
        const x = Math.sin(i * 97.13 + 13.7) * 1000;
        const f = x - Math.floor(x);
        return (f * 2 - 1) * amp;
    }

    // 書類がレールに乗って右へ（2.5→6.6s）
    const flyers = useMemo(
        () => Array.from({ length: 6 }).map((_, i) => ({ id: i })),
        []
    );
    const flyer: Variants = reduce
        ? {}
        : {
            run: (i: number) => ({
                x: ["20%", "58%", "85%"], // 机の中央→歯車→成果へ
                y: [-6, 0, 0],
                opacity: [0, 1, 1],
                scale: [0.98, 1, 1],
                transition: {
                    times: [0.31, 0.56, 0.83], // 2.5s, 4.5s, 6.6s
                    duration: T(1),
                    ease: ["easeOut", "easeInOut", "easeInOut"],
                    repeat: Infinity,
                    delay: i * 0.07,
                },
            }),
        };

    // 歯車（2.5〜5.0sで強めに回転、その前後は弱め）
    const gearSpin: Variants = reduce
        ? {}
        : {
            run: {
                rotate: [0, 180, 360],
                transition: {
                    times: [0.25, 0.45, 0.62],
                    duration: T(1),
                    ease: "linear",
                    repeat: Infinity,
                },
            },
        };

    // 完了チェック軌跡（5.0→6.5s）
    const checkPath: Variants = reduce
        ? {}
        : {
            run: {
                pathLength: [0, 1, 1],
                opacity: [0, 1, 1],
                transition: {
                    times: [0.62, 0.8, 1], // 5.0s〜
                    duration: T(1),
                    ease: "easeOut",
                    repeat: Infinity,
                },
            },
        };

    // 成果物（右側）のフェードイン
    const outParent: Variants = reduce
        ? {}
        : {
            run: {
                transition: {
                    delayChildren: T(0.62),
                    staggerChildren: 0.06,
                    repeat: Infinity,
                },
            },
        };
    const outItem: Variants = reduce
        ? {}
        : {
            run: {
                opacity: [0, 1, 1],
                y: [8, 0, 0],
                transition: { duration: T(0.25), ease: "easeOut" },
            },
        };

    return (
        <MotionConfig reducedMotion={reduce ? "always" : "never"}>
            <section
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={() => {
                    mx.set(0);
                    my.set(0);
                }}
                className={`relative w-full md:w-[32rem] h-[26rem] p-5 rounded-2xl overflow-hidden ring-1 ring-black/5 ${className}`}
                aria-label="机上の書類がAIで処理され、整然とした成果に変わるアニメーション"
                style={{
                    background: `radial-gradient(70rem 40rem at 50% 0%, ${shade(
                        PAL.bg,
                        -6
                    )}, ${PAL.bg}), ${PAL.bg}`,
                }}
            >
                {/* 質感ノイズ + 視差 */}
                <motion.div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        x: px,
                        y: py,
                        rotateX: (tiltX as any) ?? 0,
                        rotateY: (tiltY as any) ?? 0,
                        backgroundImage:
                            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22rgba(0,0,0,0.03)%22/></svg>')",
                        backgroundSize: "40px 40px",
                        opacity: 0.7,
                    }}
                />

                {/* 机（前景） */}
                <div
                    className="absolute left-0 right-0 bottom-0 h-28 rounded-b-2xl"
                    style={{
                        background: PAL.desk,
                        boxShadow: "inset 0 8px 16px rgba(0,0,0,0.05)",
                    }}
                />

                {/* 左：山積み（机の上） */}
                <motion.div
                    variants={pileWrap}
                    animate={reduce ? undefined : "run"}
                    className="absolute left-6 bottom-20 origin-bottom"
                >
                    {piles.map((pile, pi) => (
                        <div key={pi} className="absolute" style={{ left: pi * 80 }}>
                            {pile.map((s, i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        transform: `translate(${s.x}px, ${-s.y}px) rotate(${s.r}deg)`,
                                        zIndex: s.z,
                                    }}
                                >
                                    <motion.div
                                        custom={i + pi * 10}
                                        variants={wiggle}
                                        animate={reduce ? undefined : "run"}
                                        className="w-16 h-12 rounded-sm grid place-items-center"
                                        style={{
                                            background: PAL.sheet,
                                            border: `2px solid ${PAL.stroke}`,
                                            boxShadow: "0 2px 0 rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        {/* 書類の線 */}
                                        <div
                                            className="w-10 h-[2px] mb-0.5"
                                            style={{ background: PAL.stroke, opacity: 0.7 }}
                                        />
                                        <div
                                            className="w-8 h-[2px]"
                                            style={{ background: PAL.stroke, opacity: 0.5 }}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>

                {/* 中央：処理レール + スキャンライン + 歯車 */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
                    {/* レール */}
                    <div
                        className="mx-8 h-10 rounded-full"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${withAlpha(
                                PAL.accent,
                                0.18
                            )}, transparent)`,
                        }}
                    />
                    {/* スキャンライン */}
                    <motion.div
                        variants={scan}
                        animate={reduce ? undefined : "run"}
                        className="absolute top-1/2 -translate-y-1/2 w-48 h-12 rounded-full"
                        style={{
                            background: `radial-gradient(closest-side, ${withAlpha(
                                PAL.accent,
                                0.45
                            )}, ${withAlpha(PAL.accent, 0.05)} 70%, transparent 80%)`,
                            filter: "blur(4px)",
                        }}
                    />

                    {/* 歯車（線画風） */}
                    <motion.svg
                        variants={gearSpin}
                        animate={reduce ? undefined : "run"}
                        viewBox="0 0 100 100"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]"
                        width={90}
                        height={90}
                        style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.07))" }}
                    >
                        <g
                            fill={PAL.sheet}
                            stroke={PAL.stroke}
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="50" cy="50" r="16" />
                            {Array.from({ length: 8 }).map((_, i) => {
                                const a = (i * Math.PI) / 4;
                                const x1 = 50 + Math.cos(a) * 24;
                                const y1 = 50 + Math.sin(a) * 24;
                                const x2 = 50 + Math.cos(a) * 36;
                                const y2 = 50 + Math.sin(a) * 36;
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                            })}
                        </g>
                    </motion.svg>

                    {/* レールを流れる用の小さなフライヤー（紙） */}
                    {!reduce &&
                        flyers.map((f, i) => (
                            <motion.div
                                key={f.id}
                                custom={i}
                                variants={flyer}
                                animate="run"
                                className="absolute top-1/2 -translate-y-1/2 w-14 h-10 rounded-sm grid place-items-center"
                                style={{
                                    background: PAL.sheet,
                                    border: `2px solid ${PAL.stroke}`,
                                    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div
                                    className="w-8 h-[2px] mb-0.5"
                                    style={{ background: PAL.stroke, opacity: 0.7 }}
                                />
                                <div
                                    className="w-6 h-[2px]"
                                    style={{ background: PAL.stroke, opacity: 0.5 }}
                                />
                            </motion.div>
                        ))}
                </div>

                {/* 右：成果（書類 + フォルダ + モニター） */}
                <motion.div
                    variants={outParent}
                    animate={reduce ? undefined : "run"}
                    className="absolute right-6 bottom-16 w-[13rem]"
                >
                    <motion.div variants={outItem} className="flex items-end gap-3">
                        {/* 書類 */}
                        <SVGDoc pal={PAL} />
                        {/* フォルダ */}
                        <SVGFolder pal={PAL} />
                        {/* モニター */}
                        <SVGMonitor pal={PAL} />
                    </motion.div>

                    {/* チェックの軌跡 */}
                    {!reduce && (
                        <motion.svg
                            viewBox="0 0 200 100"
                            width={200}
                            height={100}
                            className="absolute -top-10 -left-6"
                        >
                            <motion.path
                                variants={checkPath}
                                animate="run"
                                d="M10,80 C80,10 120,20 160,30"
                                fill="none"
                                stroke={PAL.accent}
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeDasharray="4 8"
                            />
                            <motion.circle
                                variants={checkPath}
                                animate="run"
                                cx="164"
                                cy="26"
                                r="16"
                                fill={PAL.sheet}
                                stroke={PAL.stroke}
                                strokeWidth={3}
                            />
                            <motion.path
                                variants={checkPath}
                                animate="run"
                                d="M156 26 l6 6 12 -12"
                                fill="none"
                                stroke={PAL.stroke}
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    )}
                </motion.div>

                {/* タイトル */}
                <div className="absolute left-5 right-5 bottom-3 text-center z-20">
                    <h3
                        className="text-[15px] md:text-lg font-semibold tracking-wide"
                        style={{ color: PAL.stroke }}
                    >
                        {headline}
                    </h3>
                    <p
                        className="text-xs md:text-sm mt-1"
                        style={{ color: withAlpha(PAL.stroke, 0.75) }}
                    >
                        {subline}
                    </p>
                </div>
            </section>
        </MotionConfig>
    );
}

/* ======= 小物SVG（線画＆セピア塗り） ======= */
function SVGDoc({ pal }: { pal: any }) {
    return (
        <svg viewBox="0 0 60 72" width={46} height={56}>
            <g
                fill={pal.sheet}
                stroke={pal.stroke}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 3h30l18 18v48H6z" />
                <path d="M36 3v18h18" fill="none" />
                <path d="M14 42h28M14 52h20" />
            </g>
        </svg>
    );
}

function SVGFolder({ pal }: { pal: any }) {
    return (
        <svg viewBox="0 0 90 60" width={66} height={48}>
            <g
                fill={pal.folder}
                stroke={pal.stroke}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 20h28l6 8h50v29H3z" />
                <path d="M3 20V9h25l6 8h53" fill={withAlpha(pal.folder, 0.6)} />
            </g>
        </svg>
    );
}

function SVGMonitor({ pal }: { pal: any }) {
    return (
        <svg viewBox="0 0 120 80" width={84} height={56}>
            <g
                fill={pal.monitor}
                stroke={pal.stroke}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="6" width="114" height="66" rx="6" />
                <rect x="48" y="72" width="24" height="6" />
                {/* 簡易チャート */}
                <path
                    d="M18 58 L18 40 L30 40 L30 58 M42 58 L42 32 L54 32 L54 58 M66 58 L66 26 L78 26 L78 58"
                    fill={withAlpha(pal.accent, 0.35)}
                    stroke="none"
                />
                <circle cx="96" cy="30" r="10" fill={withAlpha(pal.accent, 0.35)} />
            </g>
        </svg>
    );
}

/* ======= 色ユーティリティ ======= */
function withAlpha(hex: string, alpha: number) {
    // hex -> rgba()
    const c = hex.replace("#", "");
    const bigint = parseInt(c, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function shade(hex: string, percent: number) {
    // 明度調整（マイナスで暗く）
    const c = hex.replace("#", "");
    const bigint = parseInt(c, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    r = clamp(Math.round((r * (100 + percent)) / 100), 0, 255);
    g = clamp(Math.round((g * (100 + percent)) / 100), 0, 255);
    b = clamp(Math.round((b * (100 + percent)) / 100), 0, 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function toHex(n: number) {
    return (n | (1 << 8)).toString(16).slice(1);
}
function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}


