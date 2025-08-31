// app/components/DeskEfficiencyPanel.tsx
import { useMemo, useRef } from "react";
import { MotionConfig, motion, useMotionValue, useSpring, useTransform, useReducedMotion, Variants } from "framer-motion";
import { FileText, CheckCircle2, Cog } from "lucide-react";

type Props = {
    cycleMs?: number;    // 1サイクル長：既定 8000ms
    className?: string;
    headline?: string;
    subline?: string;
};

export default function DeskEfficiencyPanel({
    cycleMs = 8000,
    className = "",
    headline = "AIで「机の上」が片づき、作業がサクサク進む",
    subline = "混乱を整理し、業務スピードを加速。"
}: Props) {
    const reduce = useReducedMotion();

    // ---- 2.5D 視差 ----
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
    const px = useTransform(sx, v => v * 10);
    const py = useTransform(sy, v => v * 10);
    const tiltX = useTransform(sy, v => v * -3);
    const tiltY = useTransform(sx, v => v * 3);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        mx.set((x - 0.5) * 2);
        my.set((y - 0.5) * 2);
    };

    const T = (n: number) => (n * cycleMs) / 1000; // helper: 秒

    // ---- 山積みの書類：ラッパー(静的transform) + 内側(motionで微振動) で競合回避 ----
    const piles = useMemo(() => {
        const seed = 11;
        const rnd = (i: number) => {
            const x = Math.sin(i * 9301 + seed * 49297) * 233280;
            return x - Math.floor(x);
        };
        const pileCount = 4;
        const result: { x: number; y: number; rot: number }[][] = [];
        for (let p = 0; p < pileCount; p++) {
            const sheets = 7 + Math.floor(rnd(p) * 3); // 7..9（量感UP）
            const pile: { x: number; y: number; rot: number }[] = [];
            for (let i = 0; i < sheets; i++) {
                pile.push({
                    x: (p * 56) + (rnd(p * 10 + i) * 12 - 6),
                    y: i * 12 + (rnd(p * 20 + i) * 3 - 1.5),
                    rot: rnd(p * 30 + i) * 8 - 4
                });
            }
            result.push(pile);
        }
        return result;
    }, []);

    // スキャンライン（1.2s〜2.0s相当）
    const scanLine: Variants = reduce ? {} : {
        run: {
            x: ["-20%", "110%"],
            opacity: [0, 1, 0],
            transition: { times: [0.15, 0.25, 0.26], duration: T(1), ease: "linear", repeat: Infinity }
        }
    };

    // 山の縮退（机の余白が増える）
    const pileWrap: Variants = reduce ? {} : {
        run: {
            scaleY: [1, 1, 0.65],
            transition: { times: [0, 0.825, 1], duration: T(1), ease: "easeInOut", repeat: Infinity }
        }
    };
    const sheetWiggle: Variants = reduce ? {} : {
        run: (i: number) => ({
            y: [0, jitter(i, 1.2), 0],
            rotateZ: [0, jitter(i, 0.8), 0],
            transition: { duration: T(0.5), repeat: Infinity, ease: "easeInOut" }
        })
    };
    function jitter(i: number, amp = 1) {
        const x = Math.sin(i * 97.13 + 13.7) * 1000;
        const f = x - Math.floor(x);
        return (f * 2 - 1) * amp;
    }

    // レール滑走（フライヤー）：開始位置を"左寄り"に、レール高さも上げる
    const flyers = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({ id: i })), []);
    const flyer: Variants = reduce ? {} : {
        run: (i: number) => ({
            x: ["8%", "50%", "86%"],               // スタートをさらに左へ
            y: [-4, 0, 0],                         // ほんのり持ち上がってから合流
            opacity: [0, 1, 1],
            scale: [0.98, 1, 1],
            boxShadow: [
                "0 0 0 rgba(59,130,246,0)",
                "0 10px 20px rgba(59,130,246,0.25)",
                "0 6px 12px rgba(59,130,246,0.18)"
            ],
            transition: {
                times: [0.25, 0.55, 0.825],          // 2.0s, 4.4s, 6.6s
                duration: T(1),
                ease: ["easeOut", "easeInOut", "easeInOut"],
                repeat: Infinity,
                delay: i * 0.06
            }
        })
    };

    // 対応中：前半遅く→後半一気に伸びるプログレス
    const progress: Variants = reduce ? {} : {
        run: {
            width: ["14%", "30%", "95%"],
            transition: { times: [0.25, 0.55, 0.825], duration: T(1), ease: ["easeInOut", "easeOut", "easeOut"], repeat: Infinity }
        }
    };

    // 完了：チェック連鎖点灯
    const doneParent: Variants = reduce ? {} : {
        run: { transition: { delayChildren: T(0.58), staggerChildren: 0.08, repeat: Infinity } }
    };
    const doneItem: Variants = reduce ? {} : {
        run: { opacity: [0.3, 1, 1], scale: [0.95, 1, 1], transition: { duration: T(0.25), ease: "easeOut" } }
    };

    return (
        <MotionConfig reducedMotion={reduce ? "always" : "never"}>
            <section
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={() => { mx.set(0); my.set(0); }}
                className={`relative w-full md:w-[32rem] h-[26rem] p-5 rounded-2xl overflow-hidden
                    bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 ring-1 ring-white/10
                    transform-gpu will-change-transform ${className}`}
                aria-label="AIで机上の書類が自動仕分けされ、業務が加速するアニメーション"
            >
                {/* 背景質感＋視差 */}
                <motion.div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-45"
                    animate={reduce ? {} : { backgroundPositionX: ["0%", "100%"] }}
                    transition={{ duration: T(1.3), repeat: Infinity, ease: "linear" }}
                    style={{
                        x: px, y: py, rotateX: tiltX as any, rotateY: tiltY as any,
                        backgroundImage:
                            "radial-gradient(60rem 20rem at 20% 30%, rgba(37,99,235,0.16), transparent 55%)," +
                            "radial-gradient(40rem 16rem at 80% 70%, rgba(56,189,248,0.10), transparent 55%)," +
                            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22rgba(255,255,255,0.04)%22/></svg>')",
                        backgroundSize: "200% 100%, 200% 100%, 40px 40px"
                    }}
                />

                {/* 3カラム（左：山／中央：レール／右：トレイ） */}
                <div className="relative grid grid-cols-[1fr_12rem_1fr] items-center h-full pb-10">
                    {/* 左：山積みの書類 */}
                    <div className="relative h-full">
                        <motion.div variants={pileWrap} animate={reduce ? undefined : "run"} className="absolute left-6 bottom-14 origin-bottom">
                            {piles.map((pile, pIndex) => (
                                <div key={`pile-${pIndex}`} className="absolute" style={{ left: pIndex * 58 }}>
                                    {pile.map((s, i) => (
                                        // 外側：静的レイアウト（transform固定）
                                        <div
                                            key={`pile-${pIndex}-${i}`}
                                            className="absolute"
                                            style={{ transform: `translate(${s.x}px, ${-s.y}px) rotate(${s.rot}deg)`, zIndex: i }}
                                        >
                                            {/* 内側：Framerの微振動のみ（transform競合しない） */}
                                            <motion.div
                                                custom={i + pIndex * 10}
                                                variants={sheetWiggle}
                                                animate={reduce ? undefined : "run"}
                                                className="w-12 h-14 rounded-[6px] bg-white/95 border border-white/70 shadow grid place-items-center"
                                            >
                                                <FileText className="w-5 h-5 text-slate-700" />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>

                        {/* 散在した単票（少量） */}
                        {!reduce && (
                            <div className="absolute left-4 top-8 opacity-80">
                                <div className="w-10 h-12 rotate-6 translate-x-1 translate-y-0.5 rounded bg-white/90 border border-white/60 shadow grid place-items-center">
                                    <FileText className="w-4 h-4 text-slate-700" />
                                </div>
                            </div>
                        )}
                        <p className="absolute bottom-2 left-3 text-[11px] text-white/65">山積みの書類</p>
                    </div>

                    {/* 中央：スキャンライン + 流れレール */}
                    <div className="relative h-full grid place-items-center">
                        {/* レール（高さを少し上へ） */}
                        <div className="absolute left-[-30%] right-[-30%] top-[45%] -translate-y-1/2 h-10 rounded-full bg-gradient-to-r from-transparent via-white/8 to-transparent z-0" />
                        {/* スキャンライン */}
                        <motion.div
                            variants={scanLine}
                            animate={reduce ? undefined : "run"}
                            className="absolute top-[45%] -translate-y-1/2 w-44 h-12 rounded-full z-0"
                            style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.45), rgba(59,130,246,0.05) 70%, transparent 80%)", filter: "blur(4px)" }}
                        />
                        {/* レール上のフライヤー（zを下げてテキストを邪魔しない） */}
                        {!reduce && flyers.map((f, i) => (
                            <motion.div
                                key={f.id}
                                custom={i}
                                variants={flyer}
                                animate="run"
                                className="absolute top-[45%] -translate-y-1/2 w-12 h-14 rounded-[6px] bg-white border border-white/70 shadow grid place-items-center z-10"
                            >
                                <FileText className="w-5 h-5 text-slate-700" />
                            </motion.div>
                        ))}
                    </div>

                    {/* 右：トレイ（対応中／完了） */}
                    <div className="relative h-full pr-4">
                        {/* 対応中 */}
                        <div className="absolute right-0 top-[28%] -translate-y-1/2 w-44 rounded-xl bg-white/10 border border-white/15 p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-white/85 text-[13px] font-medium">
                                <Cog className="w-3.5 h-3.5" />
                                対応中
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-white/15 overflow-hidden">
                                <motion.div variants={progress} animate={reduce ? undefined : "run"} className="h-full rounded-full bg-blue-500" />
                            </div>
                        </div>

                        {/* 完了 */}
                        <motion.div variants={doneParent} animate={reduce ? undefined : "run"} className="absolute right-0 bottom-[18%] w-44 rounded-xl bg-white/10 border border-white/15 p-3 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-white/85 text-[13px] font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                完了
                            </div>
                            <div className="mt-2 grid grid-cols-4 gap-1.5">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div key={i} variants={doneItem} className="w-6 h-6 rounded-md bg-white/90 border border-white/70 grid place-items-center">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <p className="absolute bottom-2 right-2 text-[11px] text-white/65">対応中・完了トレイ</p>
                    </div>
                </div>

                {/* テキスト（最前面） */}
                <div className="absolute left-5 right-5 bottom-4 text-center z-20">
                    <h3 className="text-white text-base md:text-lg font-semibold tracking-wide">{headline}</h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1">{subline}</p>
                </div>
            </section>
        </MotionConfig>
    );
}
