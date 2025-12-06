import type { Metadata } from 'next'
import Script from 'next/script' // 追加：Next.js用のスクリプト機能
import './globals.css'

// 取得したGoogleアナリティクスのID
const GA_MEASUREMENT_ID = 'G-70TJY4VDYB'

export const metadata: Metadata = {
    title: '株式会社想樹 - 成長の道を、共に歩むパートナー',
    description: '公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。助成金コンサルティング、公共事業入札支援、営業業務の効率化サービスを提供。',
    keywords: '助成金コンサルティング, 公共事業入札支援, 営業業務効率化, AI活用サービス, 株式会社想樹, 千羽太樹',
    authors: [{ name: '株式会社想樹' }],
    creator: '株式会社想樹',
    publisher: '株式会社想樹',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: '株式会社想樹 - 成長の道を、共に歩むパートナー',
        description: '公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。',
        type: 'website',
        locale: 'ja_JP',
        siteName: '株式会社想樹',
        // ▼ 修正：新しい独自ドメインに変更しました
        url: 'https://www.souki-cp.co.jp',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: '株式会社想樹 - 成長の道を、共に歩むパートナー',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '株式会社想樹 - 成長の道を、共に歩むパートナー',
        description: '公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。',
        images: ['/og-image.jpg'],
    },
    alternates: {
        // ▼ 修正：新しい独自ドメインに変更しました
        canonical: 'https://www.souki-cp.co.jp',
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

                {/* ▼ Google Analytics 4 の設定 (Next.js推奨の書き方) */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </body>
        </html>
    )
}