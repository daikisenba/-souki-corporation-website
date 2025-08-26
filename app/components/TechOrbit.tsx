// TechOrbit.tsx
import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionConfig } from "framer-motion";
import { Cpu, Database, Globe, Zap, Code } from "lucide-react";

type OrbitIcon = {
    id: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    radius: number;     // 軌道半径
    speed: number;      // 回転速度（大きいほど速い）
    size?: number;      // アイコンサイズ
    angleOffset?: number;
    label?: string;
};

const ICONS: OrbitIcon[] = [
    { id: "cpu", Icon: Cpu, radius: 130, speed: 0.8, size: 20, angleOffset: 0, label: "Automation" },
    { id: "db", Icon: Database, radius: 170, speed: 0.6, size: 20, angleOffset: 60, label: "RAG/DB" },
    { id: "globe", Icon: Globe, radius: 210, speed: 0.5, size: 20, angleOffset: 120, label: "Infra" },
    { id: "zap", Icon: Zap, radius: 150, speed: 0.9, size: 20, angleOffset: 200, label: "AI/LLM" },
];

export default function TechOrbit() {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    // マウス視差用
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    // ばねで滑らかに
    const springX = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
    const springY = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });

    // 視差変換（コンテナ内の -1〜1 を px へ）
    const parallaxX = useTransform(springX, v => v * 12);
    const parallaxY = useTransform(springY, v => v * 12);
    const tiltX = useTransform(springY, v => v * -4); // 上下動でX軸回転
    const tiltY = useTransform(springX, v => v * 4);  // 左右動でY軸回転

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0..1
        const y = (e.clientY - rect.top) / rect.height;  // 0..1
        // -1..1 に正規化
        mx.set((x - 0.5) * 2);
        my.set((y - 0.5) * 2);
    };

    const handleMouseLeave = () => {
        mx.set(0);
        my.set(0);
    };

    // ランダム微振動（reduce-motion時は無効）
    const jitter = useMemo(
        () => (reduce ? [0, 0, 0] : [0, -2, 0]),
        [reduce]
    );

    return (
        <MotionConfig reducedMotion={reduce ? "always" : "never"}>
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative md:w-[28rem] md:h-[28rem] w-72 h-72 select-none md:block grid place-items-center
                   [perspective:800px] transform-gpu will-change-transform"
                aria-label="Tech orbit animation"
            >
                {/* ベースの光輪（奥行き＋ブランドカラーの印象） */}
                <motion.div
                    style={{ x: parallaxX, y: parallaxY, rotateX: tiltX, rotateY: tiltY }}
                    className="absolute inset-0 rounded-full"
                >
                    <div
                        className="absolute inset-0 rounded-full
                       bg-gradient-to-br from-blue-400/25 via-blue-500/15 to-blue-600/25
                       shadow-[0_0_80px_20px_rgba(59,130,246,0.15)]"
                    />
                    {/* グラデ境界（マスクで淡いリング） */}
                    <div
                        className="absolute inset-6 rounded-full"
                        style={{
                            WebkitMaskImage:
                                "radial-gradient(circle, rgba(0,0,0,0) 65%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 82%)",
                            maskImage:
                                "radial-gradient(circle, rgba(0,0,0,0) 65%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 82%)",
                            background:
                                "conic-gradient(from 0deg, rgba(59,130,246,0.5), rgba(59,130,246,0.1), rgba(59,130,246,0.6))",
                        }}
                    />
                </motion.div>

                {/* 中心コア */}
                <motion.div
                    style={{ x: parallaxX, y: parallaxY, rotateX: tiltX, rotateY: tiltY }}
                    animate={reduce ? {} : {
                        scale: [1, 1.04, 1], boxShadow: [
                            "0 8px 30px rgba(59,130,246,0.35)",
                            "0 16px 60px rgba(59,130,246,0.55)",
                            "0 8px 30px rgba(59,130,246,0.35)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 grid place-items-center w-40 h-40 md:w-48 md:h-48
                     rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
                     ring-1 ring-white/20 shadow-lg"
                >
                    <motion.div
                        animate={reduce ? {} : { rotate: [0, -360] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    >
                        <Code className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow" />
                    </motion.div>

                    {/* コアの呼吸グロー */}
                    {!reduce && (
                        <motion.div
                            aria-hidden
                            className="absolute -inset-6 rounded-3xl"
                            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.98, 1.04, 0.98] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.45), transparent 60%)" }}
                        />
                    )}
                </motion.div>

                {/* 軌道アイコン群 */}
                {ICONS.map(({ id, Icon, radius, speed, size = 20, angleOffset = 0, label }) => (
                    <motion.div
                        key={id}
                        className="absolute"
                        style={{ x: parallaxX, y: parallaxY, rotateX: tiltX, rotateY: tiltY }}
                    >
                        <motion.div
                            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.04, 1] }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative"
                        >
                            {/* 実際の周回（CSSではなくFramerのrotateで円運動を作る） */}
                            <motion.div
                                className="relative"
                                animate={reduce ? {} : { rotate: 360 }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 60 / speed }}
                                style={{ width: radius * 2, height: radius * 2 }}
                            >
                                {/* 磁力ホバー対象 */}
                                <motion.button
                                    title={label}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="absolute left-1/2 top-0 -translate-x-1/2 grid place-items-center
                             w-12 h-12 rounded-full bg-white/90 backdrop-blur-md
                             shadow-lg hover:shadow-xl border border-white/50 transition-shadow"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${angleOffset}deg) translateY(${radius}px) rotate(${-angleOffset}deg)`,
                                    }}
                                >
                                    <motion.div
                                        animate={reduce ? {} : { rotate: [0, 360], y: jitter }}
                                        transition={{
                                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                        }}
                                    >
                                        <Icon className="text-blue-600" width={size} height={size} />
                                    </motion.div>
                                    {/* ラベル（フォーカス/ホバー時だけ） */}
                                    <span className="sr-only">{label}</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}

                {/* モバイル静止版の薄いノイズ（"質感"だけ残す） */}
                <div className="absolute inset-0 rounded-full pointer-events-none md:hidden opacity-35"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 40%), url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22rgba(255,255,255,0.05)%22/></svg>')",
                        backgroundSize: "auto, 40px 40px",
                    }}
                />
            </div>
        </MotionConfig>
    );
}
