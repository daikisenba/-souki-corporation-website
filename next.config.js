/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/**',
            },
        ],
    },
    // コラム記事の重複統合による恒久リダイレクト(301)。
    // 検索意図が重複していた旧記事(njss-takai-erabikata)を、一次情報で裏取り
    // 済みの新記事(njss-alternative-pricing)へ統合した際に追加。
    // 記事を削除するとURLの評価(被リンク・インデックス)が失われるため、
    // 削除ではなく301で新URLへ引き継ぐ(SEOの標準的な統合手順)。
    async redirects() {
        return [
            {
                source: '/column/njss-takai-erabikata',
                destination: '/column/njss-alternative-pricing',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
