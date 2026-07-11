import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { getAllColumnsMeta } from '../../lib/columns';

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

function formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function ColumnIndexPage() {
    const columns = getAllColumnsMeta();

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
                        <div className="grid gap-6">
                            {columns.map((col) => (
                                <Link
                                    key={col.slug}
                                    href={`/column/${col.slug}`}
                                    className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 md:p-8 border border-transparent hover:border-blue-100"
                                >
                                    {col.date && (
                                        <time className="text-sm text-blue-500 font-medium">{formatDate(col.date)}</time>
                                    )}
                                    <h2 className="text-xl md:text-2xl font-bold text-blue-700 mt-1 mb-2">{col.title}</h2>
                                    <p className="text-gray-600 text-sm md:text-base line-clamp-2">{col.description}</p>
                                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm mt-4">
                                        続きを読む <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
