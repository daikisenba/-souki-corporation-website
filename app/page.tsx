'use client';

import React, { useState, useEffect } from 'react';
// Framer Motion：アニメーション用
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// Next.jsの画像最適化
import Image from "next/image";
// Next.jsのルーティング
import Link from "next/link";
// Lucideアイコン（線アイコン）利用
import { ArrowRight, Mail, Phone, Building2, User, MapPin, FileText, Sparkles, Award, TrendingUp, Bot, Users, Code, Cpu, Database, Globe, Zap } from "lucide-react";

// パーティクルコンポーネント
const ParticleBackground = () => {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number, type: string }>>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 80 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 2,
                speed: Math.random() * 0.8 + 0.2,
                type: Math.random() > 0.5 ? 'circle' : 'square'
            }));
            setParticles(newParticles);
        };

        generateParticles();
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                y: particle.y - particle.speed,
                x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.3
            })).filter(particle => particle.y > -10));
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    className={`absolute ${particle.type === 'circle' ? 'bg-blue-200/40' : 'bg-blue-300/30'} ${particle.type === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.2, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: particle.id * 0.05,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// タイピングアニメーションコンポーネント
const TypewriterText = ({ text, className = "" }: { text: string, className?: string }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{
                    opacity: [1, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="inline-block w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 ml-1 rounded-sm"
            />
        </span>
    );
};

// 技術要素のインタラクティブカード
const TechCard = ({ icon: Icon, title, description, delay }: {
    icon: any,
    title: string,
    description: string,
    delay: number
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50"
            >
                <motion.div
                    animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto"
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{description}</p>

                {/* ホバー時の光効果 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent rounded-2xl pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};

// 時間表示コンポーネント
const ClockDisplay = () => {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        };

        updateTime(); // 初期表示
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return <span className="font-mono">--:--:--</span>;
    }

    return (
        <span className="font-mono">
            {time}
        </span>
    );
};

// 日付表示コンポーネント
const TimeDisplay = () => {
    const [date, setDate] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateDate = () => {
            const now = new Date();
            setDate(now.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            }));
        };

        updateDate(); // 初期表示
        const timer = setInterval(updateDate, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return <span className="font-medium">----年--月--日 --曜日</span>;
    }

    return (
        <span className="font-medium">
            {date}
        </span>
    );
};

export default function Home() {
    // パララックス用（md以上のみ有効化）
    const { scrollY } = useScroll();
    const isDesktop = typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false;
    const y = isDesktop ? useTransform(scrollY, [0, 200], [0, 24]) : 0;

    // スクロールに応じた背景色の変化
    const backgroundColor = useTransform(
        scrollY,
        [0, 1000],
        ["rgba(232, 241, 255, 1)", "rgba(255, 255, 255, 1)"]
    );

    return (
        <>
            {/* スクロールインジケーター */}
            <motion.div
                className="scroll-indicator"
                style={{
                    scaleX: useTransform(scrollY, [0, 1000], [0, 1])
                }}
            />

            {/* ヘッダー */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-blue-700">株式会社想樹</h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">事業内容</a>
                            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">お問い合わせ</a>
                        </nav>
                    </motion.div>
                </div>
            </header>

            <motion.main
                style={{ backgroundColor }}
                className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-2 md:px-0 pt-20"
            >
                {/* 動的パーティクル背景 */}
                <ParticleBackground />

                {/* 動的背景パターン */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <motion.div
                        className="absolute inset-0 opacity-15"
                        animate={{
                            backgroundPosition: [
                                "0% 0%",
                                "100% 100%",
                                "0% 100%",
                                "100% 0%",
                                "0% 0%"
                            ]
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, #1D4ED8 0%, transparent 50%),
                                linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.15) 50%, transparent 60%),
                                linear-gradient(-45deg, transparent 30%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)
                            `,
                            backgroundSize: '120% 120%, 120% 120%, 300px 300px, 250px 250px',
                        }}
                    />
                </div>

                {/* Heroセクション（最新仕様） */}
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-24 items-center w-full"
                >
                    {/* 左：テキスト＋ガラスモーフ */}
                    <div className="backdrop-blur-lg bg-white/10 ring-1 ring-white/15 rounded-2xl p-8 text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-bold text-[#0B63F6] mb-4 font-sans text-[clamp(28px,4vw,48px)] tracking-tight leading-snug whitespace-nowrap"
                        >
                            <TypewriterText text="成長の道を、共に歩むパートナー" />
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl text-[#0B63F6] font-semibold mb-2 font-sans leading-snug"
                        >
                            変化を力に変える伴走者
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-base md:text-lg text-gray-700 mb-6 font-sans text-relaxed"
                        >
                            公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex gap-4 mt-4"
                        >
                            <motion.a
                                whileHover={{
                                    scale: 1.05,
                                    y: -2,
                                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                aria-label="無料相談フォームへ（24時間以内に返信）"
                                className="rounded-xl px-6 py-3 bg-white text-blue-700 font-semibold shadow-lg hover:bg-blue-100 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63F6] focus-visible:ring-offset-2"
                            >
                                無料相談（24時間以内に返信）
                            </motion.a>
                            <motion.a
                                whileHover={{
                                    scale: 1.05,
                                    y: -2,
                                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                href="#services"
                                aria-label="サービス詳細へ"
                                className="rounded-xl px-6 py-3 border border-blue-200 bg-blue-50 text-blue-700 font-semibold shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63F6] focus-visible:ring-offset-2"
                            >
                                サービス詳細
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* 右：お洒落な時間表示 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex justify-center items-center transform-gpu will-change-transform md:block hidden"
                    >
                        <div className="relative ml-16 mt-24">
                            {/* 背景の円形グラデーション */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>

                            {/* メインの時間表示コンテナ */}
                            <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
                                <div className="text-center space-y-4">
                                    {/* 日付表示 */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                        className="text-blue-900 text-sm font-medium tracking-wider"
                                    >
                                        <TimeDisplay />
                                    </motion.div>

                                    {/* 時間表示 */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.8 }}
                                        className="text-4xl md:text-5xl font-bold text-blue-800 tracking-tight"
                                    >
                                        <ClockDisplay />
                                    </motion.div>

                                    {/* 技術力アピールテキスト */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.0 }}
                                        className="text-blue-700 text-sm font-medium"
                                    >
                                        最新技術で常に進化
                                    </motion.div>

                                    {/* 装飾的な要素 */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* 事業概要セクション */}
                <section id="services" className="w-full max-w-7xl mx-auto py-10 md:py-16 px-2 md:px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">事業内容</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            信頼性・安定性・実績を重視し、お客様の成長をサポートする3つのサービスを提供しています
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 助成金コンサルティング */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"
                                >
                                    <Award className="w-6 h-6 text-blue-600" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-blue-700">助成金コンサルティング</h3>
                            </div>
                            <p className="text-gray-700 mb-6 flex-grow">
                                企業や個人事業主の皆さまが活用できる各種助成金制度について、情報収集から申請書類の作成、提出までを一貫してサポートいたします。
                            </p>
                            <div className="space-y-3 text-sm text-gray-600">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>返済不要の資金調達手段として活用</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>豊富な実務経験による最適な制度選定</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>スムーズな受給に向けた具体的な支援</span>
                                </motion.div>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full self-start shadow mt-6 hover:bg-blue-800 transition-colors"
                            >
                                無料相談はこちら
                            </motion.a>
                        </motion.div>

                        {/* 工業事業入札支援 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"
                                >
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-blue-700">公共事業入札支援</h3>
                            </div>
                            <p className="text-gray-700 mb-6 flex-grow">
                                官公庁や自治体が発注する公共事業は、安定性と規模の大きさが魅力ですが、入札や契約に至るまでのプロセスは複雑であり、専門的な知識と丁寧な準備が欠かせません。
                            </p>
                            <div className="space-y-3 text-sm text-gray-600">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>公告情報の収集・分析から入札戦略立案</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>必要書類の作成支援</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>安定した事業基盤の構築サポート</span>
                                </motion.div>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full self-start shadow mt-6 hover:bg-blue-800 transition-colors"
                            >
                                無料相談はこちら
                            </motion.a>
                        </motion.div>

                        {/* AI活用サービス */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"
                                >
                                    <Bot className="w-6 h-6 text-blue-600" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-blue-700">営業業務の効率化</h3>
                            </div>
                            <p className="text-gray-700 mb-6 flex-grow">
                                最新のAI技術を活用し、営業活動の効率化と売上向上を実現します。顧客データの分析、リード管理の自動化、営業活動の最適化により、営業チームの生産性を大幅に向上させます。
                            </p>
                            <div className="space-y-3 text-sm text-gray-600">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>顧客データ分析による営業戦略立案</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>リード管理の自動化・効率化</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>営業活動の最適化と売上向上支援</span>
                                </motion.div>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full self-start shadow mt-6 hover:bg-blue-800 transition-colors"
                            >
                                無料相談はこちら
                            </motion.a>
                        </motion.div>
                    </div>
                </section>

                {/* 技術力セクション */}
                <section className="w-full max-w-7xl mx-auto py-10 md:py-16 px-2 md:px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">技術力</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            最新技術を駆使し、お客様のビジネスに革新的なソリューションを提供します
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <TechCard
                            icon={Code}
                            title="AI開発"
                            description="最新の生成AI技術を活用したカスタムソリューション開発"
                            delay={0.1}
                        />
                        <TechCard
                            icon={Database}
                            title="データ分析"
                            description="ビッグデータ分析による業務効率化と意思決定支援"
                            delay={0.2}
                        />
                        <TechCard
                            icon={Globe}
                            title="Webシステム"
                            description="スケーラブルでセキュアなWebアプリケーション構築"
                            delay={0.3}
                        />
                        <TechCard
                            icon={Zap}
                            title="自動化"
                            description="RPAとAIを組み合わせた業務プロセス自動化"
                            delay={0.4}
                        />
                    </div>
                </section>

                {/* 期待効果セクション */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full max-w-6xl mx-auto py-10 md:py-16 px-2 md:px-4"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">期待できる効果</h2>
                        <p className="text-lg text-gray-600">お客様の課題解決に向けた具体的な成果</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/60 rounded-xl p-6 text-center hover:bg-white/80 transition-colors"
                        >
                            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-blue-700 mb-2">業務効率化</h3>
                            <p className="text-sm text-gray-600">定型業務の自動化により、生産性が向上</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white/60 rounded-xl p-6 text-center hover:bg-white/80 transition-colors"
                        >
                            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-blue-700 mb-2">コスト削減</h3>
                            <p className="text-sm text-gray-600">助成金活用とAI導入で経費を大幅削減</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white/60 rounded-xl p-6 text-center hover:bg-white/80 transition-colors"
                        >
                            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-blue-700 mb-2">競争力向上</h3>
                            <p className="text-sm text-gray-600">最新技術導入で市場での優位性確保</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white/60 rounded-xl p-6 text-center hover:bg-white/80 transition-colors"
                        >
                            <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-semibold text-blue-700 mb-2">新規事業創出</h3>
                            <p className="text-sm text-gray-600">AI技術を活用した新しいビジネスモデル</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* 代表メッセージ・会社概要セクション */}
                <section className="w-full max-w-4xl mx-auto py-10 md:py-16 px-2 md:px-4">
                    <div className="text-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-blue-700 mb-6"
                        >
                            代表メッセージ
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-gray-700 mb-8 text-lg leading-relaxed max-w-3xl mx-auto"
                        >
                            私たちは、公共領域にも安心して導入できる仕組みと、最新の生成AIを組み合わせ、<br />
                            これからの社会に必要とされる業務スタイルを創り出していきます。<br /><br />
                            テンプレではなく、一社ごとの課題に合わせたオーダーメイド型の解決策を提案し、<br />
                            「効率化」と「安心感」を同時に実現することを目指します。<br /><br />
                            信頼を積み重ねながら革新を続け、人とテクノロジーが共に成長できる未来を描いていきます。
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100/50"
                        >
                            <h4 className="text-lg font-semibold text-blue-600 mb-4">会社概要</h4>
                            <ul className="text-gray-700 text-base space-y-2">
                                <li>会社名：株式会社想樹</li>
                                <li>創業：2024年3月</li>
                                <li>所在地：東京都世田谷区松原5-58-17</li>
                                <li>代表取締役：千羽 太樹</li>
                                <li>メール：info@souki-cp.co.jp</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 問い合わせフォームセクション */}
                <section id="contact" className="w-full max-w-xl mx-auto py-10 md:py-16 px-2 md:px-4">
                    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">無料相談・お問い合わせ</h3>
                    <form action="https://formspree.io/f/mnqkqgqv" method="POST" className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                        <input type="text" name="company" placeholder="会社名" required className="border rounded px-4 py-2" />
                        <input type="text" name="name" placeholder="ご担当者名" required className="border rounded px-4 py-2" />
                        <input type="email" name="email" placeholder="メールアドレス" required className="border rounded px-4 py-2" />
                        <input type="tel" name="phone" placeholder="電話番号（任意）" className="border rounded px-4 py-2" />
                        <select name="category" required className="border rounded px-4 py-2">
                            <option value="">相談区分を選択</option>
                            <option value="助成金コンサルティング">助成金コンサルティング</option>
                            <option value="公共事業入札支援">公共事業入札支援</option>
                            <option value="AI活用サービス">AI活用サービス</option>
                            <option value="その他">その他</option>
                        </select>
                        <textarea name="message" placeholder="ご相談内容" required className="border rounded px-4 py-2 min-h-[100px]" />
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="privacy" required />
                            <span className="text-sm">プライバシーポリシーに同意します</span>
                        </div>
                        <button type="submit" className="bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 rounded-full shadow self-center min-w-[180px] min-h-[44px] text-base md:text-lg">送信する</button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4 text-center">送信内容は info@souki-cp.co.jp にメールで届きます。</p>
                </section>
            </motion.main>
        </>
    );
}
