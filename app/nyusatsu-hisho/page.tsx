import type { Metadata } from 'next';
import NyusatsuLp from './NyusatsuLp';

// 入札秘書LPの専用メタデータ(SEO)。クライアントコンポーネント側では metadata を
// export できないため、サーバーコンポーネントのこの page.tsx で定義する。
export const metadata: Metadata = {
    title: '入札秘書 | 毎朝、条件に合う公共入札案件が届く（月額3万円・初期費用0円）',
    description:
        '中小企業のための入札レコメンドサービス「入札秘書」。全省庁統一資格を活かせていない企業へ、条件に合った公共入札案件を毎朝メールでお届け。過去の落札相場つき。月額3万円(税別)、初期費用0円(期間限定)。',
    keywords:
        '入札情報サービス, 入札 案件 メール, 中小企業 入札, 入札情報サービス 安い, 官公需 入札, 全省庁統一資格 案件 探す, 落札相場, 入札 レコメンド, 株式会社想樹',
    alternates: {
        canonical: 'https://www.souki-cp.co.jp/nyusatsu-hisho',
    },
    openGraph: {
        title: '入札秘書 | 毎朝、条件に合う公共入札案件が届く',
        description:
            '月額3万円(税別)・初期費用0円。条件に合った公共入札案件を毎朝メールでお届けします。過去の落札相場つき。',
        type: 'website',
        locale: 'ja_JP',
        siteName: '株式会社想樹',
        url: 'https://www.souki-cp.co.jp/nyusatsu-hisho',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: '入札秘書 - 毎朝、条件に合う公共入札案件が届く',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '入札秘書 | 毎朝、条件に合う公共入札案件が届く',
        description: '月額3万円(税別)・初期費用0円。公共入札案件を毎朝メールでお届け。',
        images: ['/og-image.jpg'],
    },
};

export default function NyusatsuHishoPage() {
    return <NyusatsuLp />;
}
