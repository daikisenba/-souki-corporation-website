// app/components/FlowEfficiencyPanel.tsx
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, Variants, MotionConfig } from "framer-motion";
import { FileText, CheckCircle2, BarChart3, Rocket } from "lucide-react";
import { useRef } from "react";

type Props = {
    cycleMs?: number;        // 1サイクルの長さ（ms）…既定 8000ms
    phrase?: string;         // 見出し用キーフレーズ
    sub?: string;            // サブコピー（任意）
    className?: string;
};

export default function FlowEfficiencyPanel({
    cycleMs = 8000,
    // ❗ダブルクォーテーション内に " を直書きしない
    phrase = "AIで「溜まった仕事」が流れに変わる",
    sub = "混乱を整理し、業務スピードを加速。",
    className = "",
}: Props) {
    const reduce = useReducedMotion();

    // --- 2.5D視差（マウス追従） ---
    const containerRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
    const px = useTransform(sx, v => v * 10);
    const py = useTransform(sy, v => v * 10);
    const tiltX = useTransform(sy, v => v * -3);
    const tiltY = useTransform(sx, v => v * 3);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const r = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;  // 0..1
        const y = (e.clientY - r.top) / r.height;  // 0..1
        mx.set((x - 0.5) * 2);  // -1..1
        my.set((y - 0.5) * 2);
    };

    const T = (n: number) => (n * cycleMs) / 1000; // helper

    // 左レーン（書類カードが右へ流れてコアに吸収）
    const laneIn: Variants = reduce ? {} : {
        run: {
            x: ["0%", "36%", "45%"],
            opacity: [1, 1, 0],
            transition: { duration: T(1), ease: "easeInOut", repeat: Infinity }
        }
    };

    // 中央コア（軽い脈動＋吸引の雰囲気）
    const core: Variants = reduce ? {} : {
        run: {
            scale: [1, 1.05, 1],
            boxShadow: [
                "0 12px 40px rgba(59,130,246,0.35)",
                "0 20px 70px rgba(59,130,246,0.55)",
                "0 12px 40px rgba(59,130,246,0.35)"
            ],
            transition: { duration: T(1), ease: "easeInOut", repeat: Infinity }
        }
    };
    const ring: Variants = reduce ? {} : {
        run: { opacity: [0.18, 0.35, 0.18], scale: [0.98, 1.04, 0.98], transition: { duration: T(1), repeat: Infinity, ease: "easeInOut" } }
    };

    // 右レーン（成果物：カードが"加速して並ぶ"）
    const laneOutParent: Variants = reduce ? {} : {
        run: {
            transition: { staggerChildren: 0.08, delayChildren: T(0.55), repeat: Infinity }
        }
    };
    const laneOutItem: Variants = reduce ? {} : {
        run: {
            x: ["55%", "78%", "88%"],
            opacity: [0, 1, 1],
            scale: [0.96, 1, 1],
            transition: { duration: T(0.45), ease: "easeOut" }
        }
    };

    // プログレスバー（"AI後は速い"を視覚化）
    const progressBar: Variants = reduce ? {} : {
        run: {
            width: ["15%", "28%", "95%"], // 前半は遅め→コア通過後に一気に加速
            transition: {
                times: [0, 0.55, 1],
                duration: T(1),
                ease: ["easeInOut", "easeOut", "easeOut"],
                repeat: Infinity
            }
        }
    };

    return (
        <MotionConfig reducedMotion={reduce ? "always" : "never"}>
            <section
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mx.set(0); my.set(0); }}
                className={`relative w-full md:w-[32rem] h-[26rem] p-4 rounded-2xl overflow-hidden
                    bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 ring-1 ring-white/10
                    transform-gpu will-change-transform ${className}`}
                aria-label="AIで業務が流れ、効率とスピードが上がるアニメーション"
            >
                {/* 背景のゆるい流れ（2.5D視差レイヤ） */}
                <motion.div
                    aria-hidden
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    animate={reduce ? {} : { backgroundPositionX: ["0%", "100%"] }}
                    transition={{ duration: T(1.3), repeat: Infinity, ease: "linear" }}
                    // ❗style を1つに統合（視差＋背景）
                    style={{
                        x: px,
                        y: py,
                        rotateX: tiltX as any,
                        rotateY: tiltY as any,
                        backgroundImage:
                            "radial-gradient(50rem 18rem at 15% 30%, rgba(37,99,235,0.18), transparent 50%)," +
                            "radial-gradient(44rem 16rem at 85% 70%, rgba(56,189,248,0.12), transparent 50%)",
                        backgroundSize: "200% 100%, 200% 100%"
                    }}
                />

                {/* グリッド（左：仕事の山 → 中央：AI → 右：成果） */}
                <div className="relative grid grid-cols-[1fr_12rem_1fr] items-center h-full">
                    {/* 左：仕事の山（3本レーン） */}
                    <div className="relative h-full">
                        {[0, 1, 2].map((row) => (
                            <motion.div
                                key={`in-${row}`}
                                variants={laneIn}
                                animate={reduce ? undefined : "run"}
                                className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
                                style={{ y: (row - 1) * 46 }}
                            >
                                <div className="flex gap-3">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={`doc-${row}-${i}`}
                                            className="w-12 h-14 rounded-md bg-white/90 text-slate-700 shadow-md border border-white/50 grid place-items-center"
                                        >
                                            <FileText className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                        <p className="absolute bottom-2 left-2 text-[11px] text-white/65">溜まった書類・タスク</p>
                    </div>

                    {/* 中央：AIコア */}
                    <div className="relative h-full grid place-items-center">
                        {/* 光輪 */}
                        <motion.div
                            variants={ring}
                            animate={reduce ? undefined : "run"}
                            className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 60%)",
                                filter: "blur(6px)"
                            }}
                        />
                        {/* コア本体 */}
                        <motion.div
                            variants={core}
                            animate={reduce ? undefined : "run"}
                            className="relative z-10 grid place-items-center w-24 h-24 md:w-32 md:h-32
                         rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
                         ring-1 ring-white/20 shadow-lg"
                            role="img"
                            aria-label="AIコア"
                        >
                            <Rocket className="w-8 h-8 md:w-9 md:h-9 text-white drop-shadow" />
                        </motion.div>
                        <p className="mt-2 text-center text-xs md:text-sm text-white/80 font-medium">AIが整理・最適化</p>
                    </div>

                    {/* 右：成果（整列×加速レーン＋進捗バー） */}
                    <div className="relative h-full">
                        <motion.div
                            variants={laneOutParent}
                            animate={reduce ? undefined : "run"}
                            className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
                        >
                            {[0, 1].map((row) => (
                                <motion.div
                                    key={`out-${row}`}
                                    variants={laneOutItem}
                                    className="flex gap-3 items-center mb-4"
                                    style={{ y: (row ? 18 : -18) }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/95 border border-white/60 shadow grid place-items-center">
                                        {row === 0 ? <BarChart3 className="w-6 h-6 text-blue-600" /> : <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                                            <motion.div
                                                variants={progressBar}
                                                className="h-full rounded-full bg-blue-500"
                                                animate={reduce ? undefined : "run"}
                                            />
                                        </div>
                                        <div className="mt-1 text-[11px] text-white/70">
                                            {row === 0 ? "可視化・レポート" : "自動化でタスク完了"}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        <p className="absolute bottom-2 right-2 text-[11px] text-white/65">整った成果・スピードUP</p>
                    </div>
                </div>

                {/* キーフレーズ（1〜2行） */}
                <div className="absolute left-4 right-4 bottom-4 md:bottom-5 text-center">
                    <h3 className="text-white text-base md:text-lg font-semibold tracking-wide">{phrase}</h3>
                    {sub && <p className="text-white/70 text-xs md:text-sm mt-1">{sub}</p>}
                </div>

                {/* 装飾の微粒子（軽量） */}
                {!reduce && (
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        animate={{ opacity: [0.12, 0.22, 0.12] }}
                        transition={{ duration: T(1), repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 35%)," +
                                "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 35%)"
                        }}
                    />
                )}
            </section>
        </MotionConfig>
    );
}
