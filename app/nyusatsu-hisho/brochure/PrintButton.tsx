'use client';

import { Printer } from 'lucide-react';

// 画面上のツールバー用。クリックでブラウザの印刷ダイアログを開き、
// ユーザーが「PDFとして保存」を実行できる。印刷時は no-print で隠れる。
export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-800 transition-colors"
        >
            <Printer className="w-5 h-5" />
            PDFで保存 / 印刷する
        </button>
    );
}
