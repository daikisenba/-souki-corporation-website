'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

// トップ以外のページ(コラム等)で使う共通ヘッダー。
// トップのアンカー(#services等)へはトップURL付きで遷移する。
//
// モバイル幅では、ロゴ+ナビ4項目を1行のflexで収めようとすると必要幅(約343px)が
// 利用可能幅(375px幅端末で約343px)とほぼ同じになり、実機でflexアイテムが
// 圧縮されて個々のリンクテキストが内部で折り返る(例:「事業内容」が
// 「事業内」/「容」に割れる)不具合があった。トップページ(app/page.tsx)と
// 同じハンバーガーメニュー方式に統一して解消する。
export default function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                <Link href="/" className="text-lg md:text-xl font-bold text-blue-700">
                    株式会社想樹
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-base">
                    <Link href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                        事業内容
                    </Link>
                    <Link href="/column" className="text-gray-600 hover:text-blue-600 transition-colors">
                        コラム
                    </Link>
                    <Link href="/nyusatsu-hisho" className="text-gray-600 hover:text-blue-600 transition-colors">
                        入札秘書
                    </Link>
                    <Link
                        href="/#contact"
                        className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors"
                    >
                        お問い合わせ
                    </Link>
                </nav>
                {/* モバイルメニューボタン */}
                <div className="md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                        aria-expanded={isMobileMenuOpen}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* モバイルメニュー(展開時のみ表示) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden overflow-hidden border-t border-blue-100/50 bg-white/95 backdrop-blur-md"
                    >
                        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link
                                href="/#services"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                事業内容
                            </Link>
                            <Link
                                href="/column"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                コラム
                            </Link>
                            <Link
                                href="/nyusatsu-hisho"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                入札秘書
                            </Link>
                            <Link
                                href="/#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                お問い合わせ
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
