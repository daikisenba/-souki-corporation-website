"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type Props = { width?: number; className?: string };

export default function DeskEfficiencyAnimation15s({ width = 440, className }: Props) {
    const controls = useAnimationControls();
    const prefersReduced = useReducedMotion();

    // palette
    const beige = "#F3E8D8";
    const beigeDark = "#E8D8C3";
    const ink = "#503A2C";
    const ui = "#CDBBA5";
    const brandBlue = "#4C82F6";

    const h = Math.round(width * 0.64);

    // timeline (15s)
    const T = {
        papersIn: 2.4, pcIntro: 1.2, toPC: 4.0, breath: 0.9,
        bars: 2.2, labels: 0.9, check: 1.0, end: 0.8,
    };

    const easeOut = [0.16, 1, 0.3, 1];
    const easeInOut = [0.2, 0.8, 0.2, 1];
    const bounce = [0.34, 1.56, 0.64, 1];

    // 書類
    const paperVariants = {
        initial: (i: number) => ({ x: -20 + (i % 4) * 15, y: -i * 7, opacity: 0, rotate: -10 + (i % 5) * 5 }),
        papersIn: (i: number) => ({ opacity: 1, y: -i * 7, transition: { duration: T.papersIn, ease: easeOut, delay: 0.05 * i } }),
        toPC: (i: number) => ({
            x: 240 + (i % 3) * 6, y: -100 + Math.floor(i / 3) * 4,
            rotate: [-3, 5, 0], scale: [0.96, 1.03, 1], opacity: [1, 1, 0],
            transition: { duration: T.toPC, ease: "easeInOut", times: [0, 0.7, 1], delay: 0.03 * i },
        }),
    };

    // キーボードのリップル
    const rippleVariants = {
        initial: { scale: 0, opacity: 0 },
        toPC: { scale: [0, 1.4, 1.8], opacity: [0.25, 0.5, 0], transition: { duration: 1.2, ease: "easeOut", delay: 0.6 } },
    };

    // 右カード：縦棒グラフ
    const barVariants = {
        initial: { scaleY: 0, transformOrigin: "bottom", opacity: 0.95 },
        bars: (d: number) => ({
            scaleY: [0, 1.06, 1],
            opacity: 1,
            transition: { duration: T.bars * 0.7, ease: easeOut, delay: d },
        }),
    };

    // ラベル（業務効率UP / 売り上げ向上）
    const labelVariants = {
        initial: { opacity: 0, y: 8 },
        labels: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut, delay: d } }),
    };

    const checkVariants = {
        initial: { scale: 0, opacity: 0 },
        check: { scale: [0, 1.15, 1], opacity: 1, transition: { duration: T.check, ease: bounce } },
    };

    // sequence
    useEffect(() => {
        (async () => {
            if (prefersReduced) {
                await controls.start("papersIn");
                await controls.start("bars");
                await controls.start("labels");
                await controls.start("check");
                return;
            }
            await controls.start("papersIn"); // 0–2.4
            await controls.start("pcIntro");  // 2.4–3.6
            await controls.start("toPC");     // 3.6–7.6
            await controls.start("breath");   // 7.6–8.5
            await controls.start("bars");     // 9.0–11.2
            await controls.start("labels");   // 11.2–12.1
            await controls.start("check");    // 13.2–14.2
            await controls.start("end");      // 14.2–15.0
        })();
    }, [controls, prefersReduced]);

    return (
        <svg viewBox="0 0 700 450" width={width} height={h} className={className} style={{ display: "block" }}>
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={beige} />
                    <stop offset="100%" stopColor={beigeDark} />
                </linearGradient>
                <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
                </filter>
            </defs>

            {/* 背景と机 */}
            <rect width="700" height="450" rx="24" fill="url(#bg)" />
            <rect x="30" y="330" width="640" height="20" rx="4" fill={ui} opacity="0.6" />

            {/* 中央PC（デスクトップ＋キーボード） */}
            <g transform="translate(330,180)">
                <rect x="-90" y="0" width="180" height="110" rx="12" fill="#F7F4EF" stroke={ink} strokeWidth="3" />
                <path d="M-82,8 L-20,-6 L86,96 L24,110 Z" fill="url(#glare)" />
                <rect x="-80" y="120" width="160" height="20" rx="4" fill="#E5DED1" stroke={ink} strokeWidth="2" />
                <motion.rect
                    variants={rippleVariants}
                    initial="initial"
                    animate={controls}
                    x="-80" y="120" width="160" height="20" rx="4" fill={brandBlue} opacity="0.25"
                />
            </g>

            {/* 書類の山（→ 中央PCへ） */}
            <g transform="translate(100,322)">
                {[...Array(10)].map((_, i) => (
                    <motion.g key={i} custom={i} variants={paperVariants} initial="initial" animate={controls}>
                        <rect x={-40} y={-i * 6} width="120" height="70" rx="6" fill="#F7F0E6" stroke={ink} strokeWidth="2" />
                        <line x1="-28" y1={-i * 6 - 18} x2="60" y2={-i * 6 - 18} stroke={ink} strokeWidth="2" opacity="0.28" />
                    </motion.g>
                ))}
            </g>

            {/* 右側：浮遊ダッシュボードカード（PC枠なし／大きめ） */}
            <g transform="translate(485,120)" filter="url(#cardShadow)">
                {/* カード本体（従来より大きい 200×150） */}
                <rect width="200" height="150" rx="14" fill="#FFFFFF" stroke={ink} strokeWidth="3" />

                {/* チャート領域（余白を抑えて広く） */}
                <g transform="translate(18,38)">
                    {/* 軸ガイド */}
                    <rect x="0" y="0" width="164" height="94" rx="10" fill="#FFFFFF" stroke="#E5E7EB" />
                    <rect x="14" y="80" width="136" height="2" fill="#E5E7EB" />

                    {/* 縦棒3本（右肩上がり） */}
                    {[
                        { x: 40, h: 28, d: 0.0 },
                        { x: 78, h: 52, d: 0.18 },
                        { x: 116, h: 84, d: 0.36 },
                    ].map((b, i) => (
                        <motion.rect
                            key={i}
                            variants={barVariants}
                            custom={b.d}
                            initial="initial"
                            animate={controls}
                            x={b.x}
                            y={80 - b.h}
                            width="20"
                            height={b.h}
                            rx="5"
                            fill={brandBlue}
                        />
                    ))}

                    {/* ラベル：棒の上に2つ（確実に見切れない座標へ） */}
                    <motion.g variants={labelVariants} custom={0.55} initial="initial" animate={controls} transform="translate(6,-14)">
                        <rect width="92" height="24" rx="12" fill="#FFFFFF" />
                        <text x="10" y="16" fontSize="11" fill="#1E40AF" fontWeight="bold">業務効率UP</text>
                    </motion.g>
                    <motion.g variants={labelVariants} custom={0.7} initial="initial" animate={controls} transform="translate(96,-36)">
                        <rect width="96" height="24" rx="12" fill="#FFFFFF" />
                        <text x="10" y="16" fontSize="11" fill="#1E40AF" fontWeight="bold">業務効率UP</text>
                    </motion.g>
                </g>
            </g>

            {/* ✅ フィナーレ */}
            <motion.g variants={checkVariants} initial="initial" animate={controls} transform="translate(600,100)">
                <circle r="26" fill="#EAF1FF" stroke={brandBlue} strokeWidth="4" />
                <path d="M-10 2 L-1 12 L16 -8" fill="none" stroke={brandBlue} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
        </svg>
    );
}
