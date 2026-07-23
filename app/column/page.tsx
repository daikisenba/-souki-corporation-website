import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { getAllColumnsMeta, type ColumnMeta } from '../../lib/columns';

export const metadata: Metadata = {
    title: 'コラム | 公共入札・官公需の役立ち情報 | 株式会社想樹',
    description:
        '公共入札・官公需・入札情報サービスの選び方など、中小企業が入札で成果を出すための役立ち情報をお届けするコラムです。',
    alternates: { canonical: 'https://www.souki-cp.co.jp/column' },
    openGraph: {
        title: 'コラム | 公共入札・官公需の役立ち情報 | 株式会社想樹',
        description: '中小企業が入札で成果を出すための役立ち情報コラム。',
        type: 'website',
        locale: 'ja_JP',
        siteName: '株式会社想樹',
        url: 'https://www.souki-cp.co.jp/column',
    },
};

// おすすめ記事の手動キュレーション(slug指定・表示順)。
// 記事本数がまだ少なく、GA4等の閲覧データも十分に溜まっていない段階のため、
// 自動の「人気ランキング」ではなく、購買意欲が高い検索意図(料金・比較系)の
// 記事を人手で選んで先頭に固定表示する。データが溜まったら自動化を検討する。
const FEATURED_SLUGS = ['njss-alternative-pricing', 'bid-info-service-affordable'];

// カードの日付表示は「最終更新: YYYY年M月」の月単位に留める(公開日を日まで
// 出すと、記事本数が少なく更新頻度も高くない現段階では「放置されている」
// 印象を与えかねないため)。日単位の正確な日付はJSON-LD(datePublished等)と
// <time dateTime> 属性には残し、SEO上の鮮度シグナルは維持する。
function formatMonth(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return `最終更新: ${d.getFullYear()}年${d.getMonth() + 1}月`;
}

function ColumnCard({ col, featured = false }: { col: ColumnMeta; featured?: boolean }) {
    return (
        <Link
            href={`/column/${col.slug}`}
            className={`block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 md:p-8 border ${
                featured ? 'border-blue-200' : 'border-transparent hover:border-blue-100'
            }`}
        >
            {featured && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-full px-3 py-1 mb-3">
                    <Star className="w-3 h-3 fill-blue-700" /> おすすめ
                </span>
            )}
            {col.date && (
                <time dateTime={col.date} className="text-sm text-blue-500 font-medium">
                    {formatMonth(col.date)}
                </time>
            )}
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mt-1 mb-2">{col.title}</h2>
            <p className="text-gray-600 text-sm md:text-base line-clamp-2">{col.description}</p>
            <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm mt-4">
                続きを読む <ArrowRight className="w-4 h-4" />
            </span>
        </Link>
    );
}

export default function ColumnIndexPage() {
    const columns = getAllColumnsMeta();
    const featured = FEATURED_SLUGS.map((slug) => columns.find((c) => c.slug === slug)).filter(
        (c): c is ColumnMeta => c !== undefined,
    );
    const featuredSlugSet = new Set(featured.map((c) => c.slug));
    const rest = columns.filter((c) => !featuredSlugSet.has(c.slug));

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
            <SiteHeader />
            <main className="pt-24 md:pt-28 pb-8">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">コラム</h1>
                        <p className="text-gray-600">
                            公共入札・官公需で中小企業が成果を出すための役立ち情報をお届けします。
                        </p>
                    </header>

                    {columns.length === 0 ? (
                        <p className="text-center text-gray-500 py-16">記事は準備中です。</p>
                    ) : (
                        <>
                            {featured.length > 0 && (
                                <section className="mb-10">
                                    <h2 className="text-lg font-bold text-blue-800 mb-4">おすすめ</h2>
                                    <div className="grid gap-6">
                                        {featured.map((col) => (
                                            <ColumnCard key={col.slug} col={col} featured />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {rest.length > 0 && (
                                <section>
                                    {featured.length > 0 && (
                                        <h2 className="text-lg font-bold text-blue-800 mb-4">すべての記事</h2>
                                    )}
                                    <div className="grid gap-6">
                                        {rest.map((col) => (
                                            <ColumnCard key={col.slug} col={col} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
