import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { getAllSlugs, getColumnBySlug } from '../../../lib/columns';

type Params = { slug: string };

// ビルド時に全記事を静的生成する(SSR不要・インフラ0円)。
export function generateStaticParams(): Params[] {
    return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
    const col = getColumnBySlug(params.slug);
    if (!col) return { title: '記事が見つかりません | 株式会社想樹' };
    const url = `https://www.souki-cp.co.jp/column/${col.slug}`;
    return {
        title: `${col.title} | コラム | 株式会社想樹`,
        description: col.description,
        keywords: col.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: col.title,
            description: col.description,
            type: 'article',
            locale: 'ja_JP',
            siteName: '株式会社想樹',
            url,
        },
    };
}

// 一覧ページ(app/column/page.tsx)と同じ方針: 表示は月単位の「最終更新」に
// 留め、日単位の正確な日付は <time dateTime> とJSON-LDのみに残す。
function formatMonth(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return `最終更新: ${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export default async function ColumnArticlePage({ params }: { params: Params }) {
    const col = getColumnBySlug(params.slug);
    if (!col) notFound();

    const html = await marked.parse(col.content);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
            <SiteHeader />
            {/* 構造化データ(Article/FAQPage等)。検索エンジン・AI検索での引用に効かせる。
                本文中にコードブロックとして出さず、必ずscriptタグとして出力する。 */}
            {col.jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: col.jsonLd }}
                />
            )}
            <main className="pt-24 md:pt-28">
                <article className="max-w-3xl mx-auto px-4 md:px-6">
                    <header className="mb-8">
                        {col.date && (
                            <time dateTime={col.date} className="text-sm text-blue-500 font-medium">
                                {formatMonth(col.date)}
                            </time>
                        )}
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-800 leading-tight mt-2">{col.title}</h1>
                        {col.description && <p className="text-gray-600 mt-4">{col.description}</p>}
                    </header>

                    {/* Markdown本文。@tailwindcss/typography の prose で読みやすく整形 */}
                    <div
                        className="prose prose-blue max-w-none prose-headings:text-blue-800 prose-a:text-blue-600 prose-strong:text-blue-800"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {/* 記事末のCTA(入札秘書LPへ誘導) */}
                    <div className="mt-12 bg-blue-700 rounded-2xl p-6 md:p-8 text-white">
                        <p className="text-sm text-blue-100 font-semibold mb-1">中小企業のための入札秘書</p>
                        <p className="text-xl font-bold mb-4">
                            条件に合う入札案件を、毎朝メールでお届け。月額3万円・初期費用0円。
                        </p>
                        <Link
                            href="/nyusatsu-hisho"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                        >
                            入札秘書のサービスを見る <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="mt-10 mb-4">
                        <Link
                            href="/column"
                            className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> コラム一覧へ戻る
                        </Link>
                    </div>
                </article>
            </main>
            <SiteFooter />
        </div>
    );
}
