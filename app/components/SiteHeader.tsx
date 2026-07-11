import Link from 'next/link';

// トップ以外のページ(コラム等)で使う共通ヘッダー。
// トップのアンカー(#services等)へはトップURL付きで遷移する。
export default function SiteHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                <Link href="/" className="text-lg md:text-xl font-bold text-blue-700">
                    株式会社想樹
                </Link>
                <nav className="flex items-center gap-4 md:gap-8 text-sm md:text-base">
                    <Link href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                        事業内容
                    </Link>
                    <Link href="/column" className="text-gray-600 hover:text-blue-600 transition-colors">
                        コラム
                    </Link>
                    <Link
                        href="/nyusatsu-hisho"
                        className="hidden sm:inline text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        入札秘書
                    </Link>
                    <Link
                        href="/#contact"
                        className="bg-blue-700 text-white font-semibold px-4 md:px-5 py-2 rounded-full hover:bg-blue-800 transition-colors"
                    >
                        お問い合わせ
                    </Link>
                </nav>
            </div>
        </header>
    );
}
