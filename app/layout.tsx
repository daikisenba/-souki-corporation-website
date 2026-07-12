import type { Metadata } from 'next'
import Script from 'next/script' // 追加：Next.js用のスクリプト機能
import './globals.css'

// 取得したGoogleアナリティクスのID
const GA_MEASUREMENT_ID = 'G-70TJY4VDYB'

export const metadata: Metadata = {
    // OG/Twitter画像の相対URLを絶対URLへ解決するための基準(未設定だとlocalhostに解決される)
    metadataBase: new URL('https://www.souki-cp.co.jp'),
    title: '株式会社想樹 - 入札案件が毎朝届くAI入札秘書｜公共入札支援',
    description: '公共入札に特化し、中小企業の入札参加を伴走支援します。条件に合った入札案件を毎朝お届けする入札レコメンドサービス「入札秘書」、公共事業入札支援を提供する株式会社想樹。',
    keywords: '公共入札, 公共事業入札支援, 入札情報サービス, 入札 案件 メール, 中小企業 入札, 入札レコメンド, 入札秘書, 株式会社想樹',
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
        title: '株式会社想樹 - 入札案件が毎朝届くAI入札秘書｜公共入札支援',
        description: '条件に合った公共入札の新着案件を毎朝メールでお届け。落札相場つきで応札の判断がすぐ進む、中小企業のためのAI入札秘書（月額3万円）。',
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
                alt: '株式会社想樹 - 入札案件が毎朝届くAI入札秘書｜公共入札支援',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '株式会社想樹 - 入札案件が毎朝届くAI入札秘書｜公共入札支援',
        description: '条件に合った公共入札の新着案件を毎朝メールでお届け。落札相場つきで応札の判断がすぐ進む、中小企業のためのAI入札秘書（月額3万円）。',
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