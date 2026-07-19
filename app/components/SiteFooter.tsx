import Link from 'next/link';

// トップ以外のページで使う共通フッター。
export default function SiteFooter() {
    return (
        <footer className="bg-blue-800 text-blue-100 py-10 mt-16">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <p className="font-bold text-white">株式会社想樹</p>
                    <p className="text-sm">公共入札支援・毎朝届くAI入札秘書</p>
                </div>
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                    <Link href="/" className="hover:text-white transition-colors">
                        トップ
                    </Link>
                    <Link href="/nyusatsu-hisho" className="hover:text-white transition-colors">
                        入札秘書
                    </Link>
                    <Link href="/column" className="hover:text-white transition-colors">
                        コラム
                    </Link>
                    <Link href="/#contact" className="hover:text-white transition-colors">
                        お問い合わせ
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
