import type { MetadataRoute } from 'next';
import { getAllColumnsMeta } from '../lib/columns';

const BASE_URL = 'https://www.souki-cp.co.jp';

// /nyusatsu-hisho/brochure は robots: noindex 済みの配布用資料のため、
// あえてサイトマップからも除外する。
export default function sitemap(): MetadataRoute.Sitemap {
    const columns = getAllColumnsMeta();

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/nyusatsu-hisho`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/column`,
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    const columnEntries: MetadataRoute.Sitemap = columns.map((col) => ({
        url: `${BASE_URL}/column/${col.slug}`,
        lastModified: col.date || undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticEntries, ...columnEntries];
}
