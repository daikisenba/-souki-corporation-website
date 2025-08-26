import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: '株式会社想樹 - 成長の道を、共に歩むパートナー',
    description: '公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。',
    keywords: '助成金コンサルティング, 公共事業入札支援, AI活用サービス, 株式会社想樹',
    authors: [{ name: '株式会社想樹' }],
    openGraph: {
        title: '株式会社想樹 - 成長の道を、共に歩むパートナー',
        description: '公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。',
        type: 'website',
        locale: 'ja_JP',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
