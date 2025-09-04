"use client";

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-end items-center">
                    {/* 右上：ナビゲーションリンクのみ */}
                    <nav className="flex space-x-8">
                        <a
                            href="#business"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                        >
                            事業内容
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                        >
                            お問い合わせ
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
