"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type Props = { width?: number; className?: string };

export default function DeskEfficiencyAnimationSlides15s({ width = 440, className }: Props) {
    const controls = useAnimationControls();
    const prefersReduced = useReducedMotion();

    // Palette
    const beige = "#F3E8D8";
    const beigeDark = "#E8D8C3";
    const ink = "#503A2C";
    const ui = "#CDBBA5";
    const brandBlue = "#4C82F6";
    const successGreen = "#22C55E";

    const h = Math.round(width * 0.64);

    // 時間配分（合計15s）
    const T = {
        s1_build: 2.6, // 0.0-2.6   山が積み上がる
        s1_hold: 1.6,  // 2.6-4.2   沈み＆間
        s1_out: 0.8,   // 4.2-5.0   スライド切替
        s2_in: 0.6,    // 5.0-5.6   PC登場
        s2_flow: 2.9,  // 5.6-8.5   吸い込み
        s2_bars: 1.3,  // 8.5-9.8   棒3本
        s2_out: 0.7,   // 9.8-10.5  クロスディゾルブ
        s3_in: 0.7,    // 10.5-11.2 カード登場
        s3_focus: 1.8, // 11.2-13.0 バー成長＋KPI
        check: 1.0,    // 13.2-14.2 ✅
        end: 0.8,      // 14.2-15.0 静止
    };

    // Easing
    const easeOut = [0.16, 1, 0.3, 1];
    const easeInOut = [0.2, 0.8, 0.2, 1];
    const bounce = [0.34, 1.56, 0.64, 1];

    // ===== 共通：背景とデスク =====
    const Background = () => (
        <>
            <rect width="700" height="450" rx="24" fill="url(#bg)" />
            <rect x="30" y="330" width="640" height="20" rx="4" fill={ui} opacity="0.6" />
        </>
    );

    // ===== シーン1：山積み =====
    const s1Wrap = {
        initial: { opacity: 0, x: 0 },
        s1_build: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        s1_hold: {},
        s1_out: { x: -60, opacity: 0, transition: { duration: T.s1_out, ease: easeInOut } },
        hidden: { opacity: 0, pointerEvents: "none" as any },
    };

    const s1Paper = {
        initial: (i: number) => ({
            x: -10 + (i % 5) * 16,
            y: -i * 10,
            rotate: -12 + (i % 6) * 4,
            opacity: 0,
        }),
        s1_build: (i: number) => ({
            opacity: 1,
            y: -i * 10,
            transition: { duration: T.s1_build, ease: easeOut, delay: 0.05 * i },
        }),
        s1_hold: { y: "+=2", transition: { duration: T.s1_hold, ease: easeInOut } }, // 重みでわずかに沈む
    };

    // ===== シーン2：処理（PC＋吸い込み＋小グラフ） =====
    const s2Wrap = {
        initial: { opacity: 0, x: 40, scale: 0.98 },
        s2_in: { opacity: 1, x: 0, scale: 1, transition: { duration: T.s2_in, ease: easeOut } },
        s2_flow: {},
        s2_bars: {},
        s2_out: { opacity: 0, scale: 1.02, transition: { duration: T.s2_out, ease: easeInOut } },
        hidden: { opacity: 0, pointerEvents: "none" as any },
    };

    const s2Paper = {
        initial: (i: number) => ({
            x: -170 + (i % 4) * 12,
            y: 90 - Math.floor(i / 4) * 14,
            rotate: -10 + (i % 5) * 5,
            opacity: 0,
        }),
        s2_flow: (i: number) => ({
            opacity: 1,
            x: 180 + (i % 3) * 6,
            y: [-20, -10, -14],
            rotate: [-3, 4, 0],
            scale: [0.96, 1.03, 1],
            transition: { duration: T.s2_flow, times: [0, 0.7, 1], ease: "easeInOut", delay: 0.03 * i },
        }),
    };

    const ripple = {
        initial: { scale: 0, opacity: 0 },
        s2_flow: { scale: [0, 1.4, 1.8], opacity: [0.25, 0.5, 0], transition: { duration: 1.2, ease: easeOut, delay: 0.6 } },
    };

    const smallBar = {
        initial: { scaleY: 0, transformOrigin: "bottom", opacity: 0.95 },
        s2_bars: (d: number) => ({ scaleY: [0, 1.05, 1], opacity: 1, transition: { duration: T.s2_bars * 0.7, ease: easeOut, delay: d } }),
    };

    const labelFloat = {
        initial: { opacity: 0, y: 6 },
        s2_bars: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut, delay: d } }),
    };

    // ===== シーン3：完成（大きなカード） =====
    const s3Wrap = {
        initial: { opacity: 0, x: 40, scale: 0.98 },
        s3_in: { opacity: 1, x: 0, scale: 1, transition: { duration: T.s3_in, ease: easeOut } },
        s3_focus: {},
        hidden: { opacity: 0, pointerEvents: "none" as any },
    };

    const bigBar = {
        initial: { scaleY: 0, transformOrigin: "bottom", opacity: 0.95 },
        s3_focus: (d: number) => ({ scaleY: [0, 1.06, 1], opacity: 1, transition: { duration: T.s3_focus * 0.6, ease: easeOut, delay: d } }),
    };

    const kpiBadge = {
        initial: { scale: 0.9, opacity: 0 },
        s3_focus: { scale: [0.9, 1.06, 1], opacity: 1, transition: { duration: 0.9, ease: easeOut, delay: 0.4 } },
    };

    const checkMark = {
        initial: { scale: 0, opacity: 0 },
        check: { scale: [0, 1.15, 1], opacity: 1, transition: { duration: T.check, ease: bounce } },
    };

    // ===== 再生シーケンス（1回のみ） =====
    useEffect(() => {
        (async () => {
            if (prefersReduced) {
                await controls.start("s1_build"); await controls.start("s1_out");
                await controls.start("s2_in"); await controls.start("s2_bars"); await controls.start("s2_out");
                await controls.start("s3_in"); await controls.start("s3_focus"); await controls.start("check");
                return;
            }
            await controls.start("s1_build"); // 0–2.6
            await controls.start("s1_hold");  // 2.6–4.2
            await controls.start("s1_out");   // 4.2–5.0

            await controls.start("s2_in");    // 5.0–5.6
            await controls.start("s2_flow");  // 5.6–8.5
            await controls.start("s2_bars");  // 8.5–9.8
            await controls.start("s2_out");   // 9.8–10.5

            await controls.start("s3_in");    // 10.5–11.2
            await controls.start("s3_focus"); // 11.2–13.0
            await controls.start("check");    // 13.2–14.2
            await controls.start("end");      // 14.2–15.0
        })();
    }, [controls, prefersReduced]);

    return (
        <svg viewBox="0 0 700 450" width={width} height={h} className={className} style={{ display: "block" }}>
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={beige} /><stop offset="100%" stopColor={beigeDark} />
                </linearGradient>
                <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.06" /><stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
                </filter>
            </defs>

            {/* ===== Scene 1 : 山積み ===== */}
            <motion.g variants={s1Wrap} initial="initial" animate={controls}>
                <Background />
                {/* 机の広い影で"量感"を強調 */}
                <rect x="50" y="320" width="300" height="14" rx="7" fill="#000" opacity="0.07" />
                {/* 高・中・低の3束を重ねる */}
                <g transform="translate(120,310)">
                    {[...Array(12)].map((_, i) => (
                        <motion.g key={i} custom={i} variants={s1Paper} initial="initial" animate={controls}>
                            <rect x={-40 + (i % 3) * 4} y={-i * 10} width="140" height="80" rx="7" fill="#F7F0E6" stroke={ink} strokeWidth="2" />
                            <line x1="-24" y1={-i * 10 - 18} x2="70" y2={-i * 10 - 18} stroke={ink} strokeWidth="2" opacity="0.28" />
                        </motion.g>
                    ))}
                    {/* 周囲に散らばる紙片 */}
                    <motion.rect variants={s1Paper} custom={13} initial="initial" animate={controls}
                        x="-90" y="-6" width="60" height="36" rx="6" fill="#F7F0E6" stroke={ink} strokeWidth="2" />
                    <motion.rect variants={s1Paper} custom={14} initial="initial" animate={controls}
                        x="130" y="-20" width="70" height="40" rx="6" fill="#F7F0E6" stroke={ink} strokeWidth="2" />
                </g>
                {/* 見出し（任意） */}
                <text x="120" y="120" fontSize="18" fill="#6B7280">紙が山積み / 混乱</text>
            </motion.g>

            {/* ===== Scene 2 : 処理中 ===== */}
            <motion.g variants={s2Wrap} initial="initial" animate={controls}>
                <Background />
                {/* 中央PC（デスクトップ＋キーボード） */}
                <g transform="translate(330,180)">
                    <rect x="-90" y="0" width="180" height="110" rx="12" fill="#F7F4EF" stroke={ink} strokeWidth="3" />
                    <path d="M-82,8 L-20,-6 L86,96 L24,110 Z" fill="url(#glare)" />
                    <rect x="-80" y="120" width="160" height="20" rx="4" fill="#E5DED1" stroke={ink} strokeWidth="2" />
                    <motion.rect variants={ripple} initial="initial" animate={controls}
                        x="-80" y="120" width="160" height="20" rx="4" fill={brandBlue} opacity="0.25" />
                </g>

                {/* 左側から吸い込まれる紙（6枚） */}
                <g transform="translate(130,260)">
                    {[...Array(6)].map((_, i) => (
                        <motion.g key={i} custom={i} variants={s2Paper} initial="initial" animate={controls}>
                            <rect x={-40} y={-i * 8} width="120" height="70" rx="6" fill="#F7F0E6" stroke={ink} strokeWidth="2" />
                            <line x1="-28" y1={-i * 8 - 18} x2="60" y2={-i * 8 - 18} stroke={ink} strokeWidth="2" opacity="0.28" />
                        </motion.g>
                    ))}
                </g>

                {/* 右側の小さな棒グラフ（PC横で進行を見せる） */}
                <g transform="translate(500,150)">
                    <rect width="180" height="110" rx="12" fill="#FFFFFF" stroke={ink} strokeWidth="3" />
                    <g transform="translate(18,26)">
                        <rect x="14" y="70" width="120" height="2" fill="#E5E7EB" />
                        {[
                            { x: 34, h: 26, d: 0.0 },
                            { x: 66, h: 44, d: 0.22 },
                            { x: 98, h: 66, d: 0.44 },
                        ].map((b, i) => (
                            <motion.rect key={i} variants={smallBar} custom={b.d} initial="initial" animate={controls}
                                x={b.x} y={70 - b.h} width="16" height={b.h} rx="4" fill={brandBlue} />
                        ))}
                        {/* ラベル */}
                        <motion.g variants={labelFloat} custom={0.55} initial="initial" animate={controls} transform="translate(2,-10)">
                            <rect width="90" height="22" rx="11" fill="#EAF1FF" />
                            <text x="10" y="15" fontSize="11" fill="#1F2937">業務効率UP</text>
                        </motion.g>
                        <motion.g variants={labelFloat} custom={0.75} initial="initial" animate={controls} transform="translate(92,-30)">
                            <rect width="96" height="22" rx="11" fill="#E8F6EC" />
                            <text x="10" y="15" fontSize="11" fill="#065F46">売り上げ向上</text>
                        </motion.g>
                    </g>
                </g>
            </motion.g>

            {/* ===== Scene 3 : 完成（大きなカード・視認性重視） ===== */}
            <motion.g variants={s3Wrap} initial="initial" animate={controls}>
                <Background />
                <g transform="translate(485,120)" filter="url(#cardShadow)">
                    <rect width="200" height="150" rx="14" fill="#FFFFFF" stroke={ink} strokeWidth="3" />
                    <g transform="translate(18,38)">
                        <rect x="0" y="0" width="164" height="94" rx="10" fill="#FFFFFF" stroke="#E5E7EB" />
                        <rect x="14" y="80" width="136" height="2" fill="#E5E7EB" />
                        {[{ x: 40, h: 30, d: 0.0 }, { x: 78, h: 58, d: 0.18 }, { x: 116, h: 88, d: 0.36 }].map((b, i) => (
                            <motion.rect key={i} variants={bigBar} custom={b.d} initial="initial" animate={controls}
                                x={b.x} y={80 - b.h} width="20" height={b.h} rx="5" fill={brandBlue} />
                        ))}
                        {/* KPIチップ */}
                        <motion.g variants={kpiBadge} initial="initial" animate={controls} transform="translate(8,-12)">
                            <rect width="70" height="24" rx="6" fill="#E8F6EC" stroke={successGreen} strokeWidth="2" />
                            <text x="10" y="16" fontSize="12" fill={successGreen} fontWeight="bold">+25%</text>
                        </motion.g>
                    </g>
                </g>
                {/* ✅ */}
                <motion.g variants={checkMark} initial="initial" animate={controls} transform="translate(600,100)">
                    <circle r="26" fill="#EAF1FF" stroke={brandBlue} strokeWidth="4" />
                    <path d="M-10 2 L-1 12 L16 -8" fill="none" stroke={brandBlue} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
            </motion.g>
        </svg>
    );
}
