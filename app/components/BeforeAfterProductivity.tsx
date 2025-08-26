// BeforeAfterProductivity.tsx
import { useReducedMotion, motion, Variants } from "framer-motion";
import { FileText, BarChart3, PieChart, CheckCircle2, Sparkles } from "lucide-react";

type Props = {
    cycleMs?: number;        // 1サイクルの長さ（ms）
    className?: string;
};

const DOCS = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    // 左側にランダム配置っぽい散らかり
    x: -220 - (i % 3) * 30 - Math.random() * 30,
    y: -70 + (i * 22) + (Math.random() * 16 - 8),
}));

const OUTPUTS = [
    { id: "b", Icon: BarChart3, label: "効率UP" },
    { id: "p", Icon: PieChart, label: "可視化" },
    { id: "c", Icon: CheckCircle2, label: "完了" },
];

export default function BeforeAfterProductivity({ cycleMs = 4800, className = "" }: Props) {
    const reduce = useReducedMotion();

    // タイムライン（0→1）：0-0.45s=Before静止、0.45-0.65s=吸い込み、0.65-1.0=After整列
    const t = (n: number) => n * cycleMs / 1000;

    const docVariants: Variants = reduce ? {} : {
        run: (i: number) => ({
            // keyframesで「散らかり → 中央吸い込み → フェードアウト」
            x: [DOCS[i].x, -10, -10],
            y: [DOCS[i].y, 0, 0],
            opacity: [1, 1, 0],
            rotate: [Math.random() * 10 - 5, 0, 0],
            transition: {
                times: [0, 0.6, 0.7],
                duration: t(1),
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0, // 親に同期
            },
        }),
    };

    const coreVariants: Variants = reduce ? {} : {
        run: {
            scale: [1, 1.06, 1],
            boxShadow: [
                "0 12px 40px rgba(59,130,246,0.35)",
                "0 20px 70px rgba(59,130,246,0.55)",
                "0 12px 40px rgba(59,130,246,0.35)",
            ],
            transition: {
                duration: t(1),
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    };

    const ringVariants: Variants = reduce ? {} : {
        run: {
            opacity: [0.15, 0.35, 0.15],
            scale: [0.95, 1.05, 0.95],
            transition: { duration: t(1), repeat: Infinity, ease: "easeInOut" },
        },
    };

    const outParent: Variants = reduce ? {} : {
        run: {
            // 出力は後半でフェードイン→整列→軽い呼吸
            transition: {
                staggerChildren: 0.08,
                delayChildren: t(0.68),
                repeat: Infinity,
                repeatDelay: 0,
            },
        },
    };

    const outItem: Variants = reduce ? {} : {
        run: {
            opacity: [0, 1, 1],
            y: [8, 0, 0],
            scale: [0.96, 1, 1],
            transition: { duration: t(0.28), ease: "easeOut" },
        },
    };

    return (
        <section
            className={`relative w-full max-w-5xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950
                  ring-1 ring-white/10 overflow-hidden ${className}`}
            aria-label="AIで混乱を整理し、成果へ変えるアニメーション"
        >
            {/* 背景の淡い動き（reduce時は静止） */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                animate={reduce ? {} : { backgroundPositionX: ["0%", "100%"] }}
                transition={{ duration: t(1.4), repeat: Infinity, ease: "linear" }}
                style={{
                    backgroundImage:
                        "radial-gradient(60rem 20rem at 20% 30%, rgba(37,99,235,0.18), transparent 50%)," +
                        "radial-gradient(40rem 16rem at 80% 70%, rgba(56,189,248,0.12), transparent 50%)",
                    backgroundSize: "200% 100%, 200% 100%",
                }}
            />

            <div className="relative grid grid-cols-3 items-center min-h-[260px] md:min-h-[320px]">
                {/* 左：Before（散らかった書類） */}
                <div className="relative h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-64 h-48">
                            {DOCS.map((d, i) => (
                                <motion.div
                                    key={d.id}
                                    custom={i}
                                    variants={docVariants}
                                    animate={reduce ? undefined : "run"}
                                    className="absolute"
                                    style={{ left: "50%", top: "50%" }}
                                >
                                    <div
                                        className="relative -translate-x-1/2 -translate-y-1/2 w-10 h-12
                               rounded-md bg-white/90 text-slate-700 shadow-lg border border-white/50
                               grid place-items-center"
                                    >
                                        <FileText className="w-5 h-5" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <p className="mt-2 text-center text-xs md:text-sm text-white/70">散在する書類・タスク</p>
                </div>

                {/* 中央：AIコア（吸い込み） */}
                <div className="relative h-full grid place-items-center">
                    {/* 光輪 */}
                    <motion.div
                        variants={ringVariants}
                        animate={reduce ? undefined : "run"}
                        className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 60%)",
                            filter: "blur(6px)",
                        }}
                    />
                    {/* コア */}
                    <motion.div
                        variants={coreVariants}
                        animate={reduce ? undefined : "run"}
                        className="relative z-10 grid place-items-center w-28 h-28 md:w-36 md:h-36
                       rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
                       ring-1 ring-white/20 shadow-lg"
                        role="img"
                        aria-label="AIコアが情報を整理"
                    >
                        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow" />
                    </motion.div>
                    <p className="mt-2 text-center text-xs md:text-sm text-white/80 font-medium">AIが整理・最適化</p>
                </div>

                {/* 右：After（整然とした成果物） */}
                <motion.div
                    variants={outParent}
                    animate={reduce ? undefined : "run"}
                    className="relative h-full flex items-center justify-center"
                >
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {OUTPUTS.map(({ id, Icon, label }) => (
                            <motion.div
                                key={id}
                                variants={outItem}
                                className="group w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/95
                           border border-white/60 shadow-lg grid place-items-center"
                                title={label}
                            >
                                <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                            </motion.div>
                        ))}
                    </div>
                    <p className="absolute -bottom-6 w-full text-center text-xs md:text-sm text-white/70">
                        整理された成果・可視化・完了
                    </p>
                </motion.div>
            </div>

            {/* 見出し（任意差し替えOK） */}
            <div className="mt-8 text-center">
                <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    私たちのAIは <span className="text-blue-300">混乱を整理し、価値ある成果へ</span> 変えます
                </h3>
                <p className="text-white/70 text-xs md:text-sm mt-1">
                    数秒のアニメーションで「生産性向上」の体験を、直感的に。
                </p>
            </div>
        </section>
    );
}
