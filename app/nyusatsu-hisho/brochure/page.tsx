import type { Metadata } from 'next';
import {
    Bell,
    TrendingUp,
    ShieldCheck,
    Search,
    Mail,
    Clock,
    Building2,
    MapPin,
} from 'lucide-react';
import PrintButton from './PrintButton';

// 資料(ブローシャー)はSEO対象にしない。LPを検索の入口とし、こちらは配布用。
export const metadata: Metadata = {
    title: '入札秘書 サービス資料',
    robots: { index: false, follow: false },
    alternates: { canonical: 'https://www.souki-cp.co.jp/nyusatsu-hisho/brochure' },
};

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

// 配信メールの「見本」。実在の案件ではなくイメージであることを明示して掲載する。
const sampleListings = [
    {
        name: '事務用品一式の購入',
        meta: '発注機関：関東地方整備局／締切：2026-08-05／予定価格：¥1,200,000',
        score: 'マッチ度：92点',
        award: '参考落札相場：同種14件 中央値¥1,050,000（¥920,000〜¥1,180,000）',
    },
    {
        name: '庁舎清掃業務委託',
        meta: '発注機関：△△市／締切：2026-08-12／予定価格：要確認',
        score: 'マッチ度：85点',
        award: '参考落札相場：同種8件 中央値¥2,400,000',
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
    { icon: Search, title: '① お申し込み', body: 'Web・メールから約1分。' },
    { icon: Mail, title: '② 初回ヒアリング', body: '業種・品目・地域・資格等級・価格帯を伺います。' },
    { icon: Clock, title: '③ 翌営業日から配信', body: '条件に合う案件が毎朝、相場つきで届きます。' },
];

const faqs = [
    {
        q: 'すべての入札案件が届きますか？',
        a: 'いいえ。主に一般競争入札が対象で、ログインが必要な少額調達（オープンカウンタ等）の一部は自動探索の対象外です。この点は正直にお伝えしています。',
    },
    {
        q: '解約はどうすればよいですか？',
        a: 'お客様ご自身で、いつでもオンラインで解約手続きができます（トライアル期間中の解約は0円）。',
    },
    {
        q: '配信条件は後から変えられますか？',
        a: '配信メールにそのままご返信ください。翌営業日までに担当が反映します。',
    },
    {
        q: 'まずは試せますか？',
        a: '14日間の無料トライアルをご用意しています（カード登録・約1分。期間中の解約は0円）。',
    },
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
                    <span className="text-sm">公共入札 案件レコメンドサービス「入札秘書」</span>
                </div>

                <div className="px-10 py-7 flex-1 flex flex-col">
                    {/* メインコピー */}
                    <div className="text-center mb-5">
                        <h1 className="text-4xl font-bold text-blue-900 mb-2">探さない入札。毎朝、届く。</h1>
                        <p className="text-lg text-gray-600">中小企業のための、月額3万円の「入札秘書」</p>
                        <p className="text-sm text-gray-500 mt-2">
                            全省庁統一資格は取ったが「案件を探す時間がない」——その探す手間と相場調べを、まるごと自動化します。
                        </p>
                    </div>

                    {/* 価格バッジ */}
                    <div className="flex justify-center gap-6 mb-6">
                        <div className="bg-blue-50 rounded-2xl px-8 py-3 text-center">
                            <div className="text-sm text-gray-500">月額</div>
                            <div className="text-3xl font-bold text-blue-800">3万円</div>
                            <div className="text-xs text-gray-500">（税別）</div>
                        </div>
                        <div className="border-2 border-orange-400 rounded-2xl px-8 py-3 text-center">
                            <div className="text-sm text-gray-500">初期費用</div>
                            <div className="text-3xl font-bold text-orange-500">0円</div>
                            <div className="text-xs text-gray-500">※期間限定</div>
                        </div>
                    </div>

                    {/* 配信メール見本(この資料の主役) */}
                    <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                        <Mail className="w-5 h-5" /> 毎朝、こんなメールが届きます
                    </h2>
                    <div className="border border-gray-300 rounded-xl overflow-hidden mb-2">
                        {/* メールのヘッダー部 */}
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-xs text-gray-600 space-y-0.5">
                            <p><span className="font-semibold">件名：</span>【入札案件レコメンド】○○株式会社様 - 3件</p>
                            <p><span className="font-semibold">差出人：</span>株式会社想樹 入札秘書</p>
                        </div>
                        {/* メール本文の案件リスト */}
                        <div className="px-4 py-3 space-y-3">
                            {sampleListings.map((l, i) => (
                                <div key={i} className="text-xs text-gray-700">
                                    <p className="font-bold text-blue-900">{i + 1}. {l.name}</p>
                                    <p className="text-gray-600">{l.meta}</p>
                                    <p className="text-gray-600">{l.score}</p>
                                    <p className="text-blue-700">{l.award}</p>
                                </div>
                            ))}
                            <p className="text-[11px] text-gray-400 pt-1">…ほか、条件に合う新着案件をまとめてお届けします。</p>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mb-6">
                        ※上記は配信イメージです。案件名・機関名・金額はサンプルであり、実在の案件を示すものではありません。
                    </p>

                    {/* 3特徴 */}
                    <div className="grid grid-cols-3 gap-4 mt-auto">
                        {features.map((f, i) => (
                            <div key={i} className="bg-blue-50 rounded-xl p-4">
                                <f.icon className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="text-sm font-bold text-blue-700 mb-1">{f.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{f.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 裏面 ===== */}
            <section className="brochure-sheet bg-white shadow-xl mx-auto flex flex-col">
                <div className="px-10 py-7 flex-1 flex flex-col">
                    {/* 料金比較 */}
                    <h2 className="text-lg font-bold text-blue-700 mb-3">料金比較</h2>
                    <table className="w-full text-sm border-collapse mb-1">
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
                    <p className="text-[10px] text-gray-400 mb-4">
                        ※大手サービスの料金は各社公表情報に基づく一般的な目安です。
                    </p>

                    {/* 導入までの流れ */}
                    <h2 className="text-lg font-bold text-blue-700 mb-3">導入までの流れ</h2>
                    <div className="grid grid-cols-3 gap-4 mb-2">
                        {steps.map((s, i) => (
                            <div key={i} className="bg-blue-50 rounded-xl p-4">
                                <s.icon className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="text-sm font-bold text-blue-800 mb-1">{s.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-blue-800 font-semibold mb-4">
                        14日間の無料トライアル付き。まずは「どんな案件が届くか」を無料でお試しいただけます。
                    </p>

                    {/* よくあるご質問 */}
                    <h2 className="text-lg font-bold text-blue-700 mb-3">よくあるご質問</h2>
                    <div className="space-y-2 mb-4">
                        {faqs.map((f, i) => (
                            <div key={i}>
                                <p className="text-sm font-bold text-blue-900">Q. {f.q}</p>
                                <p className="text-sm text-gray-600">A. {f.a}</p>
                            </div>
                        ))}
                    </div>

                    {/* 正直な但し書き */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold text-blue-900 mb-1">
                            誇大な約束はしません。お約束するのは「探す手間をゼロにし、毎朝候補をお届けする」こと。ここは確実に守ります。
                        </p>
                        <p className="text-xs text-gray-600">
                            情報の網羅性・正確性は提供元（官公庁の公開情報）に依存します。応札の可否・価格の最終判断はお客様ご自身で行っていただきます。相場データは過去の公開実績に基づく参考値です。
                        </p>
                    </div>

                    <div className="flex-1" />

                    {/* 会社情報 + CTA */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                            <p className="font-bold text-blue-800 flex items-center gap-1.5">
                                <Building2 className="w-4 h-4" /> 会社情報
                            </p>
                            <p>会社名：株式会社想樹</p>
                            <p>創業：2024年3月</p>
                            <p className="flex items-start gap-1">
                                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />東京都世田谷区松原5-58-17
                            </p>
                            <p>代表取締役：千羽 太樹</p>
                        </div>
                        <div className="bg-blue-700 text-white rounded-xl p-4 flex flex-col justify-center">
                            <p className="text-base font-bold mb-1">まずは無料で資料請求・トライアル</p>
                            <div className="text-sm space-y-0.5">
                                <p>Web：souki-cp.co.jp/nyusatsu-hisho</p>
                                <p>Mail：d.senba@souki-cp.co.jp</p>
                                <p className="text-blue-200 text-xs">（お問い合わせはメールのみで承ります）</p>
                            </div>
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
