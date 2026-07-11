// コラム(SEO記事)の読み込みユーティリティ。
// 記事は content/columns/*.md に置くだけで増やせる(DB・API不要のステートレス設計)。
// フロントマターに title / description / date / keywords を持たせ、本文はMarkdown。
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const COLUMNS_DIR = path.join(process.cwd(), 'content/columns');

export type ColumnMeta = {
    slug: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    keywords?: string;
    author?: string;
};

export type Column = ColumnMeta & {
    content: string; // 生のMarkdown本文(HTML化はページ側で行う)
};

function readSlugs(): string[] {
    if (!fs.existsSync(COLUMNS_DIR)) return [];
    return fs
        .readdirSync(COLUMNS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''));
}

function parseFile(slug: string): Column | null {
    const filePath = path.join(COLUMNS_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        date: String(data.date ?? ''),
        keywords: data.keywords ? String(data.keywords) : undefined,
        author: data.author ? String(data.author) : undefined,
        content,
    };
}

/** 全記事のメタ情報を日付降順で返す(一覧ページ用)。 */
export function getAllColumnsMeta(): ColumnMeta[] {
    return readSlugs()
        .map(parseFile)
        .filter((c): c is Column => c !== null)
        .map(({ content, ...meta }) => meta)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 静的生成用の全スラッグ。 */
export function getAllSlugs(): string[] {
    return readSlugs();
}

/** 1記事の本文込みデータを返す(詳細ページ用)。存在しなければ null。 */
export function getColumnBySlug(slug: string): Column | null {
    return parseFile(slug);
}
