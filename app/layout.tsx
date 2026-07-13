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
                {/* 構造化データ(JSON-LD): 検索エンジン・AI検索に事業/サービスを正しく伝え、
                    リッチリザルトと上位表示・AI回答での引用に効かせる */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Organization',
                                name: '株式会社想樹',
                                alternateName: '想樹',
                                url: 'https://www.souki-cp.co.jp',
                                logo: 'https://www.souki-cp.co.jp/og-image.jpg',
                                email: 'd.senba@souki-cp.co.jp',
                                foundingDate: '2024-03',
                                description:
                                    '公共入札に特化し、中小企業の入札参加を伴走支援。条件に合った公共入札の新着案件を毎朝メールで届けるAI入札レコメンドサービス「入札秘書」を提供。',
                                founder: { '@type': 'Person', name: '千羽 太樹' },
                                address: {
                                    '@type': 'PostalAddress',
                                    addressCountry: 'JP',
                                    addressRegion: '東京都',
                                    addressLocality: '世田谷区',
                                    streetAddress: '松原5-58-17',
                                },
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Service',
                                name: '入札秘書',
                                serviceType: '公共入札 案件レコメンドサービス',
                                provider: { '@type': 'Organization', name: '株式会社想樹' },
                                areaServed: { '@type': 'Country', name: '日本' },
                                url: 'https://www.souki-cp.co.jp/nyusatsu-hisho',
                                description:
                                    '御社の資格等級・地域・品目に合う公共入札の新着案件を、AIが毎朝メールでお届け。過去の落札相場つきで応札判断を支援する、中小企業向けの入札レコメンドサービス。',
                                offers: {
                                    '@type': 'Offer',
                                    price: '33000',
                                    priceCurrency: 'JPY',
                                    description: '月額33,000円（税込）。14日間無料トライアルつき。',
                                },
                            },
                        ]),
                    }}
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