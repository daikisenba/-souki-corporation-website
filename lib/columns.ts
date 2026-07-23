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
    // 構造化データ(JSON-LD)の生文字列。souki-company側の変換で付与される。
    // 記事ページで <script type="application/ld+json"> として出力する。
    jsonLd?: string;
};

export type Column = ColumnMeta & {
    content: string; // 生のMarkdown本文(HTML化はページ側で行う)
};

function readSlugs(): string[] {
    if (!fs.existsSync(COLUMNS_DIR)) return [];
    return fs
        .readdirSync(COLUMNS_DIR)
        .filter((f) => f.endsWith('.md'))
        // README.md 等の記事以外のファイルを記事として拾わない
        .filter((f) => !f.startsWith('README') && !f.startsWith('_'))
        .map((f) => f.replace(/\.md$/, ''));
}

// front matter の date はYAML上でクォートし忘れると(例: date: 2026-07-10)
// YAMLパーサーが文字列ではなくDateオブジェクトとして解釈する。その場合
// String()に通すと "Fri Jul 10 2026 09:00:00 GMT+0900 (日本標準時)" のような
// 値になり、<time dateTime>属性としてHTML的に不正になる。常にYYYY-MM-DD
// 形式へ正規化することで、front matter側の書き方に関わらず壊れないようにする。
function normalizeDate(value: unknown): string {
    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) return '';
        const y = value.getFullYear();
        const m = String(value.getMonth() + 1).padStart(2, '0');
        const d = String(value.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    return value ? String(value) : '';
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
        date: normalizeDate(data.date),
        keywords: data.keywords ? String(data.keywords) : undefined,
        author: data.author ? String(data.author) : undefined,
        jsonLd: data.jsonLd ? String(data.jsonLd) : undefined,
        content,
    };
}

/** 全記事のメタ情報を日付降順で返す(一覧ページ用)。 */
export function getAllColumnsMeta(): ColumnMeta[] {
    return readSlugs()
        .map(parseFile)
        .filter((c): c is Column => c !== null)
        // 一覧では本文とJSON-LDは不要なので落とす
        .map(({ content, jsonLd, ...meta }) => meta)
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
