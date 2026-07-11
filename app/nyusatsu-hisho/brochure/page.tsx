import type { Metadata } from 'next';
import { Bell, TrendingUp, ShieldCheck, Search, Mail, Clock, CheckCircle2 } from 'lucide-react';
import PrintButton from './PrintButton';

// 資料(ブローシャー)はSEO対象にしない。LPを検索の入口とし、こちらは配布用。
export const metadata: Metadata = {
    title: '入札秘書 サービス資料',
    robots: { index: false, follow: false },
    alternates: { canonical: 'https://www.souki-cp.co.jp/nyusatsu-hisho/brochure' },
};

const worries = [
    '資格は取ったが、案件を探す時間がない',
    '入札情報サービスは高くて手が出ない（月5万円〜が相場）',
    '毎回いろんなサイトを見て回るのが手間',
    'この案件、いくらで入れればいいのか相場が分からない',
];

const features = [
    {
        icon: Bell,
        title: '毎朝、条件に合う案件が届く',
        body: '業種・品目・地域・資格等級・価格帯を登録するだけ。平日の朝、条件に合う新着案件をメールでお届けします。',
    },
    {
        icon: TrendingUp,
        title: '過去の落札相場がわかる',
        body: '公式の落札実績データに基づく「同種案件の落札相場（件数・中央値・価格帯・実例）」つき。応札価格の検討材料になります。',
    },
    {
        icon: ShieldCheck,
        title: '月額3万円（税別）・初期費用0円',
        body: '大手（月5.7万円〜）より手の届く一律料金。今なら初期導入費用は無料（期間限定）。無理なく続けられます。',
    },
];

const priceRows = [
    ['月額', '5.7万円〜8.3万円', '3万円（税別）'],
    ['初期費用', '別途かかる場合あり', '今なら0円（期間限定）'],
    ['案件の探し方', '自分で検索', '毎朝メールで届く'],
    ['落札相場', 'プランにより手薄', '標準でお届け'],
    ['対象', '全国・広範囲', '一般競争入札を中心に厳選'],
];

const steps = [
    { icon: Search, label: 'STEP 1', title: '条件を伝える', body: '業種・品目・地域・資格等級・価格帯をヒアリング（初回のみ）。' },
    { icon: Mail, label: 'STEP 2', title: '毎朝メールが届く', body: '条件に合う新着案件が、相場つきで自動で届きます。' },
    { icon: Clock, label: 'STEP 3', title: '検討する', body: '気になる案件だけ、専用シートで管理・応札を検討。' },
];

export default function BrochurePage() {
    return (
        <div className="brochure-print min-h-screen bg-gray-200 py-8 flex flex-col items-center gap-8">
            {/* 画面のみのツールバー(印刷時は隠す) */}
            <div className="no-print w-full max-w-[210mm] px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    このページを「PDFで保存」または印刷できます。ボタンを押すと印刷ダイアログが開きます。
                </p>
                <PrintButton />
            </div>

            {/* ===== 表面 ===== */}
            <section className="brochure-sheet bg-white shadow-xl mx-auto flex flex-col">
                {/* ヘッダー帯 */}
                <div className="bg-blue-700 text-white px-10 py-4 flex items-center justify-between">
                    <span className="font-bold text-lg">株式会社想樹</span>
                    <span className="text-sm">入札レコメンドサービス</span>
                </div>

                <div className="px-10 py-8 flex-1 flex flex-col">
                    {/* メインコピー */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-blue-900 mb-3">探さない入札。毎朝、届く。</h1>
                        <p className="text-lg text-gray-600">中小企業のための、月額3万円の「入札秘書」</p>
                    </div>

                    {/* 価格バッジ */}
                    <div className="flex justify-center gap-6 mb-8">
                        <div className="bg-blue-50 rounded-2xl px-8 py-4 text-center">
                            <div className="text-sm text-gray-500">月額</div>
                            <div className="text-3xl font-bold text-blue-800">3万円</div>
                            <div className="text-xs text-gray-500">（税別）</div>
                        </div>
                        <div className="border-2 border-orange-400 rounded-2xl px-8 py-4 text-center">
                            <div className="text-sm text-gray-500">初期費用</div>
                            <div className="text-3xl font-bold text-orange-500">0円</div>
                            <div className="text-xs text-gray-500">※期間限定</div>
                        </div>
                    </div>

                    {/* 悩み */}
                    <h2 className="text-lg font-bold text-blue-700 mb-3">こんなお悩み、ありませんか？</h2>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {worries.map((w, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>{w}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-blue-800 font-bold mb-6">→ その「探す時間」と「相場調べ」、まるごと自動化します。</p>

                    {/* 3特徴 */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {features.map((f, i) => (
                            <div key={i} className="bg-blue-50 rounded-xl p-4">
                                <f.icon className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="text-sm font-bold text-blue-700 mb-1">{f.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{f.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* 料金比較 */}
                    <h2 className="text-lg font-bold text-blue-700 mb-3">料金比較</h2>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2"></th>
                                <th className="p-2 bg-gray-100 text-gray-600 font-semibold text-center">大手入札情報サービス</th>
                                <th className="p-2 bg-blue-700 text-white font-semibold text-center">想樹「入札秘書」</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceRows.map((row, i) => (
                                <tr key={i} className="border-t border-gray-200">
                                    <td className="p-2 font-medium text-gray-600">{row[0]}</td>
                                    <td className="p-2 text-center text-gray-500">{row[1]}</td>
                                    <td className="p-2 text-center font-bold text-blue-800 bg-blue-50">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-[10px] text-gray-400 mt-2">
                        ※大手サービスの料金は各社公表情報に基づく一般的な目安です。
                    </p>
                </div>
            </section>

            {/* ===== 裏面 ===== */}
            <section className="brochure-sheet bg-white shadow-xl mx-auto flex flex-col">
                <div className="px-10 py-8 flex-1 flex flex-col">
                    {/* 3ステップ */}
                    <h2 className="text-lg font-bold text-blue-700 mb-1">使い方は3ステップ</h2>
                    <p className="text-sm text-gray-500 mb-5">御社の作業は1日約5分。応札の判断に集中できます。</p>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {steps.map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <s.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-xs font-bold text-blue-500">{s.label}</div>
                                <div className="text-sm font-bold text-blue-800 mb-1">{s.title}</div>
                                <p className="text-xs text-gray-600">{s.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* 正直な但し書き */}
                    <div className="border border-gray-200 rounded-xl p-5 mb-8">
                        <h2 className="text-base font-bold text-blue-700 mb-3">正直にお伝えしていること（だから安心）</h2>
                        <p className="text-sm text-gray-700 mb-3">
                            本サービスは公的に公開されている情報を対象とするため、主に一般競争入札が対象です。ログインが必要な少額調達（オープンカウンタ等）の一部は自動探索の対象外です。
                        </p>
                        <ul className="space-y-1 text-sm text-gray-700 mb-3">
                            <li>・情報の網羅性・正確性は、提供元（官公庁の公開情報）に依存します</li>
                            <li>・応札の可否・価格の最終判断は、お客様ご自身で行っていただきます</li>
                            <li>・相場データは過去の公開実績に基づく参考値です</li>
                        </ul>
                        <p className="text-sm font-bold text-blue-900">
                            誇大な約束はしません。お約束するのは「探す手間をゼロにし、毎朝候補をお届けする」こと。ここは確実に守ります。
                        </p>
                    </div>

                    {/* 会社の信頼 */}
                    <div className="bg-blue-50 rounded-xl p-5 mb-8">
                        <p className="font-bold text-blue-800">株式会社想樹 ―「変化を力に変える伴走者」</p>
                        <p className="text-sm text-gray-600 mt-1">
                            補助金・公共入札・営業支援で中小企業を支援してきた実績を、自動化・低価格化してお届けします。
                        </p>
                    </div>

                    <div className="flex-1" />

                    {/* CTA(メールのみ・電話番号は記載しない) */}
                    <div className="bg-blue-700 text-white rounded-xl p-6 mb-4">
                        <p className="text-lg font-bold mb-1">まずは無料で資料請求・トライアル</p>
                        <p className="text-sm text-blue-100 mb-4">
                            御社の条件で「どんな案件が届くか」を無料でお試しいただけます。
                        </p>
                        <div className="text-sm space-y-1">
                            <p>Web：souki-cp.co.jp/nyusatsu-hisho</p>
                            <p>Mail：info@souki-cp.co.jp</p>
                            <p className="text-blue-200 text-xs">（お問い合わせはメールのみで承ります）</p>
                        </div>
                    </div>

                    {/* 出典・注記 */}
                    <p className="text-[10px] text-gray-400">
                        落札相場は「調達ポータル（デジタル庁）落札実績オープンデータ」に基づく参考値です。料金・仕様は予告なく変更する場合があります。
                    </p>
                </div>
            </section>
        </div>
    );
}
