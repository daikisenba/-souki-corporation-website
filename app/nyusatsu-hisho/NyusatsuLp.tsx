'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    TrendingUp,
    Search,
    Bell,
    ShieldCheck,
    Mail,
    FileDown,
} from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
};

export default function NyusatsuLp() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // 送信された「希望内容」を控え、成功画面を出し分ける(資料請求ならDL動線を出す)
    const [submittedIntent, setSubmittedIntent] = useState('');

    // 送信先は既存トップページと同じ Formspree エンドポイントに統一する。
    // 入札秘書LP由来の問い合わせと分かるよう category / _subject を付与する。
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const data = new FormData(form);
        const intent = String(data.get('希望内容') || '');
        try {
            const response = await fetch('https://formspree.io/f/xzzqgapw', {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (response.ok) {
                setSubmittedIntent(intent);
                setIsSubmitted(true);
                form.reset();
            } else {
                // Formspreeが返すJSONエラーを可能な範囲で表示し、原因を追いやすくする
                let detail = '';
                try {
                    const json = await response.json();
                    detail = (json?.errors || []).map((x: { message?: string }) => x.message).join(' / ');
                } catch {
                    /* noop */
                }
                alert(`送信に失敗しました。${detail || 'もう一度お試しください。'}`);
            }
        } catch (error) {
            alert('エラーが発生しました。通信環境をご確認のうえ、再度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
            {/* ヘッダー */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                    <Link href="/" className="text-lg md:text-xl font-bold text-blue-700">
                        株式会社想樹
                    </Link>
                    <a
                        href="#contact"
                        className="bg-blue-700 text-white text-sm md:text-base font-semibold px-4 md:px-6 py-2 rounded-full hover:bg-blue-800 transition-colors"
                    >
                        資料請求・無料相談
                    </a>
                </div>
            </header>

            <main className="pt-20 md:pt-24">
                {/* ヒーロー */}
                <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
                    <motion.div {...fadeUp}>
                        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                            中小企業のための「入札秘書」
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 leading-tight mb-6">
                            探さない入札。
                            <br className="md:hidden" />
                            毎朝、届く。
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4">
                            御社の条件に合った公共入札案件を、<strong className="text-blue-700">毎朝自動で探してメールでお届け</strong>。
                            過去の落札相場つきで、応札の検討がその場で進みます。
                        </p>
                        <p className="text-lg md:text-2xl font-bold text-blue-800 mb-8">
                            月額3万円（税別）／<span className="text-orange-500">初期費用0円</span>
                            <span className="text-sm font-normal text-gray-500 ml-2">※初期費用0円は期間限定</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#contact"
                                className="bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                無料で資料請求 <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="#contact"
                                className="bg-white text-blue-700 border-2 border-blue-200 font-semibold px-8 py-4 rounded-full hover:border-blue-400 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                無料トライアルを試す
                            </a>
                        </div>
                        <div className="mt-4">
                            <Link
                                href="/nyusatsu-hisho/brochure"
                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm underline underline-offset-4"
                            >
                                <FileDown className="w-4 h-4" /> サービス資料をPDFでダウンロード
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* 課題提起 */}
                <section className="bg-white/70 py-14 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 md:px-6">
                        <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-10">
                            こんなお悩み、ありませんか？
                        </motion.h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                '全省庁統一資格は取ったが、案件を探す時間がない',
                                '入札情報サービスは高くて手が出ない（月5万円〜が相場）',
                                '毎回いろんなサイトを見て回るのが手間',
                                'この案件、いくらで入れればいいのか相場が分からない',
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-5"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.p {...fadeUp} className="text-center text-lg md:text-xl font-bold text-blue-800 mt-10">
                            → その「探す時間」と「相場調べ」、まるごと自動化します。
                        </motion.p>
                    </div>
                </section>

                {/* 3つの特徴 */}
                <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
                    <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-12">
                        入札秘書の3つの特徴
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Bell,
                                title: '毎朝、条件に合う案件が届く',
                                body: '業種・品目・地域・資格等級・価格帯を登録するだけ。あとは平日の朝、条件に合致した新着案件をメールでお届けします。サイトを見に行く必要はありません。',
                            },
                            {
                                icon: TrendingUp,
                                title: '過去の落札相場がわかる',
                                body: '各案件に、公式の落札実績データに基づく「同種案件の落札相場（件数・中央値・価格帯・実例）」を付けてお届け。応札価格の検討材料になります。',
                            },
                            {
                                icon: ShieldCheck,
                                title: '月額3万円（税別）・初期費用0円',
                                body: '大手の入札情報サービス（月5.7万円〜）より手の届く一律料金。今なら初期導入費用は無料（期間限定）。無理なく続けられます。',
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                                    <f.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-blue-700 mb-3">{f.title}</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">{f.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 料金比較 */}
                <section className="bg-white/70 py-14 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 md:px-6">
                        <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-10">
                            料金比較
                        </motion.h2>
                        <motion.div {...fadeUp} className="overflow-x-auto">
                            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden text-sm md:text-base">
                                <thead>
                                    <tr className="bg-blue-50 text-blue-800">
                                        <th className="p-4 text-left font-semibold"></th>
                                        <th className="p-4 text-center font-semibold">大手入札情報サービス</th>
                                        <th className="p-4 text-center font-semibold text-blue-700">想樹「入札秘書」</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['月額', '5.7万円〜8.3万円', '3万円（税別）'],
                                        ['初期費用', '別途かかる場合あり', '今なら0円（期間限定）'],
                                        ['案件の探し方', '自分で検索', '毎朝メールで届く'],
                                        ['落札相場', 'プランにより手薄', '標準でお届け'],
                                        ['対象', '全国・広範囲', '一般競争入札を中心に厳選'],
                                    ].map((row, i) => (
                                        <tr key={i} className="border-t border-gray-100">
                                            <td className="p-4 font-medium text-gray-600">{row[0]}</td>
                                            <td className="p-4 text-center text-gray-500">{row[1]}</td>
                                            <td className="p-4 text-center font-bold text-blue-700 bg-blue-50/40">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                        <p className="text-xs text-gray-400 mt-3 text-center">
                            ※大手サービスの料金は各社公表情報に基づく一般的な目安です。
                        </p>
                    </div>
                </section>

                {/* 使い方3ステップ */}
                <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20">
                    <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4">
                        使い方は3ステップ
                    </motion.h2>
                    <motion.p {...fadeUp} className="text-center text-gray-600 mb-12">
                        御社の作業は1日約5分。応札するかどうかの判断に集中できます。
                    </motion.p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Search, step: 'STEP 1', title: '条件を伝える', body: '業種・品目・地域・資格等級・価格帯をヒアリング（初回のみ）。' },
                            { icon: Mail, step: 'STEP 2', title: '毎朝メールが届く', body: '条件に合う新着案件が、相場つきで自動で届きます。' },
                            { icon: Clock, step: 'STEP 3', title: '検討する', body: '気になる案件だけ、専用シートでステータス管理・応札を検討。' },
                        ].map((s, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center">
                                <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-sm font-bold text-blue-500 mb-1">{s.step}</div>
                                <h3 className="text-lg font-bold text-blue-800 mb-2">{s.title}</h3>
                                <p className="text-gray-600 text-sm">{s.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 正直な但し書き（信頼設計） */}
                <section className="bg-blue-50/60 py-14 md:py-20">
                    <div className="max-w-3xl mx-auto px-4 md:px-6">
                        <motion.h2 {...fadeUp} className="text-xl md:text-2xl font-bold text-blue-700 text-center mb-8">
                            正直にお伝えしていること（だから安心）
                        </motion.h2>
                        <motion.div {...fadeUp} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-4 text-sm md:text-base text-gray-700">
                            <p>
                                私たちは「全案件を必ず網羅」とは申しません。本サービスは公的に公開されている情報を対象とするため、
                                <strong>主に一般競争入札が対象</strong>で、ログインが必要な少額調達（オープンカウンタ等）の一部は自動探索の対象外です。
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>情報の網羅性・正確性は、提供元（官公庁の公開情報）に依存します。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>応札の可否・価格の最終判断は、お客様ご自身で行っていただきます。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>相場データは過去の公開実績に基づく参考値です。</span>
                                </li>
                            </ul>
                            <p className="text-blue-800 font-semibold pt-2">
                                誇大な約束はしません。私たちがお約束するのは、「探す手間をゼロにし、毎朝候補をお届けする」こと。ここは確実に守ります。
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* お問い合わせ / 資料請求フォーム */}
                <section id="contact" className="max-w-xl mx-auto px-4 md:px-6 py-14 md:py-20">
                    <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-3">
                        資料請求・無料トライアル
                    </motion.h2>
                    <motion.p {...fadeUp} className="text-center text-gray-600 mb-8">
                        御社の条件で「どんな案件が届くか」を無料でお試しいただけます。
                    </motion.p>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="done"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-10 flex flex-col items-center gap-5"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    {submittedIntent === '資料請求' ? (
                                        <>
                                            <h3 className="text-xl font-bold text-blue-800">
                                                資料請求ありがとうございました！
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                資料は以下のボタンからPDFで保存（印刷）していただけます。
                                                <br />
                                                内容について、代表の千羽（d.senba@souki-cp.co.jp）より折り返しご連絡することもございます。
                                            </p>
                                            <Link
                                                href="/nyusatsu-hisho/brochure"
                                                className="mt-2 inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
                                            >
                                                <FileDown className="w-5 h-5" />
                                                サービス資料をダウンロードする
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-bold text-blue-800">送信ありがとうございました</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                内容を確認し、代表の千羽（d.senba@souki-cp.co.jp）より
                                                <br />
                                                折り返しメールにてご連絡いたします。
                                            </p>
                                        </>
                                    )}
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-2 px-8 py-3 bg-blue-100 text-blue-700 font-semibold rounded-full hover:bg-blue-200 transition-colors"
                                    >
                                        フォームに戻る
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5"
                                >
                                    {/* 既存トップと同じ受信箱で識別できるよう付与 */}
                                    <input type="hidden" name="category" value="入札レコメンド（入札秘書）" />
                                    <input type="hidden" name="_subject" value="【入札秘書LP】資料請求・トライアル" />

                                    <input type="text" name="company" placeholder="会社名" required className="border rounded px-4 py-3" />
                                    <input type="text" name="name" placeholder="ご担当者名" required className="border rounded px-4 py-3" />
                                    <input type="email" name="email" placeholder="メールアドレス" required className="border rounded px-4 py-3" />
                                    <select name="希望内容" required className="border rounded px-4 py-3 text-gray-700">
                                        <option value="">ご希望を選択</option>
                                        <option value="資料請求">資料請求</option>
                                        <option value="無料トライアル">無料トライアル</option>
                                        <option value="その他">その他・相談したい</option>
                                    </select>
                                    <textarea
                                        name="message"
                                        placeholder="ご興味のある品目・地域など（任意）"
                                        className="border rounded px-4 py-3 min-h-[90px]"
                                    />
                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                        <input type="checkbox" name="privacy" required />
                                        プライバシーポリシーに同意します
                                    </label>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow self-center min-w-[200px] hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? '送信中...' : '送信する'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        落札相場は「調達ポータル（デジタル庁）落札実績オープンデータ」に基づく参考値です。料金・仕様は予告なく変更する場合があります。
                    </p>
                </section>

                {/* フッター */}
                <footer className="bg-blue-800 text-blue-100 py-10 text-center">
                    <p className="font-bold text-white mb-2">株式会社想樹</p>
                    <p className="text-sm mb-4">変化を力に変える伴走者</p>
                    <Link href="/" className="text-blue-200 hover:text-white text-sm underline">
                        トップページへ戻る
                    </Link>
                </footer>
            </main>
        </div>
    );
}
